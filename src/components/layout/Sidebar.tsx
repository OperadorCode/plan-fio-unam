import { motion } from "framer-motion";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";
import type { TabId } from "../../types/navigation";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
  show?: boolean;
}

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  isOpen: boolean;
  toggle: () => void;
  tabs: readonly Tab[];
}

export const Sidebar = ({
  activeTab,
  onTabChange,
  isOpen,
  toggle,
  tabs,
  className = "",
}: SidebarProps & { className?: string }) => {
  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? 280 : 80,
        transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
      }}
      style={{ willChange: "width" }}
      className={`
        bg-white dark:bg-gray-900 
        flex flex-col
        h-full
        relative
        z-30
        transition-width duration-300 ease-in-out
        ${className}
      `}
    >
      <SidebarHeader isOpen={isOpen} toggle={toggle} />
      <SidebarNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        isOpen={isOpen}
      />

      <SidebarFooter isOpen={isOpen} />
    </motion.aside>
  );
};
