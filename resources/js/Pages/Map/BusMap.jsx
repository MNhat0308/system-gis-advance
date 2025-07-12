import GpsButton from '@/Pages/Map/components/GpsButton.jsx';
import MapToolbox from '@/Pages/Map/components/MapToolbox.jsx';
import PointMarkersLayer from '@/Pages/Map/components/PointMarkersLayer.jsx';
import Sidebar from '@/Pages/Map/components/Sidebar.jsx';
import { BASE_VIEW } from '@/Pages/Map/config/index.js';
import { useAppContext } from '@/Pages/Map/contexts/AppContext.jsx';
import { useFlash } from '@/Pages/Map/contexts/FlashContext.jsx';
import { pathLayers } from '@/Pages/Map/layers/pathLayers.js';
import createRadiusLayer from '@/Pages/Map/layers/radiusLayer.js';
import { VITE_APP_NAME, VITE_MAPBOX_TOKEN } from '@/Utils/configGlobal.js';
import { DeckGL, ZoomWidget } from '@deck.gl/react';
import { Head } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Map } from 'react-map-gl/mapbox';
import MapContextMenu from '@/Pages/Map/components/MapContextMenu.jsx';

export default function BusMap({ routes }) {
    const { showFlash } = useFlash();
    const {
        selectedVariant,
        selectedPathLine,
        activeTab,
        setActiveTab,
        baseMapStyle,
        setBaseMapStyle,
        drawingRadius,
        setDrawingRadius,
        radiusFeature,
        setRadiusCenter,
        searchNearby,
        setSearchNearby,
        radiusMeters,
        selectedStop,
        listRoutes,
        setListRoutes,
        viewState,
        setViewState,
        mapLoaded,
        setMapLoaded,
        setContextMenu,
        contextMenu,
    } = useAppContext();
    const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [infoData, setInfoData] = useState(null);

    const handleMapLoad = useCallback(() => setMapLoaded(true), []);

    useEffect(() => {
        setListRoutes(routes);
    }, [routes]);

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault(); // 🛑 Stop the browser menu
        };

        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

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

    const handleHover = (info) => {
        const featureId = info.object?.properties?.id || null;
        setHoveredFeatureId(featureId);
    };

    const pathLayer = useMemo(() => {
        if (!selectedPathLine || typeof selectedPathLine !== 'object')
            return null;
        return pathLayers({
            data: selectedPathLine,
        });
    }, [selectedPathLine]);

    const highLightPointLayer = useMemo(() => {
        if (!selectedStop || typeof selectedStop !== 'object') return null;
        return pathLayers({
            data: selectedStop.coordinates,
            getLineColor: () => [252, 3, 3],
        });
    }, [selectedStop]);

    const iconLayer = useMemo(() => {
        if (!Array.isArray(selectedVariant) || selectedVariant.length === 0)
            return null;
        return PointMarkersLayer({
            size: 15,
            data: selectedVariant,
            pickable: true,
            onClick: ({ object }) => console.log('Clicked', object),
            // onHover: ({ object }) => {
            //     if (object) {
            //         setHoveredIndex(object.properties.pointIndex);
            //     } else {
            //         setHoveredIndex(null);
            //     }
            // },
            hoveredIndex,
            getFillColor: (d) => [0, 0, 255],
        });
    }, [hoveredIndex, selectedVariant]);

    const radiusLayer = useMemo(
        () => createRadiusLayer(radiusFeature),
        [radiusFeature],
    );

    const layers = [
        radiusLayer,
        iconLayer,
        pathLayer,
        highLightPointLayer,
    ].filter(Boolean);

    const handleOnClearMap = () => {
        setRadiusCenter(null);
        setDrawingRadius(false);
        setSearchNearby([]);
    };
    const handleDrawRadius = () => {
        setRadiusCenter(null); // clear old one
        setDrawingRadius(true);
    };

    async function handleSearchRoutebyRadius(info) {
        if (!drawingRadius || !info?.coordinate) return;

        const [lng, lat] = info.coordinate;

        setRadiusCenter([lng, lat]);
        setDrawingRadius(false);

        try {
            const response = await axios.get(route('api.stations.nearby'), {
                params: { lat, lng, radius: radiusMeters },
            });

            const { routes = [] } = response.data;
            const codes = routes.map((r) => r.code);
            setSearchNearby(codes);
        } catch (error) {
            showFlash('Something went wrong!', 'error');
        }
    }

    function handleRightClickOnMap(event, info) {
        if (event.rightButton || event.srcEvent.button === 2) {
            setContextMenu({
                visible: true,
                x: event.offsetCenter?.x ?? event.clientX,
                y: event.offsetCenter?.y ?? event.clientY,
                lngLat: info.coordinate,
            });
        }
    }

    const closeMenu = () => {
        setContextMenu((prev) => ({ ...prev, visible: false }));
    };

    const handleOnMapClick = async (info, event) => {
        handleRightClickOnMap(event, info);

        await handleSearchRoutebyRadius(info);
    };

    const filteredRoutes = useMemo(() => {
        if (!searchNearby || searchNearby.length === 0) {
            return listRoutes;
        }

        return listRoutes.filter((route) => searchNearby.includes(route.code));
    }, [listRoutes, searchNearby]);

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
                    onClick={handleOnMapClick}
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
                            filtersData={filteredRoutes}
                        />
                        {/*<BaseMapSwitcher*/}
                        {/*    currentStyle={baseMapStyle}*/}
                        {/*    onChange={(newStyle) => setBaseMapStyle(newStyle)}*/}
                        {/*    positionClass="bottom-4 right-14"*/}
                        {/*/>*/}
                        <MapContextMenu context={contextMenu} onClose={closeMenu} />
                        <MapToolbox
                            onDrawRadius={handleDrawRadius}
                            // onClear={handleClear}
                            // onToggleLayer={handleToggleLayer}
                            onBasemapChange={(newStyle) =>
                                setBaseMapStyle(newStyle)
                            }
                            currentBasemap={baseMapStyle}
                            onClear={handleOnClearMap}
                        />
                    </>
                )}
                <GpsButton onLocate={handleLocate} />
            </div>
        </>
    );
}
