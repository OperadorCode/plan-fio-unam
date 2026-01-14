import React from "react";
import { GraduationCap, Award } from "lucide-react";

interface IntermediateTitlesProps {
  gainedTitles: {
    bui: boolean;
    intermediateTitle: boolean;
  };
  intermediateTitleName: string;
}

export const IntermediateTitles: React.FC<IntermediateTitlesProps> = ({
  gainedTitles,
  intermediateTitleName,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-auto">
      <div
        className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300
                      ${
                        gainedTitles.bui
                          ? "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-sm"
                          : "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 opacity-60 grayscale"
                      }`}
      >
        <GraduationCap
          className={
            gainedTitles.bui
              ? "text-green-600 dark:text-green-400 mb-2"
              : "text-gray-400 mb-2"
          }
          size={24}
        />
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
          Título Intermedio
        </span>
        <span
          className={`text-xs font-bold leading-tight ${
            gainedTitles.bui
              ? "text-green-800 dark:text-green-200"
              : "text-gray-400"
          }`}
        >
          Bachiller Univ. en Ingeniería
        </span>
        {gainedTitles.bui && (
          <span className="mt-2 text-[10px] bg-white dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-bold shadow-sm border border-green-100 dark:border-green-800">
            CONSEGUIDO
          </span>
        )}
      </div>

      <div
        className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300
                      ${
                        gainedTitles.intermediateTitle
                          ? "bg-gradient-to-br from-purple-50 to-fuchsia-100 dark:from-purple-900/20 dark:to-fuchsia-900/20 border-purple-200 dark:border-purple-800 shadow-sm"
                          : "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 opacity-60 grayscale"
                      }`}
      >
        <Award
          className={
            gainedTitles.intermediateTitle
              ? "text-purple-600 dark:text-purple-400 mb-2"
              : "text-gray-400 mb-2"
          }
          size={24}
        />
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
          Título Técnico
        </span>
        <span
          className={`text-xs font-bold leading-tight ${
            gainedTitles.intermediateTitle
              ? "text-purple-800 dark:text-purple-200"
              : "text-gray-400"
          }`}
        >
          {intermediateTitleName}
        </span>
        {gainedTitles.intermediateTitle && (
          <span className="mt-2 text-[10px] bg-white dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold shadow-sm border border-purple-100 dark:border-purple-800">
            CONSEGUIDO
          </span>
        )}
      </div>
    </div>
  );
};
