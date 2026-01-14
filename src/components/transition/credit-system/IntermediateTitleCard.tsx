import React from "react";
import {
  GraduationCap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TitleData {
  name: string;
  subtitle: string;
  current: number;
  total: number;
  isReady: boolean;
  requirements: string;
}

interface IntermediateTitleCardProps {
  currentTitle: TitleData;
  currentIndex: number;
  totalTitles: number;
  onNext: () => void;
  onPrev: () => void;
}

export const IntermediateTitleCard: React.FC<IntermediateTitleCardProps> = ({
  currentTitle,
  currentIndex,
  totalTitles,
  onNext,
  onPrev,
}) => {
  const percentage =
    Math.min(
      100,
      Math.round((currentTitle.current / currentTitle.total) * 100)
    ) || 0;

  return (
    <div
      className={`rounded-xl p-6 border shadow-sm relative overflow-hidden transition-colors
                ${
                  currentTitle.isReady
                    ? "bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800 border-indigo-200 dark:border-indigo-800"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }
            `}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <GraduationCap
          size={100}
          className="text-indigo-600 dark:text-indigo-400"
        />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-lg ${
                currentTitle.isReady
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500"
              }`}
            >
              {currentTitle.isReady ? (
                <CheckCircle2 size={20} />
              ) : (
                <GraduationCap size={20} />
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-gray-700 dark:text-gray-200 leading-none">
                Título Intermedio
              </h3>
              {totalTitles > 1 && (
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-1">
                  {currentIndex + 1} de {totalTitles}
                </span>
              )}
            </div>
          </div>

          {totalTitles > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={onPrev}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={onNext}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <h4 className="font-bold text-lg text-indigo-700 dark:text-indigo-300 leading-tight mb-2 min-h-[3.5rem] flex items-center">
          {currentTitle.name}
        </h4>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-gray-500">
            <span>{currentTitle.subtitle}</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                currentTitle.isReady ? "bg-green-500" : "bg-indigo-500"
              }`}
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {currentTitle.isReady ? (
              <span className="text-green-600 dark:text-green-400 font-bold">
                ¡Requisitos Completados! Podés tramitar tu título.
              </span>
            ) : (
              <span>{currentTitle.requirements}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
