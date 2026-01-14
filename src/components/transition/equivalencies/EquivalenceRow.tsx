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

    const mobileCard = (
      <div
        className={`md:hidden p-4 rounded-xl border mb-3 transition-colors select-none
          ${isEquivalenceComplete
            ? "bg-green-50/30 dark:bg-green-900/10 border-green-200 dark:border-green-800"
            : isPartial
              ? "bg-orange-50/30 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800"
              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }`}
      >
        {/* Source courses */}
        <div className="mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            Plan 2013
          </span>
          <div className="flex flex-col gap-2">
            {sourceItems.map((src: any) => (
              <div
                key={src.id}
                className={`flex items-center gap-2 ${src.isDone ? "opacity-100" : "opacity-60"}`}
              >
                {src.isDone ? (
                  <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                ) : (
                  <BookOpen size={14} className="text-gray-300 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium block truncate ${src.isDone ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                    {src.name}
                  </span>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-mono text-gray-400">{src.id}</span>
                    {src.regimen && (
                      <span className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 uppercase">
                        {src.regimen}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 my-3">
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
              className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wide border
                ${eq.type === "DIRECTA"
                  ? "bg-green-50 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                  : "bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700"
                }`}
            >
              {eq.type}
            </div>
          </Tooltip>
          <ArrowRight size={16} className="text-gray-300" />
          {isEquivalenceComplete && (
            <span className="text-[10px] font-bold text-green-600 dark:text-green-400">
              ✓ Aprobada
            </span>
          )}
          {isPartial && (
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">
              En Curso
            </span>
          )}
        </div>
        <div
          className={`p-3 rounded-lg border ${isEquivalenceComplete
            ? "bg-white dark:bg-gray-800 border-green-200 dark:border-green-800"
            : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
            }`}
        >
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
            Plan 2025
          </span>
          <span
            className={`font-bold text-sm block ${isEquivalenceComplete
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
              }`}
          >
            {eq.targetName}
          </span>
          <div className="flex items-center gap-2 mt-1 text-[10px]">
            <span className="font-mono text-gray-400 bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-100 dark:border-gray-600">
              {eq.targetId}
            </span>
            {eq.targetRegimen && (
              <span className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-400 uppercase">
                {eq.targetRegimen}
              </span>
            )}
          </div>
          {eq.note && (
            <div className="text-[10px] text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 p-2 rounded mt-2 border border-orange-100 dark:border-orange-900/20">
              <span className="font-bold">!</span> {eq.note}
            </div>
          )}
        </div>
      </div>
    );

    const desktopRow = (
      <tr
        className={`hidden md:table-row group transition-colors border-b last:border-0 border-gray-50 dark:border-gray-800 select-none
          ${isEquivalenceComplete
            ? "bg-green-50/20 dark:bg-green-900/10 hover:bg-green-50/40"
            : isPartial
              ? "bg-orange-50/20 dark:bg-orange-900/10 hover:bg-orange-50/40"
              : "hover:bg-gray-50 dark:hover:bg-gray-700/20"
          }`}
      >
        <td className="px-3 sm:px-6 py-4 align-top break-words">
          <div className="flex flex-col gap-3">
            {sourceItems.map((src: any) => (
              <div
                key={src.id}
                className={`flex items-start gap-3 ${src.isDone
                  ? "opacity-100"
                  : "opacity-70 group-hover:opacity-100 transition-opacity"
                  }`}
              >
                {src.isDone ? (
                  <CheckCircle
                    size={16}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                ) : (
                  <BookOpen
                    size={16}
                    className="text-gray-300 mt-0.5 flex-shrink-0"
                  />
                )}
                <div className="leading-tight flex flex-col items-start gap-1">
                  <span
                    className={`font-semibold text-sm ${src.isDone
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
                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-sm cursor-help transition-transform hover:scale-105
                  ${eq.type === "DIRECTA"
                    ? "bg-green-50 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                    : "bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700"
                  }`}
              >
                {eq.type}
              </div>
            </Tooltip>

            <div className="flex flex-col items-center gap-1 opacity-80">
              {isEquivalenceComplete && (
                <span className="text-[10px] font-bold text-green-600 dark:text-green-400 mt-1">
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
            className={`p-3 rounded-lg border flex flex-col gap-1 transition-all duration-300 relative
              ${isEquivalenceComplete
                ? "bg-white dark:bg-gray-800 border-green-200 dark:border-green-900/50 shadow-sm"
                : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700/50 text-gray-500"
              }`}
          >
            <div className="flex flex-col gap-1 items-start">
              <span
                className={`font-bold text-sm ${isEquivalenceComplete
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

    return (
      <>
        {mobileCard}
        {desktopRow}
      </>
    );
  }
);
