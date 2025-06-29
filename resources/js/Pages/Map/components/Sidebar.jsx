import {
    ChevronsLeft,
    ChevronsRight,
    Info,
    List,
    Menu,
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
        if (!next) setActiveTab('Info');
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
                return <FilterPanel filters={filters} />;
            default:
                return null;
        }
    };

    return (
        <>
            {/* Collapsed menu button */}
            {!isOpen && (
                <div className="group absolute left-4 top-4 z-50">
                    <button
                        onClick={toggleOpen}
                        className="rounded bg-white p-2 shadow hover:bg-gray-100"
                    >
                        <Menu className="h-5 w-5 text-gray-700" />
                    </button>
                    <div className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 scale-95 transform whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 shadow transition-all duration-150 group-hover:opacity-100">
                        Open Sidebar
                    </div>
                </div>
            )}

            {/* Sidebar Panel */}
            <div
                className={`absolute left-0 top-0 z-40 flex h-full flex-col overflow-hidden bg-white shadow-lg transition-all duration-300 ease-in-out will-change-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isExpanded ? 'w-96' : 'w-16'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b p-2">
                    {isExpanded && (
                        <h2 className="text-base font-semibold">Information</h2>
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
                    {tabs.map(({ key, label, icon: Icon }) => {
                        const isActive = activeTab === key;
                        return (
                            <div key={key} className="group relative">
                                <button
                                    onClick={() => setActiveTab(key)}
                                    className={`flex w-full items-center gap-2 px-3 py-3 text-sm transition-colors duration-200 ${isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'} `}
                                >
                                    <Icon
                                        size={18}
                                        className={` ${isExpanded ? '' : 'mx-auto'} ${isActive ? 'text-blue-600' : 'text-gray-600'} transition-colors duration-200 group-hover:text-blue-500`}
                                    />
                                    {isExpanded && (
                                        <span className="group-hover:text-blue-500">
                                            {label}
                                        </span>
                                    )}
                                </button>

                                {/* Tooltip only when collapsed */}
                                {!isExpanded && (
                                    <div className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100">
                                        {label}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Content */}
                {isExpanded && (
                    <div className="flex-1 overflow-y-auto p-3">
                        {getContent()}
                    </div>
                )}
            </div>
        </>
    );
};

export default Sidebar;
