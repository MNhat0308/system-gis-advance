const extractPointsFromGeoJSON = (geojson) => {
    const points = [];

    geojson.features.forEach((feature, index) => {
        if (feature.geometry.type === 'LineString') {
            feature.geometry.coordinates.forEach((coord, i) => {
                points.push({
                    coordinates: coord,
                    properties: {
                        featureIndex: index,
                        pointIndex: i,
                    },
                });
            });
        }
    });

    return points;
};

export { extractPointsFromGeoJSON };
