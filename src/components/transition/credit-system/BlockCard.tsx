import React from "react";
import type { CreditBlock } from "../../../types/creditSystem";

interface BlockCardProps {
  block: CreditBlock;
  colorClass: string;
  isSelected: boolean;
  onSelect: () => void;
  progress: number;
  approvedCredits: number;
}

export const BlockCard = React.memo(
  ({
    block,
    colorClass,
    isSelected,
    onSelect,
    progress,
    approvedCredits,
  }: BlockCardProps) => {
    const yearIndex = parseInt(block.sigla.charAt(0));

    let yearBgClass = "bg-white dark:bg-gray-800";
    if (progress < 100 && !isNaN(yearIndex)) {
      if (yearIndex === 1) yearBgClass = "bg-slate-50 dark:bg-slate-900/20";
      else if (yearIndex === 2) yearBgClass = "bg-gray-50 dark:bg-gray-900/20";
      else if (yearIndex === 3) yearBgClass = "bg-zinc-50 dark:bg-zinc-900/20";
      else if (yearIndex === 4)
        yearBgClass = "bg-neutral-50 dark:bg-neutral-900/20";
      else if (yearIndex >= 5) yearBgClass = "bg-stone-50 dark:bg-stone-900/20";
    }

    return (
      <div
        onClick={onSelect}
        className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden group
            ${
              isSelected
                ? `${colorClass} bg-blue-50/50 dark:bg-gray-800 ring-2 ring-blue-500/20 shadow-lg scale-[1.02]`
                : `border-gray-200 dark:border-gray-700 ${yearBgClass} hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600`
            }
        `}
      >
        <div className="absolute bottom-0 left-0 h-1 bg-gray-100 dark:bg-gray-700 w-full">
          <div
            className={`h-full transition-all duration-1000 ease-out ${
              isSelected
                ? "bg-blue-500"
                : "bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-400"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-start mb-2 relative z-10">
          <h3
            className={`font-bold text-lg ${
              isSelected
                ? "text-blue-700 dark:text-blue-300"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {block.sigla}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100/80 dark:bg-gray-700/80 font-medium backdrop-blur-sm">
              k = {block.coeficiente_k.toFixed(2)}
            </span>
          </div>
        </div>

        <p
          className="text-sm text-gray-600 dark:text-gray-300 mb-4 h-10 line-clamp-2 leading-relaxed"
          title={block.nombre}
        >
          {block.nombre}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm relative z-10">
          <div className="bg-gray-50/80 dark:bg-gray-900/50 p-2 rounded-lg backdrop-blur-sm">
            <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide">
              Horas
            </div>
            <div className="font-semibold">{block.horas_totales_bloque}</div>
          </div>
          <div
            className={`p-2 rounded-lg backdrop-blur-sm transition-colors
                ${
                  progress > 0
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "bg-gray-50/80 dark:bg-gray-900/50"
                }
            `}
          >
            <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide flex justify-between">
              <span>Créditos</span>
              {progress > 0 && (
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {Math.round(progress)}%
                </span>
              )}
            </div>
            <div className="font-semibold flex items-baseline gap-1">
              <span
                className={
                  progress > 0 ? "text-blue-700 dark:text-blue-300" : ""
                }
              >
                {approvedCredits}
              </span>
              <span className="text-xs text-gray-400 font-normal">
                / {block.creditos_totales_bloque}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
