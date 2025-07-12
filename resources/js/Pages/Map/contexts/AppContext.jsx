import useRadiusState from '@/Pages/Map/contexts/useRadiusState.js';
import { createContext, useContext, useState } from 'react';
import useBusRoute from "@/Pages/Map/contexts/useBusRoute.js";
import useMap from "@/Pages/Map/contexts/useMap.js";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [showFilters, setShowFilters] = useState(true);
    const [activeTab, setActiveTab] = useState('Info');

    const radiusState = useRadiusState();
    const defaultRoute = useBusRoute();
    const mapState = useMap();
    return (
        <AppContext.Provider
            value={{
                showFilters,
                setShowFilters,
                activeTab,
                setActiveTab,
                ...radiusState,
                ...defaultRoute,
                ...mapState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
