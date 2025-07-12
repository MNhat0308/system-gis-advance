import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedPathLine, setSelectedPathLine] = useState(null);

    return (
        <AppContext.Provider
            value={{
                selectedRoute,
                setSelectedRoute,
                selectedVariant,
                setSelectedVariant,
                selectedPathLine,
                setSelectedPathLine,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
