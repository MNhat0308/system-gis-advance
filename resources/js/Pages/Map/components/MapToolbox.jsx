import { BASEMAPS } from '@/Pages/Map/config/index.js';
import { useAppContext } from '@/Pages/Map/contexts/AppContext.jsx';
import { Circle, Layers, Map, Trash2, Wrench, X } from 'lucide-react';
import { useState } from 'react';

export default function MapToolbox({
    onToggleLayer,
    onClear,
    onBasemapChange,
    currentBasemap,
}) {
    const { drawingRadius, setDrawingRadius, radiusMeters, setRadiusMeters } =
        useAppContext();

    const [open, setOpen] = useState(false);

    const handleRadiusChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val > 0 && val <= 1000) {
            setRadiusMeters(val);
        }
    };

    return (
        <div className="absolute right-4 top-4 z-50 flex flex-col items-end">
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white p-2 shadow transition hover:bg-gray-100"
                title="Map Tools"
            >
                <Wrench
                    className={`absolute h-5 w-5 transition-opacity duration-200 ${
                        open ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                <X
                    className={`absolute h-5 w-5 transition-opacity duration-200 ${
                        open ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            </button>

            {/* Toolbox Panel */}
            <div
                className={`mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
                    open
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
            >
                {/* Radius Tool Row */}
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-3">
                    <button
                        onClick={() => setDrawingRadius(true)}
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm transition ${
                            drawingRadius
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        <Circle size={16} />
                        <span>Draw Radius</span>
                    </button>
                    <div className="flex items-center gap-1">
                        <input
                            type="number"
                            min={1}
                            max={1000}
                            value={radiusMeters}
                            onChange={handleRadiusChange}
                            className="w-20 rounded border px-2 py-1 text-sm"
                            title="Radius in meters"
                        />
                        <span className="text-xs text-gray-500">m</span>
                    </div>
                </div>

                <ToolButton
                    icon={<Layers className="h-4 w-4" />}
                    label="Toggle Layer"
                    onClick={() => {
                        onToggleLayer?.();
                        setOpen(false);
                    }}
                />
                <ToolButton
                    icon={<Trash2 className="h-4 w-4" />}
                    label="Clear Map"
                    onClick={() => {
                        onClear?.();
                        setOpen(false);
                    }}
                />
                <hr className="my-2 border-t border-gray-200" />

                <div className="mb-2 flex items-center gap-1 px-4 text-xs font-semibold text-gray-600">
                    <Map size={14} className="text-gray-500" />
                    <span>Base Map</span>
                </div>

                <div className="grid grid-cols-2 gap-2 px-4 pb-3">
                    {BASEMAPS.map(({ label, style, icon: Icon }) => (
                        <button
                            key={label}
                            onClick={() => {
                                onBasemapChange?.(style);
                                setOpen(false);
                            }}
                            className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs transition ${
                                currentBasemap === style
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-300 bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            <Icon size={14} />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ToolButton({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
        >
            {icon}
            {label}
        </button>
    );
}
