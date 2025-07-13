import FlashMessage from '@/Pages/Map/components/FlashMessage.jsx';
import { createContext, useContext, useState } from 'react';

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
    const [flash, setFlash] = useState(null);

    const showFlash = (message, type = 'info', duration = 3000) => {
        setFlash({ message, type });

        setTimeout(() => {
            setFlash(null);
        }, duration);
    };

    return (
        <FlashContext.Provider value={{ showFlash }}>
            {children}
            {flash && (
                <FlashMessage message={flash.message} type={flash.type} />
            )}
        </FlashContext.Provider>
    );
};

export const useFlash = () => useContext(FlashContext);
