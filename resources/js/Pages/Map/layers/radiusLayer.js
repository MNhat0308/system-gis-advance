import { GeoJsonLayer } from '@deck.gl/layers';

/**
 * Creates a Deck.gl layer for visualizing a radius circle.
 * @param {object} radiusFeature - A GeoJSON Feature object representing a circle.
 * @returns {GeoJsonLayer|null}
 */
export default function createRadiusLayer(radiusFeature) {
    if (!radiusFeature) return null;

    return new GeoJsonLayer({
        id: 'radius-layer',
        data: radiusFeature,
        filled: true,
        stroked: true,
        pickable: false,
        getFillColor: [255, 0, 0, 50],
        getLineColor: [255, 0, 0, 200],
        lineWidthMinPixels: 2,
    });
}
