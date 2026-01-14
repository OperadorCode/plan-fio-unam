import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Settings,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useDataManagement } from "../../hooks/useDataManagement";
import { useAppStore } from "../../store/useAppStore";
import { ConfirmationModal } from "./ConfirmationModal";

export const DataMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { exportData, importData, isImporting, isExporting } =
    useDataManagement();
  const resetProgress = useAppStore((state) => state.resetProgress);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await importData(file);
    setFeedback({
      type: result.success ? "success" : "error",
      msg: result.message,
    });

    setTimeout(() => setFeedback(null), 3000);

    e.target.value = "";
    setIsOpen(false);
  };

  const handleReset = () => {
    resetProgress();
    setIsOpen(false);
    setFeedback({ type: "success", msg: "Progreso reiniciado correctamente." });
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Gestión de Datos"
      >
        <Settings size={20} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1 z-50 animate-fade-in origin-top-right">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Datos y Configuración
            </span>
          </div>

          <div className="p-1 space-y-0.5">
            <button
              onClick={() => {
                exportData();
                setIsOpen(false);
              }}
              disabled={isExporting}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg flex items-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} className="text-blue-500" />
              <div>
                <span className="font-medium">
                  {isExporting ? "Exportando..." : "Exportar Backup"}
                </span>
                <p className="text-[10px] text-gray-400">
                  Descargar progreso actual
                </p>
              </div>
            </button>

            <button
              onClick={handleImportClick}
              disabled={isImporting}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg flex items-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={16} className="text-green-500" />
              <div>
                <span className="font-medium">
                  {isImporting ? "Importando..." : "Restaurar Backup"}
                </span>
                <p className="text-[10px] text-gray-400">
                  Cargar archivo .json
                </p>
              </div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />

            <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />

            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center gap-3 transition-colors"
            >
              <Trash2 size={16} />
              <span>Reiniciar Progreso</span>
            </button>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="¿Borrar todo?"
        message="Se perderán todas las materias aprobadas y notas guardadas. Esta acción no se puede deshacer."
        confirmText="Borrar Todo"
        type="danger"
      />
      {feedback &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-[9999] animate-slide-in-up">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
                feedback.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/90 dark:border-green-800 dark:text-white"
                  : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/90 dark:border-red-800 dark:text-white"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertTriangle size={20} />
              )}
              <span className="text-sm font-medium">{feedback.msg}</span>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
