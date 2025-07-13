import { useFlash } from '@/Pages/Map/contexts/FlashContext.jsx';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { MapPin, Route, Waypoints } from 'lucide-react';
import ContextMenu from './ContextMenu';

export default function MapContextMenu({ context, onClose }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    const { showFlash } = useFlash();
    if (!context?.visible) return null;

    const { lngLat } = context;

    function handleDirect(type) {
        const lat = lngLat[1].toFixed(5);
        const lng = lngLat[0].toFixed(5);
        const coords = `${lat},${lng}`;

        let url = '';

        switch (type) {
            case 'from':
                url = `https://www.google.com/maps/dir/?api=1&origin=${coords}`;
                break;
            case 'to':
                url = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
                break;
            default:
                showFlash('Invalid direction', 'error');
                return;
        }
        window.open(url, '_blank');
    }

    return (
        <ContextMenu
            visible={context.visible}
            x={context.x}
            y={context.y}
            onClose={onClose}
        >
            <MenuItem
                icon={<MapPin size={16} />}
                label={`${lngLat[1].toFixed(5)}, ${lngLat[0].toFixed(5)}`}
                onClick={() => {
                    copyToClipboard(
                        `${lngLat[1].toFixed(5)}, ${lngLat[0].toFixed(5)}`,
                    );
                    showFlash('Coordinates copied to clipboard', 'success');
                    onClose();
                }}
            />

            <MenuItem
                icon={<Route size={16} />}
                label="Directions from here"
                onClick={() => {
                    handleDirect('from');
                    onClose();
                }}
            />

            <MenuItem
                icon={<Waypoints size={16} />}
                label="Directions to here"
                onClick={() => {
                    handleDirect('to');
                    onClose();
                }}
            />
        </ContextMenu>
    );
}

function MenuItem({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            {icon}
            {label}
        </button>
    );
}
