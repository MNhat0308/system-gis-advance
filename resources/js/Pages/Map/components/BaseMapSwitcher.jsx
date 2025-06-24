import { BASEMAPS } from '@/Pages/Map/config/index.js';

const BaseMapSwitcher = ({
    currentStyle,
    onChange,
    positionClass = 'bottom-4 left-15',
}) => {
    return (
        <div
            className={`absolute ${positionClass} z-50 flex gap-2 rounded-full bg-white px-3 py-1 shadow-md`}
        >
            {BASEMAPS.map(({ label, style, icon: Icon }) => (
                <button
                    key={label}
                    onClick={() => onChange(style)}
                    className={`flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition ${
                        currentStyle === style
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-black hover:bg-gray-100'
                    }`}
                >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{label}</span>
                </button>
            ))}
        </div>
    );
};
export default BaseMapSwitcher;
