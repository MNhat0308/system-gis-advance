// src/components/ContextMenu.jsx
import { useEffect, useRef } from 'react';

export default function ContextMenu({ x, y, visible, onClose, children }) {
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose?.();
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };

        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div
            ref={menuRef}
            className="animate-fade-in absolute z-50 w-48 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
            style={{ top: y, left: x }}
        >
            {children}
        </div>
    );
}
