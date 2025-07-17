import RouteDetail from '@/Pages/Map/components/DetailRoute.jsx';
import { useAppContext } from '@/Pages/Map/contexts/AppContext.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Bus, Search } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Default values
const DEFAULT_FILTERS = {
    search: '',
    email: '',
    radius: '',
    username: '',
    status: '',
};

const filterSchema = z.object({
    search: z.string().max(50, 'Max 50 characters').optional(),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    radius: z
        .string()
        .trim()
        .refine((val) => val === '' || /^\d+$/.test(val), {
            message: 'Numbers only',
        })
        .transform((val) => {
            if (val === '') return undefined;
            return parseInt(val, 10);
        })
        .refine((val) => val === undefined || (val > 0 && val < 1000), {
            message: 'Radius must be between 1 and 999',
        })
        .optional(),
    username: z.string().optional(),
    status: z.enum(['', 'active', 'inactive']),
});

const inputClass = (hasError) =>
    `w-full rounded border px-3 py-2 text-sm focus:outline-none ${
        hasError
            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
            : 'border-gray-300 focus:ring-1 focus:ring-blue-300'
    }`;

const FilterPanel = ({ initialFilters = {}, listItems = [] }) => {
    const {
        selectedRoute,
        setSelectedRoute,
        showFilters,
        setShowFilters,
        setSelectedVariant,
        setSelectedPathLine,
    } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingDetail, setLoadingDetail] = useState(false);

    const filteredItems = listItems.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            item.name.toLowerCase().includes(query) ||
            item.code.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );
    });

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
        mode: 'onChange',
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

    const handleItemClick = async (item) => {
        const { id } = item;
        setLoadingDetail(true);
        try {
            const { data } = await axios.get(route('api.routes.show', id));
            setSelectedRoute(data);
        } catch (err) {
            console.error('Failed to fetch user detail', err);
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleBackToList = () => {
        setSelectedVariant(null);
        setSelectedPathLine(null);
        setSelectedRoute(null);
    };

    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/*
            <div className="shrink-0 space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                        <Filter className="h-5 w-5" />
                        <h3 className="text-base font-semibold">
                            Filter Options
                        </h3>
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


                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Radius
                                    </label>
                                    <input
                                        {...register('radius')}
                                        placeholder="radius"
                                        className={inputClass(errors.radius)}
                                    />
                                    {errors.radius && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.radius.message}
                                        </p>
                                    )}
                                </div>

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
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.status.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                            <div className="sticky bottom-0 flex flex-col gap-2 bg-white pt-4 sm:flex-row sm:justify-end">
                                <button
                                    type="submit"
                                    className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    type="button"
                                    // onClick={handleReset}
                                    className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
                                >
                                    Find Nearest
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

            </div>
            */}
            {/* Scrollable List Section */}
            <div className="flex-1 overflow-y-auto border-t border-gray-200 p-4">
                {selectedRoute ? (
                    <>
                        <div className="flex items-center justify-center">
                            <button
                                onClick={handleBackToList}
                                className="mb-4 rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
                            >
                                ← Trở lại
                            </button>
                        </div>

                        {loadingDetail ? (
                            <p className="text-sm text-gray-500">Loading...</p>
                        ) : (
                            <RouteDetail route={selectedRoute} />
                        )}
                    </>
                ) : (
                    <>
                        <h3 className="mb-3 flex items-center justify-between text-base font-semibold text-gray-700">
                            <span>Kết quả phù hợp</span>
                            <span className="text-sm font-normal text-gray-500">
                                {filteredItems.length} kết quả
                            </span>
                        </h3>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded border border-gray-300 bg-white px-9 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {filteredItems.length > 0 ? (
                            <div className="cursor-pointer space-y-3">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleItemClick(item)}
                                        className="flex cursor-pointer items-center gap-4 rounded border border-gray-100 bg-gray-50 p-4 shadow-sm"
                                    >
                                        <div className="flex items-center justify-center">
                                            <Bus className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <div className="flex flex-col text-sm text-gray-700">
                                            <div className="text-base font-medium">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Code: {item.code}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Type: {item.type}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No items to display.
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default FilterPanel;
