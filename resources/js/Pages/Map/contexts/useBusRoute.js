import { useState } from 'react';

export default function useBusRoute() {
    const [selectedStop, setSelectedStop] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedPathLine, setSelectedPathLine] = useState(null);
    const [listRoutes, setListRoutes] = useState([]);

    return {
        selectedStop,
        setSelectedStop,
        selectedRoute,
        setSelectedRoute,
        selectedVariant,
        setSelectedVariant,
        selectedPathLine,
        setSelectedPathLine,
        listRoutes,
        setListRoutes,
    };
}
