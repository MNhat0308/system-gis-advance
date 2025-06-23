const path = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                name: 'Sample Route A',
                description: 'First sample route through HCMC',
                id: 'route-001',
                status: 'active',
                created_at: '2025-06-23T14:00:00Z',
            },
            geometry: {
                type: 'LineString',
                coordinates: [
                    [106.7241296635737, 10.797507966182195],
                    [106.72274183832576, 10.796012780262316],
                    [106.72104063317943, 10.797595918064331],
                    [106.71904097099161, 10.796775032837672],
                    [106.71850374831337, 10.793711352100445],
                    [106.71830975123572, 10.79152717786242],
                    [106.71780237426208, 10.790383778309462],
                ],
            },
        },
        {
            type: 'Feature',
            properties: {
                name: 'Sample Route B',
                description: 'Second sample route continuing south',
                id: 'route-002',
                status: 'planned',
                created_at: '2025-06-23T14:05:00Z',
            },
            geometry: {
                type: 'LineString',
                coordinates: [
                    [106.73080237426208, 10.790383778309462],
                    [106.7157049627782, 10.78909463485273],
                    [106.71262693694212, 10.789360222562678],
                    [106.71096313919315, 10.789482801426118],
                    [106.70946572121773, 10.787480673726847],
                    [106.70861302487197, 10.785519392852052],
                ],
            },
        },
    ],
};
export { path };
