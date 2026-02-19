import React from "react";
import type { TabId } from "../../types/navigation";

interface Tab {
    id: TabId;
    label: string;
    shortLabel: string;
    icon: React.ElementType;
    show?: boolean;
}

interface BottomNavBarProps {
    tabs: readonly Tab[];
    activeTab: TabId;
    onTabChange: (tabId: TabId) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
    tabs,
    activeTab,
    onTabChange,
}) => {
    const visibleTabs = tabs.filter((t) => t.show !== false);

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-50
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-md
        border-t border-gray-200 dark:border-gray-800
        shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <div className="flex h-16">
                {visibleTabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex-1 flex flex-col items-center justify-center gap-1
                transition-colors duration-200 select-none
                ${isActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                            aria-label={tab.label}
                            aria-current={isActive ? "page" : undefined}
                        >
                            <span
                                className={`block h-0.5 w-8 rounded-full transition-all duration-300
                  ${isActive
                                        ? "bg-blue-600 dark:bg-blue-400 scale-100 opacity-100"
                                        : "bg-transparent scale-0 opacity-0"
                                    }`}
                            />

                            <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />

                            <span className={`text-[10px] leading-none ${isActive ? "font-semibold" : "font-medium"}`}>
                                {tab.shortLabel}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
