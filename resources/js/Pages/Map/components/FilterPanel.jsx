import { zodResolver } from '@hookform/resolvers/zod';
import { router, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Default values for reset
const DEFAULT_FILTERS = {
    search: '',
    email: '',
    phone: '',
    username: '',
    status: '',
};

// Zod validation schema
const filterSchema = z.object({
    search: z.string().max(50, 'Max 50 characters').optional(),
    email: z
        .string()
        .email('Invalid email')
        .optional()
        .or(z.literal(''))
        .optional(),
    phone: z.string().regex(/^\d*$/, 'Numbers only').optional(),
    username: z.string().optional(),
    status: z.enum(['', 'active', 'inactive']),
});

// Helper to style input based on error
const inputClass = (hasError) =>
    `w-full rounded border px-3 py-2 text-sm focus:outline-none ${
        hasError
            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
            : 'border-gray-300 focus:ring-1 focus:ring-blue-300'
    }`;

const FilterPanel = ({ listItems = [] }) => {
    const { filters: initialFilters = {} } = usePage().props;

    const [showFilters, setShowFilters] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            ...DEFAULT_FILTERS,
            ...initialFilters,
        },
        mode: 'onChange', // 🔥 validate as user types
    });

    const onSubmit = (filters) => {
        router.get(route('users.index'), filters, {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        reset();
        router.get(
            route('users.index'),
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="space-y-6">
            {/* Toggle */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                    <Filter className="h-5 w-5" />
                    <h3 className="text-base font-semibold">Filter Options</h3>
                </div>
                <button
                    type="button"
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="text-gray-500 hover:text-gray-700"
                    title={showFilters ? 'Hide Filters' : 'Show Filters'}
                >
                    {showFilters ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Form */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    showFilters
                        ? 'max-h-[1000px] opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Search */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Search
                                </label>
                                <input
                                    {...register('search')}
                                    placeholder="Search..."
                                    className={inputClass(errors.search)}
                                />
                                {errors.search && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.search.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    {...register('email')}
                                    placeholder="Email..."
                                    className={inputClass(errors.email)}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Phone
                                </label>
                                <input
                                    {...register('phone')}
                                    placeholder="Phone..."
                                    className={inputClass(errors.phone)}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            {/* Username */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Username
                                </label>
                                <input
                                    {...register('username')}
                                    placeholder="Username..."
                                    className={inputClass(errors.username)}
                                />
                                {errors.username && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="sm:col-span-2">
                                <label className="mb-1 block text-sm font-medium">
                                    Status
                                </label>
                                <select
                                    {...register('status')}
                                    className={inputClass(errors.status)}
                                >
                                    <option value="">All</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.status.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* List Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-base font-semibold text-gray-700">
                    Matching Results
                </h3>
                {listItems.length > 0 ? (
                    <ul className="space-y-2">
                        {listItems.map((item, i) => (
                            <li
                                key={i}
                                className="rounded border border-gray-100 bg-gray-50 px-3 py-2 text-sm shadow-sm"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">
                        No items to display.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FilterPanel;
