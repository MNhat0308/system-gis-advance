import { GeoJsonLayer } from 'deck.gl';

export const pathLayers = (data, onClickHandler, hoveredFeatureId) =>
    new GeoJsonLayer({
        id: 'roads-layer',
        data,
        pickable: true,
        lineWidthMinPixels: 2,
        getLineColor: (f) =>
            f?.properties?.id === hoveredFeatureId ? [0, 255, 0] : [200, 0, 0], // green if hovered
        getLineWidth: (f) => (f?.properties?.id === hoveredFeatureId ? 4 : 2), // thicker when hovered

        onClick: onClickHandler,

        transitions: {
            getLineColor: 300,
            getLineWidth: 300,
        },

        updateTriggers: {
            getLineColor: [hoveredFeatureId],
            getLineWidth: [hoveredFeatureId],
        },
    });
