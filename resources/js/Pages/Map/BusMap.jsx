import { BASE_VIEW } from '@/Pages/Map/config/index.js';
import { path } from '@/Pages/Map/mock-data/path.js';
import { VITE_MAPBOX_TOKEN } from '@/Utils/configGlobal.js';
import { DeckGL, ZoomWidget } from '@deck.gl/react';
import { Head } from '@inertiajs/react';
import { GeoJsonLayer } from 'deck.gl';
import { Map } from 'react-map-gl/mapbox';

export default function BusMap() {
    const layers = [
        new GeoJsonLayer({
            id: 'geojson',
            data: path,
            lineWidthMinPixels: 0.5,

            getLineColor: (f) => {},
            getLineWidth: (f) => {},

            pickable: true,

            transitions: {
                getLineColor: 1000,
                getLineWidth: 1000,
            },
        }),
    ];

    return (
        <>
            <Head title="BusMap" />
            <DeckGL initialViewState={BASE_VIEW} controller layers={layers}>
                <Map
                    mapboxAccessToken={VITE_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                />

                <ZoomWidget />
            </DeckGL>
        </>
    );
}
