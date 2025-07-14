import { useAppContext } from '@/Pages/Map/contexts/AppContext.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu ít nhất 8 ký tự'),
});

export default function LoginModal({ onClose, onSuccess }) {
    const { setAuthUser } = useAppContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);

        try {
            const res = await axios.post('/login', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 204 || res.status === 200) {
                setAuthUser(res.data.user);
                onSuccess?.();
                onClose();
            }
        } catch (err) {
            setServerError('Email hoặc mật khẩu không đúng');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                    Đăng nhập
                </h2>

                {serverError && (
                    <div className="mb-3 rounded bg-red-100 px-3 py-2 text-sm text-red-600">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50"
                    >
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="mt-3 w-full text-center text-sm text-gray-500"
                >
                    Huỷ
                </button>
            </div>
        </div>
    );
}
