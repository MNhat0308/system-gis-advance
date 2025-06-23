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
    const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
    const [baseMapStyle, setBaseMapStyle] = useState(
        'mapbox://styles/mapbox/light-v11',
    );
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [activeTab, setActiveTab] = useState('Info');
    const [infoData, setInfoData] = useState(null);

    const deckRef = useRef();
    const handleClick = (info) => {
        console.log(info);
        if (info?.object) {
            setInfoData(info.object.properties);
            setSidebarOpen(true);
            setSidebarExpanded(true);
            setActiveTab('Info');
        }
    };

    const handleHover = (info) => {
        const featureId = info.object?.properties?.id || null;
        setHoveredFeatureId(featureId);
    };

    const layers = [pathLayers(path, handleClick, hoveredFeatureId)];

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
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                isExpanded={sidebarExpanded}
                setIsExpanded={setSidebarExpanded}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                infoData={infoData}
            />

            <BaseMapSwitcher
                currentStyle={baseMapStyle}
                onChange={(newStyle) => setBaseMapStyle(newStyle)}
                positionClass="bottom-4 left-4"
            />
        </>
    );
}
