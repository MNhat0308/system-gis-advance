import { GeoJsonLayer } from 'deck.gl';
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a GeoJsonLayer for path rendering
 *
 * @param {Object[]} data - GeoJSON FeatureCollection or array of features
 * @param {Function} onClickHandler - click event handler
 * @param {string|number|null} hoveredFeatureId - ID of feature to highlight
 * @param {string} [layerId] - optional unique Deck.gl layer ID
 * @param {number[]} [baseColor] - RGB color array (default: [200, 0, 0])
 * @param getLineColor
 * @returns {GeoJsonLayer}
 */
export const pathLayers = ({
    data,
    onClickHandler,
    hoveredFeatureId,
    layerId = uuidv4(),
    baseColor = [0, 255, 0],
    getLineColor,
}) =>
    new GeoJsonLayer({
        id: layerId,
        data,
        pickable: true,
        lineWidthMinPixels: 2,

        getLineColor:
            getLineColor ||
            ((f) =>
                f?.properties?.id === hoveredFeatureId
                    ? [0, 255, 0]
                    : baseColor),

        getLineWidth: (f) => (f?.properties?.id === hoveredFeatureId ? 4 : 2),

        onClick: onClickHandler,

        transitions: {
            getLineColor: 300,
            getLineWidth: 300,
        },

        updateTriggers: {
            getLineColor: [hoveredFeatureId, JSON.stringify(baseColor)],
            getLineWidth: [hoveredFeatureId],
        },
    });
