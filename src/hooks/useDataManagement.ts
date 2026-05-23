import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { BackupFileSchema } from "../schemas/backupSchema";
import { careersRegistry } from "../data/careers";

export const useDataManagement = () => {
  const state = useAppStore();
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const exportData = () => {
    setIsExporting(true);
    setImportError(null);

    try {
      const backup = {
        version: 1,
        timestamp: new Date().toISOString(),
        data: {
          careerId: state.careerId,
          activePlanId: state.activePlanId,
          courseStatus: state.courseStatus,
          selectedElectives: state.selectedElectives,
          examPlan: state.examPlan,
          notes: state.notes,
          calendarEvents: state.calendarEvents,
        },
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `planificador-fio-backup-${state.careerId}-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("[DataManagement] Export error:", error);
      setImportError("Error al exportar los datos");
    } finally {
      setIsExporting(false);
    }
  };

  const importData = (
    file: File
  ): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
      if (file.size > MAX_FILE_SIZE) {
        const message = `El archivo es demasiado grande (${(file.size / 1024 / 1024).toFixed(1)}MB). El límite es 1MB.`;
        setImportError(message);
        resolve({ success: false, message });
        return;
      }

      setIsImporting(true);
      setImportError(null);

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          let parsed: unknown;

          try {
            parsed = JSON.parse(content);
          } catch {
            const message = "El archivo no es un JSON válido.";
            setImportError(message);
            resolve({ success: false, message });
            return;
          }

          const result = BackupFileSchema.safeParse(parsed);

          if (!result.success) {
            console.error(
              "[DataManagement] Schema validation error:",
              result.error
            );
            const firstError = result.error.issues[0];
            const message = `Archivo inválido: ${firstError.path.join(".")} - ${
              firstError.message
            }`;
            setImportError(message);
            resolve({ success: false, message });
            return;
          }

          const { data } = result.data;

          if (!careersRegistry[data.careerId]) {
            const message = `La carrera '${data.careerId}' no existe en el sistema.`;
            setImportError(message);
            resolve({ success: false, message });
            return;
          }

          state.loadBackup({
            careerId: data.careerId,
            activePlanId: data.activePlanId,
            courseStatus: data.courseStatus,
            selectedElectives: data.selectedElectives || {},
            examPlan: data.examPlan || {},
            notes: data.notes || {},
            calendarEvents: data.calendarEvents || {},
          });

          const message = "Datos restaurados correctamente.";
          resolve({ success: true, message });
        } catch (error) {
          console.error("[DataManagement] Unexpected import error:", error);
          const message = "Ocurrió un error inesperado al procesar el archivo.";
          setImportError(message);
          resolve({ success: false, message });
        } finally {
          setIsImporting(false);
        }
      };

      reader.onerror = () => {
        const message = "Error al leer el archivo.";
        setImportError(message);
        setIsImporting(false);
        resolve({ success: false, message });
      };

      reader.readAsText(file);
    });
  };

  return {
    exportData,
    importData,
    isImporting,
    isExporting,
    importError,
  };
};
