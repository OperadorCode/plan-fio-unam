import { CheckCircle2, Loader2, ArrowRight, BookCheck, Archive } from "lucide-react";

interface MigrationStepProps {
  isAlreadyMigrated: boolean;
  simulation: {
    courses2025Approved: string[];
  };
  onMigrate: () => void;
  onLater: () => void;
  isMigrating?: boolean;
  targetPlanName: string;
}

export const MigrationStep: React.FC<MigrationStepProps> = ({
  isAlreadyMigrated,
  simulation,
  onMigrate,
  onLater,
  isMigrating = false,
  targetPlanName,
}) => {
  return (
    <div className="animate-fade-in w-full">
      {!isAlreadyMigrated ? (
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/60 p-6 sm:p-8 relative overflow-hidden">
          {/* Accent top line */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-purple-500" />

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                Actualizá tu Planificador
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Configurá tu entorno de trabajo para{" "}
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {targetPlanName}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onMigrate}
                disabled={isMigrating}
                className="group px-5 py-2.5 bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isMigrating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Procesando…</span>
                  </>
                ) : (
                  <>
                    <span>Actualizar</span>
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </>
                )}
              </button>
              {!isMigrating && (
                <button
                  onClick={onLater}
                  className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  Más tarde
                </button>
              )}
            </div>
          </div>

          {/* Info chips */}
          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700/50 flex flex-wrap gap-3">
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
              <BookCheck size={15} className="text-green-600 dark:text-green-400 shrink-0" />
              <span className="text-sm text-green-800 dark:text-green-300">
                <strong className="font-semibold">{simulation.courses2025Approved.length}</strong> materias reconocidas
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <Archive size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-sm text-blue-800 dark:text-blue-300">Historial preservado</span>
            </div>
            <span className="flex items-center text-xs text-gray-400 dark:text-gray-500 ml-auto">
              Solo afecta tu visualización local
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-green-200 dark:border-green-800/40 p-6 sm:p-8 flex items-center gap-5 animate-scale-in">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
            <CheckCircle2 size={24} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              ¡Planificador Actualizado!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Ahora estás visualizando el{" "}
              <strong className="text-gray-900 dark:text-white">{targetPlanName}</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
