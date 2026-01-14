import React from "react";
import { Calendar, CheckCircle2, Circle, GraduationCap } from "lucide-react";

interface CurrentPlanCardProps {
  progress: number;
  approvedCount: number;
  totalCourses: number;
  planYear: number;
}

export const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({
  progress,
  approvedCount,
  totalCourses,
  planYear,
}) => {
  const getStatusLabel = (prog: number) => {
    if (prog === 0) return "Sin Iniciar";
    if (prog < 30) return "Inicial";
    if (prog < 70) return "En Curso";
    if (prog < 95) return "Avanzado";
    return "Finalizando";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col h-full border border-gray-100 dark:border-gray-700">
      <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 text-base">
          <Calendar size={18} className="text-gray-500" />
          Plan Actual ({planYear})
        </h3>
        <span className="text-xs font-semibold px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
          {getStatusLabel(progress)}
        </span>
      </div>

      <div className="p-6 flex-grow flex flex-col gap-6">
        {/* Barra de Progreso */}
        <div className="mb-2">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Progreso General
            </span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                progress > 0 ? "bg-gray-800 dark:bg-gray-200" : "bg-transparent"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 flex-grow">
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
              <CheckCircle2
                size={24}
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {approvedCount}
            </span>
            <span className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 mt-1 tracking-wider">
              Aprobadas
            </span>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-3">
              <Circle
                size={24}
                className="text-amber-500 dark:text-amber-400"
              />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {totalCourses - approvedCount}
            </span>
            <span className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 mt-1 tracking-wider">
              Restantes
            </span>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
              <GraduationCap
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {totalCourses}
            </span>
            <span className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 mt-1 tracking-wider">
              Total
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
