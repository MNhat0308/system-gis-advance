import { getCircleFeature } from '@/Utils/mapHelper.js';
import { useMemo, useState } from 'react';
export default function useRadiusState() {
    const [drawingRadius, setDrawingRadius] = useState(false);
    const [radiusCenter, setRadiusCenter] = useState(null);
    const [radiusMeters, setRadiusMeters] = useState(1000);
    const [searchNearby, setSearchNearby] = useState([]);

    const radiusFeature = useMemo(() => {
        if (!radiusCenter) return null;
        return getCircleFeature(radiusCenter, radiusMeters);
    }, [radiusCenter, radiusMeters]);

    return {
        drawingRadius,
        setDrawingRadius,
        radiusCenter,
        setRadiusCenter,
        radiusMeters,
        setRadiusMeters,
        radiusFeature,
        searchNearby,
        setSearchNearby,
    };
}
