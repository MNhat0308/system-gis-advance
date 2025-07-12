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
