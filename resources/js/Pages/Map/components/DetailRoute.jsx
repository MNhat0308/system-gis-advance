import ReviewForm from '@/Pages/Map/components/ReviewForm.jsx';
import { BASE_VIEW } from '@/Pages/Map/config/index.js';
import { useAppContext } from '@/Pages/Map/contexts/AppContext.jsx';
import { data_get } from '@/Utils/globalHelper.js';
import {
    Building2,
    InfoIcon,
    Route as RouteIcon,
    StarIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const RouteDetail = ({ route }) => {
    const {
        setSelectedVariant,
        setSelectedPathLine,
        selectedStop,
        setSelectedStop,
        setViewState,
        reviewLoading,
        fetchReviews,
        averageReview,
        reviewList,
        reviewError,
        isLoadingMore,
        loadMoreReviews,
        authUser,
        setShowLoginModal,
    } = useAppContext();
    const [ratingStar, setRatingStar] = useState(0);
    const [activeTab, setActiveTab] = useState(route.route_variants[0]?.id);
    const [activeSubtab, setActiveSubtab] = useState('stops');

    const variant = route.route_variants.find((v) => v.id === activeTab);

    const fromStation = variant?.stops[0]?.station?.name ?? '';
    const toStation =
        variant?.stops[variant.stops.length - 1]?.station?.name ?? '';

    const trips = variant?.schedules?.[0]?.trips ?? [];

    const scheduleWithStops = trips
        .map((trip) => {
            const stop = variant.stops.find(
                (s) => parseInt(s.order) === parseInt(trip.order),
            );

            if (!stop) return null;

            return {
                time: trip.start_time,
                stopName: stop.station?.name,
                order: parseInt(trip.order),
                coordinates: stop.station?.location,
            };
        })
        .filter(Boolean)
        .sort((a, b) => a.order - b.order);

    const handleTabChange = (variant) => {
        setActiveTab(variant?.id);
        setSelectedVariant(
            Array.isArray(variant?.stops) ? [...variant.stops] : [],
        );
        setSelectedPathLine(variant?.location);
        setSelectedStop(null);
    };

    const handleOnclick = (stop) => {
        const lng = data_get(stop, 'coordinates.coordinates.0');
        const lat = data_get(stop, 'coordinates.coordinates.1');

        setViewState((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            zoom: 18,
            transitionDuration: 1000,
            transitionEasing: BASE_VIEW.transitionEasing,
        }));

        setSelectedStop(stop);
    };

    useEffect(() => {
        if (activeSubtab === 'review') {
            fetchReviews(route.id);
        }
    }, [activeSubtab]);

    return (
        <div className="mx-auto max-w-2xl space-y-6 p-4">
            {/* Top tabs: direction selection */}
            <div className="flex overflow-hidden rounded-lg border bg-gray-100">
                {route.route_variants.map((variant) => (
                    <button
                        key={variant.id}
                        onClick={() => handleTabChange(variant)}
                        className={`flex-1 px-4 py-2 text-sm font-medium transition ${
                            activeTab === variant.id
                                ? 'bg-teal-600 text-white'
                                : 'text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {variant.name}
                    </button>
                ))}
            </div>

            {/* Sub tabs: Stop / Info / Review */}
            <div className="flex gap-4 text-sm font-medium">
                {['stops', 'info', 'review'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveSubtab(tab)}
                        className={`rounded px-3 py-1 ${
                            activeSubtab === tab
                                ? 'bg-white text-teal-600 shadow'
                                : 'text-gray-700 hover:text-teal-600'
                        }`}
                    >
                        {
                            {
                                stops: 'Trạm dừng',
                                info: 'Thông tin',
                                review: 'Đánh giá',
                            }[tab]
                        }
                    </button>
                ))}
            </div>

            {activeSubtab === 'stops' && (
                <>
                    <div className="text-sm font-medium text-gray-800">
                        <strong>{variant?.name}:</strong> từ {fromStation} đến{' '}
                        {toStation}
                    </div>

                    {scheduleWithStops.map((item, idx) => {
                        const isActive =
                            item.stopName === selectedStop?.stopName;
                        const isFirst = idx === 0;
                        const isLast = idx === scheduleWithStops.length - 1;

                        const now = new Date();
                        const [hour, minute] = item.time.split(':').map(Number);
                        const itemTime = new Date();
                        itemTime.setHours(hour, minute, 0, 0);
                        const isPast = itemTime < now;

                        return (
                            <div
                                key={idx}
                                onClick={() => handleOnclick(item)}
                                className="group relative mb-4 flex cursor-pointer items-center gap-3 rounded px-4 py-2 transition hover:bg-gray-50"
                            >
                                <div className="absolute -left-[7px] top-1/2 z-10 -translate-y-1/2">
                                    <div
                                        className={`h-3 w-3 rounded-full border-2 ${
                                            isActive
                                                ? 'border-red-600 bg-white ring-4 ring-red-100'
                                                : isFirst || isLast
                                                  ? 'border-teal-600 bg-teal-600'
                                                  : 'border-gray-300 bg-gray-300'
                                        }`}
                                    />
                                </div>

                                <div className="flex flex-1 flex-col text-sm">
                                    <span
                                        className={`font-mono ${
                                            isPast
                                                ? 'text-gray-400 line-through'
                                                : 'text-teal-600'
                                        }`}
                                    >
                                        {item.time}
                                    </span>
                                    <span
                                        className={`${
                                            isPast
                                                ? 'text-gray-400'
                                                : 'text-gray-800'
                                        } group-hover:underline`}
                                    >
                                        {item.stopName}
                                    </span>
                                </div>

                                {item.coordinates && (
                                    <div className="relative">
                                        <button
                                            className="group text-gray-400 hover:text-blue-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.coordinates[1]},${item.coordinates.coordinates[0]}`;
                                                window.open(url, '_blank');
                                            }}
                                        >
                                            <RouteIcon size={16} />
                                            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                Directions
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </>
            )}

            {activeSubtab === 'info' && (
                <>
                    {route.route_details ? (
                        <div className="space-y-6">
                            {/* Section Header */}
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                <InfoIcon className="h-5 w-5 text-teal-600" />
                                Thông tin chi tiết tuyến xe
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
                                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-700">
                                        <RouteIcon className="h-4 w-4 text-teal-600" />
                                        Chiều đi
                                    </div>
                                    <p className="max-h-40 overflow-y-auto whitespace-pre-line text-sm text-gray-700">
                                        {
                                            route.route_details
                                                .inbound_description
                                        }
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
                                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-700">
                                        <RouteIcon className="h-4 w-4 rotate-180 text-teal-600" />
                                        Chiều về
                                    </div>
                                    <p className="max-h-40 overflow-y-auto whitespace-pre-line text-sm text-gray-700">
                                        {
                                            route.route_details
                                                .outbound_description
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 md:grid-cols-3">
                                <div className="rounded-lg bg-gray-50 p-3 shadow-sm">
                                    <span className="block font-semibold text-teal-600">
                                        Số ghế
                                    </span>
                                    {route.route_details.number_of_seats}
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3 shadow-sm">
                                    <span className="block font-semibold text-teal-600">
                                        Khoảng cách
                                    </span>
                                    {(
                                        route.route_details.distance / 1000
                                    ).toFixed(1)}{' '}
                                    km
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3 shadow-sm">
                                    <span className="block font-semibold text-teal-600">
                                        Thời gian chuyến
                                    </span>
                                    {route.route_details.time_of_trip} phút
                                </div>
                                <div className="col-span-2 rounded-lg bg-gray-50 p-3 shadow-sm md:col-span-1">
                                    <span className="block font-semibold text-teal-600">
                                        Giờ hoạt động
                                    </span>
                                    {route.route_details.operation_time}
                                </div>
                                <div className="col-span-2 rounded-lg bg-gray-50 p-3 shadow-sm">
                                    <span className="block font-semibold text-teal-600">
                                        Số chuyến/ngày
                                    </span>
                                    {route.route_details.total_trip}
                                </div>
                            </div>

                            {/* Operator Info */}
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                                <div className="mb-2 flex items-center gap-2 font-semibold text-teal-700">
                                    <Building2 className="h-4 w-4" />
                                    Đơn vị vận hành
                                </div>
                                <p className="whitespace-pre-line text-sm text-gray-700">
                                    {route.route_details.organization}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded bg-white p-6 text-sm text-gray-700 shadow">
                            <p>
                                {route.description ||
                                    'Chưa có thông tin chi tiết.'}
                            </p>
                        </div>
                    )}
                </>
            )}
            {activeSubtab === 'review' &&
                (!reviewLoading ? (
                    <>
                        <div className="space-y-6 text-sm text-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-bold text-teal-600">
                                    {averageReview?.average_rating || '—'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={`h-4 w-4 ${i < averageReview?.average_rating.toFixed() ? 'fill-yellow-400' : 'fill-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {averageReview?.count_rating} đánh giá
                                    </p>
                                </div>
                            </div>

                            {authUser ? (
                                <ReviewForm routeId={route.id} />
                            ) : (
                                <div className="rounded-lg border bg-white p-4 text-center text-sm text-gray-600 shadow-sm">
                                    <p>
                                        Bạn cần{' '}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowLoginModal(true)
                                            }
                                            className="text-teal-600 hover:underline"
                                        >
                                            đăng nhập
                                        </button>{' '}
                                        để gửi đánh giá.
                                    </p>
                                </div>
                            )}

                            <div className="divide-y rounded-lg border bg-white shadow-sm">
                                {reviewList?.data?.map((review) => (
                                    <div key={review.id} className="p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-800">
                                                {review.user}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {review.created_at}
                                            </span>
                                        </div>

                                        <div className="my-1 flex items-center gap-1 text-yellow-500">
                                            {Array.from(
                                                { length: 5 },
                                                (_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400' : 'fill-gray-300'}`}
                                                    />
                                                ),
                                            )}
                                        </div>

                                        <p className="text-gray-700">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}

                                {reviewList?.data?.length === 0 && (
                                    <div className="p-4 text-sm text-gray-500">
                                        Chưa có đánh giá nào.
                                    </div>
                                )}
                            </div>
                            {reviewList?.links?.next && (
                                <div className="flex justify-center">
                                    <button
                                        onClick={loadMoreReviews}
                                        disabled={isLoadingMore}
                                        className="rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50"
                                    >
                                        {isLoadingMore
                                            ? 'Đang tải...'
                                            : 'Hiển thị thêm'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="rounded bg-white p-6 text-sm text-gray-700 shadow">
                        <p>Chưa có đánh giá cho tuyến xe này.</p>
                    </div>
                ))}
        </div>
    );
};

const InfoBox = ({ label, icon: Icon, value }) => (
    <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3 shadow-sm">
        <Icon className="mt-1 h-5 w-5 text-teal-600" />
        <div>
            <div className="text-xs font-semibold text-gray-600">{label}</div>
            <div className="text-sm font-medium text-gray-800">
                {value || '—'}
            </div>
        </div>
    </div>
);

export default RouteDetail;
