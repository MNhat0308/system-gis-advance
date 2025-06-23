import { useState } from 'react';

const RouteDetail = ({ route }) => {
    const [activeTab, setActiveTab] = useState(route.route_variants[0]?.id);

    const variant = route.route_variants.find((v) => v.id === activeTab);

    const fromStation = variant?.stops[0]?.station?.name ?? '';
    const toStation =
        variant?.stops[variant.stops.length - 1]?.station?.name ?? '';

    // Get trips from the first schedule
    const trips = variant?.schedules?.[0]?.trips ?? [];

    // Match trips to stops based on `order`
    const scheduleWithStops = trips.map((trip) => {
        const stop = variant.stops.find(
            (s) => parseInt(s.order) === parseInt(trip.order),
        );

        return {
            time: trip.start_time,
            stopName: stop?.station?.name ?? '(Không xác định)',
        };
    });

    return (
        <div className="mx-auto max-w-2xl space-y-4 p-4">
            {/* Tabs */}
            <div className="flex gap-2">
                {route.route_variants.map((variant) => (
                    <button
                        key={variant.id}
                        onClick={() => setActiveTab(variant.id)}
                        className={`rounded px-4 py-2 font-medium ${
                            activeTab === variant.id
                                ? 'bg-teal-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {variant.name}
                    </button>
                ))}
            </div>

            <div className="font-medium text-gray-800">
                <strong>{variant?.name}:</strong> từ {fromStation} đến{' '}
                {toStation}
            </div>

            {/* Schedule with Stop Names */}
            <div className="space-y-2">
                {scheduleWithStops.length > 0 ? (
                    scheduleWithStops.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                        >
                            <span className="w-16 font-mono text-teal-600">
                                {item.time}
                            </span>
                            <span className="text-gray-800">
                                {item.stopName}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">
                        Không có lịch trình cho tuyến này.
                    </p>
                )}
            </div>
        </div>
    );
};

export default RouteDetail;
