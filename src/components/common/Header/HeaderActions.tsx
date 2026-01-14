import React from "react";
import { DownloadCloud, Moon, Sun, Search } from "lucide-react";
import { usePWAInstall } from "../../../hooks/usePWAInstall";
import { DataMenu } from "../DataMenu";

interface HeaderActionsProps {
  theme: string;
  toggleTheme: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  theme,
  toggleTheme,
}) => {
  const { isInstallable, install } = usePWAInstall();

  return (
    <div className="flex items-center gap-1 flex-shrink-0 ml-1">
      {/* Botón de Instalación PWA */}
      {isInstallable && (
        <button
          onClick={install}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all hover:scale-105 animate-fade-in"
          title="Instalar Aplicación"
        >
          <DownloadCloud size={16} />
          <span>Instalar</span>
        </button>
      )}

      <button
        onClick={toggleTheme}
        aria-label={
          theme === "light" ? "Activar Modo Oscuro" : "Activar Modo Claro"
        }
        className="p-2 text-blue-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        title={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <button
        onClick={() =>
          window.dispatchEvent(new CustomEvent("open-command-palette"))
        }
        className="p-2 text-blue-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Buscar Materia (Ctrl+K)"
      >
        <Search size={20} />
      </button>

      <DataMenu />
    </div>
  );
};
