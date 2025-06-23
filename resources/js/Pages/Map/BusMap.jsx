import BaseMapSwitcher from '@/Pages/Map/components/BaseMapSwitcher.jsx';
import Sidebar from '@/Pages/Map/components/Sidebar.jsx';
import { BASE_VIEW } from '@/Pages/Map/config/index.js';
import { pathLayers } from '@/Pages/Map/layers/pathLayers.js';
import { path } from '@/Pages/Map/mock-data/path.js';
import { VITE_MAPBOX_TOKEN } from '@/Utils/configGlobal.js';
import { DeckGL, ZoomWidget } from '@deck.gl/react';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Map } from 'react-map-gl/mapbox';

export default function BusMap() {
    const [popupInfo, setPopupInfo] = useState(null);
    const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
    const [baseMapStyle, setBaseMapStyle] = useState(
        'mapbox://styles/mapbox/light-v11',
    );

    const deckRef = useRef();
    const handleClick = (info) => {
        if (info.object) {
            setPopupInfo({
                coordinates: info.coordinate,
                properties: info.object.properties,
            });
        } else {
            setPopupInfo(null);
        }
    };

    const handleHover = (info) => {
        const featureId = info.object?.properties?.id || null;
        setHoveredFeatureId(featureId);
    };

    const layers = [pathLayers(path, handleClick, hoveredFeatureId)];

    const project = (lngLat) => {
        const deck = deckRef.current?.deck;
        if (!deck) return null;

        const viewport = deck.viewManager?.getViewports()[0];
        return viewport?.project(lngLat); // Returns [x, y]
    };

    const screenCoords = popupInfo?.coordinates
        ? project(popupInfo.coordinates)
        : null;

    return (
        <>
            <Head title="BusMap" />
            <DeckGL
                ref={deckRef}
                initialViewState={BASE_VIEW}
                controller
                layers={layers}
                onHover={handleHover}
            >
                <Map
                    mapboxAccessToken={VITE_MAPBOX_TOKEN}
                    mapStyle={baseMapStyle}
                />

                <ZoomWidget />
            </DeckGL>

            <Sidebar
                infoData={popupInfo?.properties}
                // legendData={<LegendComponent />}
                // filters={<FiltersComponent />}
            />

            <BaseMapSwitcher
                currentStyle={baseMapStyle}
                onChange={(newStyle) => setBaseMapStyle(newStyle)}
                positionClass="bottom-4 left-4"
            />
        </>
    );
}
