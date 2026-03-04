import { motion, AnimatePresence } from "framer-motion";
import type { TabId } from "../../types/navigation";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
  show?: boolean;
}

interface SidebarNavProps {
  tabs: readonly Tab[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  isOpen: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  tabs,
  activeTab,
  onTabChange,
  isOpen,
}) => {
  return (
    <div
      className={`flex-1 py-6 px-3 space-y-2 overflow-x-hidden ${isOpen ? "overflow-y-auto custom-scrollbar" : "overflow-y-hidden"
        }`}
    >
      {tabs
        .filter((t) => t.show !== false)
        .map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                  ? "bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              <div className="relative z-10 flex items-center justify-center min-w-[24px]">
                <Icon
                  size={22}
                  className={`transition-colors duration-200 ${isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "group-hover:text-gray-900 dark:group-hover:text-gray-200"
                    }`}
                />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 1, 0.5, 1],
                      delay: 0.1,
                    }}
                    className="relative z-10 whitespace-nowrap overflow-hidden"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {!isOpen && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                  {tab.label}
                </div>
              )}
            </button>
          );
        })}
    </div>
  );
};
