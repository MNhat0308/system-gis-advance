import { Loader2, LocateFixed } from 'lucide-react';
import { useState } from 'react';

export default function GpsButton({ onLocate }) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setLoading(false);
                onLocate({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
            },
            (err) => {
                setLoading(false);
                alert('Unable to retrieve your location.');
                console.error(err);
            },
        );
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="absolute bottom-4 right-2 z-10 flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 shadow-md hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            ) : (
                <LocateFixed className="h-5 w-5 text-gray-700" />
            )}
        </button>
    );
}
