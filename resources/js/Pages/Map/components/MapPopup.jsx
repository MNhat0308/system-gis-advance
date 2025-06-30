const MapPopup = ({ x, y, properties, onClose }) => {
    if (!x || !y || !properties) return null;

    return (
        <div
            className="absolute z-50 max-w-xs rounded-lg bg-white p-3 shadow-md"
            style={{
                left: x,
                top: y,
                pointerEvents: 'auto',
                transform: 'translate(-50%, -100%)',
            }}
        >
            <div className="flex justify-end">
                <button
                    onClick={onClose}
                    className="text-lg font-bold text-gray-500 hover:text-gray-800"
                >
                    ×
                </button>
            </div>
            <pre className="whitespace-pre-wrap break-words text-xs">
                {JSON.stringify(properties, null, 2)}
            </pre>
        </div>
    );
};

export default MapPopup;
