import { extractPointsFromStations } from '@/Utils/mapHelper';
import { IconLayer } from '@deck.gl/layers';

const iconMapping = {
    bus: { x: 0, y: 0, width: 64, height: 64, mask: true },
};

export default function PointMarkersLayer({
    data,
    icon = 'bus',
    size = 10,
    sizeScale = 4,
    color = [255, 99, 71],
    iconAtlas = '/assets/images/bus.png',
    hoveredIndex = null,
    ...others
}) {
    const points = extractPointsFromStations(data || []).map((point, id) => ({
        ...point,
        icon,
        id,
    }));

    return new IconLayer({
        id: `icon-layer-${icon}`,
        data: points,
        pickable: true,
        iconAtlas,
        iconMapping,
        getIcon: (d) => d.icon,
        getPosition: (d) => {
            const [lng, lat] = d.coordinates;
            return [lng, lat + 0.00005]; // slight offset so icon doesn't overlap path line
        },
        sizeScale,
        getSize: (d) =>
            d.properties.pointIndex === hoveredIndex ? size * 2 : size,
        getColor: (d) =>
            d.properties.pointIndex === hoveredIndex ? [255, 150, 50] : color,
        updateTriggers: {
            getSize: [hoveredIndex],
            getColor: [hoveredIndex],
        },
        ...others,
    });
}
