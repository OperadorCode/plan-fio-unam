import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface LostCoursesDetailProps {
  lostCoursesDetails: { id: string; name: string }[];
  totalApprovedOriginal?: number;
}

export const LostCoursesDetail: React.FC<LostCoursesDetailProps> = ({
  lostCoursesDetails,
  totalApprovedOriginal = 0,
}) => {
  if (lostCoursesDetails.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800/30 flex items-start gap-3">
        <CheckCircle2
          className="text-green-500 flex-shrink-0 mt-0.5\"
          size={20}
        />
        <div>
          <p className="text-sm text-green-800 dark:text-green-200 font-semibold">
            Equivalencias completas
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            {totalApprovedOriginal > 0
              ? `Tus ${totalApprovedOriginal} materias aprobadas tienen reconocimiento directo o por equivalencia en el nuevo plan.`
              : "No tenés materias aprobadas que requieran equivalencia."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 overflow-hidden">
      <div className="bg-red-100/50 dark:bg-red-900/20 px-4 py-2 border-b border-red-100 dark:border-red-900/30 flex justify-between items-center">
        <h4 className="font-bold text-red-800 dark:text-red-200 text-xs flex items-center gap-1.5 uppercase tracking-wide">
          <AlertCircle size={14} />
          Sin Equivalencia Directa ({lostCoursesDetails.length})
        </h4>
      </div>
      <div className="p-3 max-h-32 overflow-y-auto custom-scrollbar">
        <ul className="space-y-2">
          {lostCoursesDetails.map((course) => (
            <li
              key={course.id}
              className="text-xs text-red-700 dark:text-red-300 flex items-start gap-2"
            >
              <span className="mt-0.5 w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></span>
              <div>
                <span className="font-semibold">{course.name}</span>
                <span className="opacity-70 ml-1 text-[10px]">
                  ({course.id})
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
