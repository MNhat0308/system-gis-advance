import {
    ChevronsLeft,
    ChevronsRight,
    Info,
    List,
    SlidersHorizontal,
    X,
} from 'lucide-react';

const tabs = [
    { key: 'Info', label: 'Info', icon: Info },
    { key: 'Legend', label: 'Legend', icon: List },
    { key: 'Filters', label: 'Filters', icon: SlidersHorizontal },
];

const Sidebar = ({
    isOpen,
    setIsOpen,
    isExpanded,
    setIsExpanded,
    activeTab,
    setActiveTab,
    infoData,
    legendData,
    filters,
}) => {
    const toggleOpen = () => setIsOpen(!isOpen);

    const toggleExpand = () => {
        const next = !isExpanded;
        setIsExpanded(next);
        if (!next) {
            setActiveTab('Info'); // optional: reset tab
        }
    };

    const getContent = () => {
        switch (activeTab) {
            case 'Info':
                return infoData ? (
                    <pre className="whitespace-pre-wrap break-words text-sm">
                        {JSON.stringify(infoData, null, 2)}
                    </pre>
                ) : (
                    <p className="text-sm text-gray-500">
                        No feature selected.
                    </p>
                );
            case 'Legend':
                return <div>{legendData || 'Legend content goes here'}</div>;
            case 'Filters':
                return <div>{filters || 'Filter UI goes here'}</div>;
            default:
                return null;
        }
    };

    if (!isOpen) {
        return (
            <button
                className="absolute right-4 top-4 z-50 rounded bg-white px-2 py-1 text-sm font-medium shadow"
                onClick={toggleOpen}
            >
                ☰
            </button>
        );
    }

    return (
        <div
            className={`absolute left-0 top-0 z-40 flex h-full flex-col overflow-hidden bg-white shadow-lg transition-all duration-300 ease-in-out will-change-transform ${isExpanded ? 'w-72' : 'w-16'}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-2">
                {isExpanded && (
                    <h2 className="text-base font-semibold">Sidebar</h2>
                )}

                <div className="ml-auto flex gap-2">
                    <button
                        onClick={toggleExpand}
                        className="text-lg text-gray-500 hover:text-black"
                        title="Expand/Collapse"
                    >
                        {isExpanded ? (
                            <ChevronsLeft size={18} />
                        ) : (
                            <ChevronsRight size={18} />
                        )}
                    </button>
                    <button
                        onClick={toggleOpen}
                        className="text-lg text-gray-500 hover:text-black"
                        title="Close"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-col border-b">
                {tabs.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-2 px-3 py-3 text-sm transition ${
                            activeTab === key
                                ? 'bg-gray-100 font-semibold'
                                : 'hover:bg-gray-50'
                        }`}
                        title={label}
                    >
                        <Icon
                            size={18}
                            className={`${isExpanded ? '' : 'mx-auto'}`}
                        />
                        {isExpanded && <span>{label}</span>}
                    </button>
                ))}
            </div>

            {isExpanded && (
                <div className="flex-1 overflow-y-auto p-3">{getContent()}</div>
            )}
        </div>
    );
};

export default Sidebar;
