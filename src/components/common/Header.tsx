import React, { useState, useEffect } from "react";
import { Menu, GraduationCap } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { careersRegistry } from "../../data/careers";
import { getCareerIcon } from "../../utils/iconHelpers";
import { getCareerStyles } from "../../utils/styleHelpers";
import { CareerSelector } from "./Header/CareerSelector";
import { PlanSelector } from "./Header/PlanSelector";
import { HeaderActions } from "./Header/HeaderActions";

/**
 * Componente Header
 * Gestiona la navegación, selección de carrera, versiones de planes y el cambio de tema global.
 */
interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const careerId = useAppStore((state) => state.careerId);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const currentCareer = careersRegistry[careerId];
  const styles = getCareerStyles("blue");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-0">
      <div className="container mx-auto px-2 sm:px-4 min-h-14 sm:min-h-16 py-2 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
        <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 select-none flex-shrink-0">
            <button
              onClick={onMenuClick}
              className="md:hidden p-1.5 sm:p-2 -ml-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label="Abrir menú"
            >
              <Menu size={22} className="sm:w-6 sm:h-6" />
            </button>
            <div
              className={`p-2 sm:p-2.5 rounded-xl ${styles.bg} ${styles.text} shadow-lg ${styles.shadow}`}
            >
              {currentCareer ? (
                getCareerIcon(currentCareer.icon, 20)
              ) : (
                <GraduationCap size={20} />
              )}
            </div>

            <div className="hidden sm:flex flex-col leading-none min-w-0">
              <span className="font-extrabold text-gray-900 dark:text-white text-base md:text-lg tracking-tight truncate max-w-[180px] md:max-w-none">
                {currentCareer?.name || "Planificador FIO"}
              </span>
              <div className="hidden md:flex items-center gap-1.5 mt-1">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                  Facultad de Ingeniería
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                  • UNaM
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0 relative z-40">
            <CareerSelector />
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-0.5 sm:mx-1"></div>
            <PlanSelector />
          </div>
        </div>

        <HeaderActions theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
