import React from "react";
import { CheckCircle, BookOpen, ArrowRight } from "lucide-react";
import Tooltip from "../../common/Tooltip";
import type { EquivalenceRule } from "../../../types";
import type { CourseMeta2013 } from "../../../hooks/useCareerMetadata";

interface EnrichedEquivalence extends EquivalenceRule {
  targetName: string;
  targetRegimen?: string;
  targetBlock?: string;
}

interface EquivalenceRowProps {
  eq: EnrichedEquivalence;
  courseMeta2013: Record<string, CourseMeta2013>;
  approvedCourses: string[];
}

export const EquivalenceRow: React.FC<EquivalenceRowProps> = React.memo(
  ({ eq, courseMeta2013, approvedCourses }) => {
    const sourceItems = eq.sourceIds.map((id: string) => {
      const meta = courseMeta2013[id];
      const isDone = approvedCourses.includes(id);
      return {
        id,
        name: meta?.name || id,
        isDone,
        regimen: meta?.regimen,
        hours: meta?.hours,
      };
    });

    const isEquivalenceComplete = sourceItems.every(
      (s: { isDone: boolean }) => s.isDone
    );
    const isPartial =
      !isEquivalenceComplete &&
      sourceItems.some((s: { isDone: boolean }) => s.isDone);

    return (
      <tr
        className={`group transition-colors border-b last:border-0 border-gray-50 dark:border-gray-800
                ${
                  isEquivalenceComplete
                    ? "bg-blue-50/10 dark:bg-blue-900/5 hover:bg-blue-50/30"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/20"
                }
            `}
      >
        <td className="px-3 sm:px-6 py-4 align-top break-words">
          <div className="flex flex-col gap-3">
            {sourceItems.map((src: any) => (
              <div
                key={src.id}
                className={`flex items-start gap-3 ${
                  src.isDone
                    ? "opacity-100"
                    : "opacity-70 group-hover:opacity-100 transition-opacity"
                }`}
              >
                {src.isDone ? (
                  <CheckCircle
                    size={16}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                ) : (
                  <BookOpen
                    size={16}
                    className="text-gray-300 mt-0.5 flex-shrink-0"
                  />
                )}
                <div className="leading-tight flex flex-col items-start gap-1">
                  <span
                    className={`font-semibold text-sm ${
                      src.isDone
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {src.name}
                  </span>
                  <div className="flex items-center flex-wrap gap-2 text-xs">
                    <span className="font-mono text-gray-500 font-medium">
                      {src.id}
                    </span>
                    {src.regimen && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 uppercase tracking-wide border border-gray-200 dark:border-gray-600">
                        {src.regimen}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </td>

        <td className="px-2 py-4 align-top text-center">
          <div className="flex flex-col items-center justify-start mt-1 space-y-2">
            <Tooltip
              content={
                eq.type === "DIRECTA"
                  ? "Equivalencia total: Se te dará por aprobada automáticamente."
                  : eq.type === "PARCIAL"
                  ? "Equivalencia parcial: Podés necesitar rendir un complemento."
                  : "Tipo de equivalencia especial."
              }
            >
              <div
                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-sm cursor-help transition-transform hover:scale-105 select-none
                                        ${
                                          eq.type === "DIRECTA"
                                            ? "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                                            : "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800"
                                        }`}
              >
                {eq.type}
              </div>
            </Tooltip>

            <div className="flex flex-col items-center gap-1 opacity-80">
              {isEquivalenceComplete && (
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1">
                  Aprobada
                </span>
              )}
              {isPartial && (
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 mt-1">
                  En Curso
                </span>
              )}
              {!isEquivalenceComplete && !isPartial && (
                <ArrowRight
                  size={16}
                  className="text-gray-300 dark:text-gray-600 mt-1"
                />
              )}
            </div>
          </div>
        </td>

        <td className="px-6 py-4 align-top break-words">
          <div
            className={`p-3 rounded-lg border flex flex-col gap-1 transition-all duration-300 relative group/target
                                    ${
                                      isEquivalenceComplete
                                        ? "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-900/50 shadow-sm"
                                        : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700/50 text-gray-500"
                                    }
                                `}
          >
            <div className="flex flex-col gap-1 items-start">
              <span
                className={`font-bold text-sm ${
                  isEquivalenceComplete
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {eq.targetName}
              </span>
              <div className="flex items-center flex-wrap gap-2 text-xs">
                <span className="font-mono text-gray-500 font-medium bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-100 dark:border-gray-600">
                  {eq.targetId}
                </span>
                {eq.targetRegimen && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-500 uppercase tracking-wide border border-gray-100 dark:border-gray-600">
                    {eq.targetRegimen}
                  </span>
                )}
              </div>
            </div>

            {eq.note && (
              <div className="text-xs text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 p-2 rounded mt-2 flex items-start gap-1.5 border border-orange-100 dark:border-orange-900/20">
                <span className="text-orange-500 text-lg leading-none">!</span>
                <span className="leading-tight">{eq.note}</span>
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  }
);
