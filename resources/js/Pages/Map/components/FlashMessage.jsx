import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FlashMessage({
    message,
    type = 'info',
    duration = 3000,
}) {
    const [visible, setVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLeaving(true);
            setTimeout(() => setVisible(false), 300); // match animation duration
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    const baseStyle =
        'fixed top-4 right-4 z-50 flex items-center gap-2 rounded-md px-4 py-2 text-sm shadow-lg';
    const typeStyles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-black',
    };

    const animationClass = isLeaving
        ? 'animate-slide-out-right'
        : 'animate-slide-in-right';

    return (
        <div className={`${baseStyle} ${typeStyles[type]} ${animationClass}`}>
            <span>{message}</span>
            <button
                onClick={() => setIsLeaving(true)}
                className="ml-2 hover:opacity-80"
            >
                <X size={16} />
            </button>
        </div>
    );
}
