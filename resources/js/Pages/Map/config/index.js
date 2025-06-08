import { LinearInterpolator } from "deck.gl";


const BASE_VIEW = {
    latitude: 10.832699491799959,
    longitude: 106.76397132597475,
    zoom: 11,
    minZoom: 9,
    maxZoom: 20,
    pitch: 0,
    bearing: 0,
    transitionDuration: 1000,
    transitionEasing: (x) =>
        x < 0.5 ? 4 * x ** 3 : 1 - Math.pow(-2 * x + 2, 3) / 2,
};

const BASE_ZOOM = {
    minZoom: 10,
    maxZoom: 20,
    tileSize: 256,
};

const REG_BREAKLINE = /\r?\n/;

const BBOX = {
    ne: [107.27153863227045, 10.581967522802827],
    sw: [106.95816468872187, 10.271504776048417],
};

export {
    BASE_VIEW,
    BASE_ZOOM,
    REG_BREAKLINE,
    BBOX,
};
