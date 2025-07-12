import { BASE_VIEW } from '@/Pages/Map/config/index.js';
import { useState } from 'react';

export default function useMap() {
    const [baseMapStyle, setBaseMapStyle] = useState(
        'mapbox://styles/mapbox/light-v11',
    );
    const [viewState, setViewState] = useState(BASE_VIEW);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        lngLat: null,
    });

    return {
        baseMapStyle,
        setBaseMapStyle,
        viewState,
        setViewState,
        mapLoaded,
        setMapLoaded,
        contextMenu,
        setContextMenu,
    };
}
