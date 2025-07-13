export const extractPointsFromStations = (stations = []) => {
    return (stations || []).map((item, index) => {
        const { id, order, station } = item;
        const { id: stationId, name, location } = station || {};
        const coordinates = location?.coordinates || [0, 0];

        return {
            coordinates,
            properties: {
                id,
                order,
                featureIndex: index,
                stationId,
                name,
                pointIndex: index,
            },
        };
    });
};

export function getCircleFeature(center, radiusMeters) {
    const steps = 64;
    const coordinates = [];

    for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const dx = radiusMeters * Math.cos(angle);
        const dy = radiusMeters * Math.sin(angle);
        const deltaLng = dx / (111320 * Math.cos(center[1] * Math.PI / 180));
        const deltaLat = dy / 110540;
        coordinates.push([center[0] + deltaLng, center[1] + deltaLat]);
    }

    return {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [coordinates],
        },
        properties: {},
    };
}

