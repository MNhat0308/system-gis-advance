import { useState } from 'react';
export default function useAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    return {
        authUser,
        setAuthUser,
        showLoginModal,
        setShowLoginModal,
    };
}
