// components/PointMarkersLayer.jsx

import { extractPointsFromGeoJSON } from '@/Utils/mapHelper.js';
import { IconLayer } from 'deck.gl';

/**
 * Reusable ScatterplotLayer to mark each point of LineStrings in a GeoJSON
 *
 * @param {Object} props
 * @param {Object} props.data - GeoJSON FeatureCollection with LineStrings
 * @param {Array} props.color - RGB array, default [0, 0, 255]
 * @param {number} props.radius - Radius in meters, default 20
 * @param {Function} props.onClick - Optional click handler
 */

const iconMapping = {
    bus: {
        x: 0,
        y: 0,
        width: 64,
        height: 64,
        anchorY: 64,
        mask: true,
    },
};

const PointMarkersLayer = ({
    data,
    iconAtlas = '/icons/bus.png',
    iconMapping,
    sizeScale = 10,
    onClick,
}) => {
    const points = extractPointsFromGeoJSON(data); // same as before

    return new IconLayer({
        id: 'bus-stop-icons',
        data: points.map((p) => ({ ...p, icon: 'bus' })),
        iconAtlas,
        iconMapping,
        getIcon: (d) => d.icon,
        sizeScale,
        getPosition: (d) => d.coordinates,
        getSize: 5,
        getColor: [0, 0, 0],
        pickable: true,
        onClick,
    });
};
export default PointMarkersLayer;
