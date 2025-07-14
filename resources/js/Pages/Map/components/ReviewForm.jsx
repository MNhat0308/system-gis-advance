import { useFlash } from '@/Pages/Map/contexts/FlashContext.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAppContext } from '@/Pages/Map/contexts/AppContext.jsx';

// Validation schema
const reviewSchema = z.object({
    comment: z.string().min(5, 'Nhận xét quá ngắn'),
});

export default function ReviewForm({ routeId }) {
    const {fetchReviews} = useAppContext()
    const { showFlash } = useFlash();
    const [ratingStar, setRatingStar] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(reviewSchema),
    });

    const onSubmit = async (data) => {
        if (ratingStar === 0) {
            showFlash('Bạn phải chọn ít nhất 1 sao', 'error');
            return;
        }

        try {
            setSubmitting(true);

            await axios.post(
                route('api.routes.review.store', routeId),
                {
                    rating: ratingStar,
                    comment: data.comment,
                },
                {
                    withCredentials: true,
                },
            );

            reset();
            setRatingStar(0);
            fetchReviews(routeId);
        } catch (error) {
            console.error(error);
            showFlash('Đã xảy ra lỗi khi gửi đánh giá.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 rounded-lg border bg-white p-4 shadow-sm"
        >
            <h4 className="text-base font-semibold text-gray-800">
                Gửi đánh giá
            </h4>

            <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                        key={i}
                        onClick={() => setRatingStar(i + 1)}
                        className={`h-5 w-5 cursor-pointer transition hover:scale-110 ${
                            i < ratingStar
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-300 text-gray-300'
                        }`}
                    />
                ))}
            </div>

            <textarea
                rows={3}
                placeholder="Viết nhận xét..."
                className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                {...register('comment')}
            />
            {errors.comment && (
                <p className="text-sm text-red-500">{errors.comment.message}</p>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50"
            >
                {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
        </form>
    );
}
