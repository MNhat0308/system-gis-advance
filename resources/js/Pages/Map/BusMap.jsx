import BaseMapSwitcher from '@/Pages/Map/components/BaseMapSwitcher.jsx';
import GpsButton from '@/Pages/Map/components/GpsButton.jsx';
import PointMarkersLayer from '@/Pages/Map/components/PointMarkersLayer.jsx';
import Sidebar from '@/Pages/Map/components/Sidebar.jsx';
import { BASE_VIEW } from '@/Pages/Map/config/index.js';
import { pathLayers } from '@/Pages/Map/layers/pathLayers.js';
import { path } from '@/Pages/Map/mock-data/path.js';
import { VITE_APP_NAME, VITE_MAPBOX_TOKEN } from '@/Utils/configGlobal.js';
import { DeckGL, ZoomWidget } from '@deck.gl/react';
import { Head } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useRef, useState } from 'react';
import { Map } from 'react-map-gl/mapbox';

export default function BusMap() {
    const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [baseMapStyle, setBaseMapStyle] = useState(
        'mapbox://styles/mapbox/light-v11',
    );
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [activeTab, setActiveTab] = useState('Info');
    const [infoData, setInfoData] = useState(null);
    const [viewState, setViewState] = useState(BASE_VIEW);
    const [mapLoaded, setMapLoaded] = useState(false);
    const handleMapLoad = useCallback(() => setMapLoaded(true), []);

    const handleLocate = ({ latitude, longitude }) => {
        setViewState((prev) => ({
            ...prev,
            latitude,
            longitude,
            zoom: 15,
            transitionDuration: 1000,
            transitionEasing: BASE_VIEW.transitionEasing,
        }));
    };

    const deckRef = useRef();
    const handleClick = (info) => {
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
    const iconLayer = PointMarkersLayer({
        size: 15,
        data: path,
        pickable: true,
        onClick: ({ object }) => console.log('Clicked', object),
        onHover: ({ object }) => {
            if (object) {
                setHoveredIndex(object.properties.pointIndex);
            } else {
                setHoveredIndex(null);
            }
        },
        hoveredIndex,
    });

    const pathLayer = pathLayers(path, handleClick, hoveredFeatureId);

    const layers = [iconLayer];

    return (
        <>
            <Head title="BusMap" />
            <div style={{ position: 'relative', height: '100vh' }}>
                {!mapLoaded && (
                    <div
                        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ${
                            mapLoaded
                                ? 'pointer-events-none opacity-0'
                                : 'opacity-100'
                        }`}
                    >
                        <h1 className="animate-fade-in mb-4 text-2xl font-semibold text-gray-800">
                            {VITE_APP_NAME}
                        </h1>
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                )}
                <DeckGL
                    ref={deckRef}
                    viewState={viewState}
                    onViewStateChange={({ viewState }) =>
                        setViewState(viewState)
                    }
                    controller
                    layers={layers}
                    onHover={handleHover}
                >
                    <Map
                        mapboxAccessToken={VITE_MAPBOX_TOKEN}
                        mapStyle={baseMapStyle}
                        attributionControl={false}
                        onLoad={handleMapLoad}
                    />

                    <ZoomWidget />
                </DeckGL>
                {mapLoaded && (
                    <>
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
                            positionClass="bottom-4 right-14"
                        />
                    </>
                )}
                <GpsButton onLocate={handleLocate} />
            </div>
        </>
    );
}
