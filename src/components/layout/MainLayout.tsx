import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import type { TabId } from "../../types/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  tabs: readonly any[];
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const MainLayout = ({
  children,
  header,
  activeTab,
  onTabChange,
  tabs,
  mobileOpen,
  setMobileOpen,
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

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden backdrop-blur-sm"
          style={{ zIndex: 100 }}
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 101 }}
      >
        <Sidebar
          activeTab={activeTab}
          onTabChange={(id) => {
            onTabChange(id);
            setMobileOpen(false);
          }}
          isOpen={true}
          toggle={() => setMobileOpen(false)}
          tabs={tabs}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {header}

        <main className="flex-1 overflow-y-auto custom-scrollbar p-0">
          {children}
        </main>
      </div>
    </div>
  );
};
