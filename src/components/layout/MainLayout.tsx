import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNavBar } from "./BottomNavBar";
import type { TabId } from "../../types/navigation";

interface Tab {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  show?: boolean;
}

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  tabs: readonly Tab[];
}

export const MainLayout = ({
  children,
  header,
  activeTab,
  onTabChange,
  tabs,
}: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 1024;
    }
    return true;
  });

  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        if (window.innerWidth < 768) {
          setIsSidebarOpen(false);
        }
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 font-sans">
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        tabs={tabs}
        className="hidden md:flex border-r border-gray-200 dark:border-gray-800"
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {header}

        <main className="flex-1 overflow-y-auto custom-scrollbar p-0 pb-16 md:pb-0">
          {children}
        </main>
      </div>

      <BottomNavBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
};
