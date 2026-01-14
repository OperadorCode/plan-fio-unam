import React from "react";
import { TrendingUp } from "lucide-react";
import { IntermediateTitles } from "./IntermediateTitles";
import { LostCoursesDetail } from "./LostCoursesDetail";

interface TargetPlanCardProps {
  progress: number;
  approvedCountOriginal: number;
  coursesApproved2025: string[];
  lostCoursesDetails: { id: string; name: string }[];
  gainedTitles: {
    bui: boolean;
    intermediateTitle: boolean;
  };
  intermediateTitle: string;
  targetPlanYear: number;
}

export const TargetPlanCard: React.FC<TargetPlanCardProps> = ({
  progress,
  approvedCountOriginal,
  coursesApproved2025,
  lostCoursesDetails,
  gainedTitles,
  intermediateTitle,
  targetPlanYear,
}) => {
  const gainedCount = coursesApproved2025.length - approvedCountOriginal;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col h-full border border-blue-100 dark:border-blue-900/30 relative ring-1 ring-blue-500/20 overflow-hidden">
      <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
        Proyección
      </div>

      <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800 flex items-center">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 text-base">
          <TrendingUp size={18} className="text-blue-600 dark:text-blue-400" />
          Nuevo Plan ({targetPlanYear})
        </h3>
      </div>

      <div className="p-5 flex-grow flex flex-col gap-5">
        <div>
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-medium text-blue-900 dark:text-blue-200 uppercase tracking-wide">
              Progreso Estimado
            </span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 w-full bg-blue-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${
                progress > 0
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "bg-transparent"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-between items-center mt-3">
            {gainedCount > 0 ? (
              <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full font-bold">
                +{gainedCount} materias ganadas
              </span>
            ) : gainedCount < 0 ? (
              <span className="text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                {gainedCount} materias (compactación)
              </span>
            ) : (
              <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full font-medium">
                Sin cambios en cantidad
              </span>
            )}
            <p className="text-[10px] text-blue-700 dark:text-blue-400 font-medium">
              {coursesApproved2025.length} reconocidas
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <LostCoursesDetail
            lostCoursesDetails={lostCoursesDetails}
            totalApprovedOriginal={approvedCountOriginal}
          />
          <IntermediateTitles
            gainedTitles={gainedTitles}
            intermediateTitleName={intermediateTitle}
          />
        </div>
      </div>
    </div>
  );
};
