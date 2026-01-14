import { CheckCircle2, Loader2, Rocket, ArrowRight } from "lucide-react";

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
    <div className="animate-fade-in max-w-2xl mx-auto py-8">
      {!isAlreadyMigrated ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-indigo-500/5 border border-indigo-100 dark:border-indigo-900/50 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl rotate-3 flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400 shadow-sm mb-6">
              <Rocket size={40} className="-rotate-3" strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                Actualizá tu Planificador
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
                Configura tu entorno de trabajo para{" "}
                <strong className="text-indigo-600 dark:text-indigo-300 font-semibold">
                  {targetPlanName}
                </strong>{" "}
                y visualiza tu avance correctamente.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl text-left border border-gray-100 dark:border-gray-700/50 space-y-4 max-w-md mx-auto">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Impacto en la aplicación
              </h3>
              <div className="flex items-start gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {simulation.courses2025Approved.length} materias reconocidas
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Se marcarán automáticamente en tu nuevo plan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    Historial preservado
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Tu progreso anterior queda guardado como referencia.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3 items-center">
              <button
                onClick={onMigrate}
                disabled={isMigrating}
                className="group w-full sm:w-auto min-w-[240px] px-8 py-4 bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-none transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isMigrating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <span>Actualizar Planificador</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>

              {!isMigrating && (
                <button
                  onClick={onLater}
                  className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Quizás más tarde
                </button>
              )}
              <p className="text-xs text-gray-400 mt-4">
                Esta acción solo afecta a tu visualización local.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 animate-scale-in">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-400 mb-6 shadow-sm">
            <CheckCircle2 size={48} strokeWidth={2} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            ¡Planificador Actualizado!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-lg">
            Ahora estás visualizando el <br />
            <strong className="text-gray-900 dark:text-white">
              {targetPlanName}
            </strong>
            .
          </p>
        </div>
      )}
    </div>
  );
};
