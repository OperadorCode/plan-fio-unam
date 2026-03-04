import React from "react";
import { CheckCircle, BookOpen, ArrowRight, Clock } from "lucide-react";
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
  regularCourses: string[];
}

type SourceStatus = "approved" | "regular" | "pending";

export const EquivalenceRow: React.FC<EquivalenceRowProps> = React.memo(
  ({ eq, courseMeta2013, approvedCourses, regularCourses }) => {
    const sourceItems = eq.sourceIds.map((id: string) => {
      const meta = courseMeta2013[id];
      const isApproved = approvedCourses.includes(id);
      const isRegular = regularCourses.includes(id);
      const status: SourceStatus = isApproved
        ? "approved"
        : isRegular
          ? "regular"
          : "pending";
      return {
        id,
        name: meta?.name || id,
        status,
        regimen: meta?.regimen,
        hours: meta?.hours,
      };
    });

    const allApproved = sourceItems.every((s) => s.status === "approved");
    const someApproved = sourceItems.some((s) => s.status === "approved");
    const someRegular = sourceItems.some((s) => s.status === "regular");
    const hasProgress = someApproved || someRegular;

    // Row-level status for styling
    const rowStatus: SourceStatus = allApproved
      ? "approved"
      : hasProgress
        ? "regular"
        : "pending";


    const statusIcon = (status: SourceStatus) => {
      switch (status) {
        case "approved":
          return <CheckCircle size={16} className="text-green-500 flex-shrink-0" />;
        case "regular":
          return <Clock size={16} className="text-blue-500 flex-shrink-0" />;
        default:
          return <BookOpen size={16} className="text-gray-300 dark:text-gray-600 flex-shrink-0" />;
      }
    };

    const statusBadge = (status: SourceStatus) => {
      if (status === "approved")
        return (
          <span className="text-[9px] font-bold uppercase tracking-wider text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded-full">
            Aprobada
          </span>
        );
      if (status === "regular")
        return (
          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 rounded-full">
            Regular
          </span>
        );
      return null;
    };

    const equivalenceBadge = (type: string, size: "sm" | "md" = "md") => {
      const isDirect = type === "DIRECTA";
      const baseClasses = "font-extrabold uppercase border shadow-sm cursor-help transition-transform hover:scale-105 whitespace-nowrap text-center";
      const sizeClasses = size === "md" ? "px-4 py-1.5 rounded-xl text-[10px] tracking-widest" : "px-3 py-1 rounded-lg text-[9px] tracking-wider";
      const colorClasses = isDirect
        ? "bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-800 border-emerald-200 dark:from-emerald-900/40 dark:to-green-900/40 dark:text-emerald-300 dark:border-emerald-800/50"
        : "bg-gradient-to-r from-amber-50 to-orange-100 text-amber-900 border-amber-300 dark:from-amber-900/40 dark:to-orange-900/40 dark:text-amber-300 dark:border-amber-800/50";

      return (
        <Tooltip
          content={
            isDirect
              ? "Equivalencia total: Se te dará por aprobada automáticamente."
              : type === "PARCIAL"
                ? "Equivalencia parcial: Podés necesitar rendir un complemento."
                : "Tipo de equivalencia especial."
          }
        >
          <div className={`${baseClasses} ${sizeClasses} ${colorClasses}`}>
            {type}
          </div>
        </Tooltip>
      );
    };


    const rowBgClasses = {
      approved:
        "bg-green-50/60 dark:bg-green-900/20 border-l-4 border-l-green-500",
      regular:
        "bg-blue-50/40 dark:bg-blue-900/15 border-l-4 border-l-blue-400",
      pending: "",
    };

    const rowHoverClasses = {
      approved: "hover:bg-green-50/80 dark:hover:bg-green-900/30",
      regular: "hover:bg-blue-50/60 dark:hover:bg-blue-900/25",
      pending: "hover:bg-gray-50 dark:hover:bg-gray-700/20",
    };


    const centerStatusLabel = allApproved ? (
      <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full mt-1">
        ✓ Aprobada
      </span>
    ) : hasProgress ? (
      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full mt-1">
        Regular
      </span>
    ) : (
      <ArrowRight
        size={16}
        className="text-gray-300 dark:text-gray-600 mt-1"
      />
    );

    const cardClasses = allApproved
      ? "bg-green-50/50 dark:bg-green-900/20 border-green-300 dark:border-green-800 shadow-sm shadow-green-100/50 dark:shadow-none"
      : hasProgress
        ? "bg-blue-50/40 dark:bg-blue-900/15 border-blue-200 dark:border-blue-800/50"
        : "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700/50 text-gray-500";

    const mobileCard = (
      <div
        className={`md:hidden p-4 rounded-xl border mb-3 transition-colors select-none
          ${rowBgClasses[rowStatus]}
          ${allApproved
            ? "border-green-200 dark:border-green-800"
            : hasProgress
              ? "border-blue-200 dark:border-blue-800"
              : "border-gray-200 dark:border-gray-700"
          }`}
      >
        {/* Source courses */}
        <div className="mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            Plan 2013
          </span>
          <div className="flex flex-col gap-2">
            {sourceItems.map((src) => (
              <div
                key={src.id}
                className={`flex items-center gap-2 ${src.status !== "pending" ? "opacity-100" : "opacity-60"}`}
              >
                {statusIcon(src.status)}
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium block truncate ${src.status !== "pending" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                    {src.name}
                  </span>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-mono text-gray-400">{src.id}</span>
                    {src.regimen && (
                      <span className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 uppercase">
                        {src.regimen}
                      </span>
                    )}
                    {statusBadge(src.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 my-3">
          {equivalenceBadge(eq.type, "sm")}
          <ArrowRight size={16} className="text-gray-300" />
          {centerStatusLabel}
        </div>
        <div
          className={`p-3 rounded-lg border ${cardClasses}`}
        >
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
            Plan 2025
          </span>
          <span
            className={`font-bold text-sm block ${allApproved || hasProgress
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
          ${rowBgClasses[rowStatus]} ${rowHoverClasses[rowStatus]}`}
      >
        <td className="px-3 sm:px-6 py-4 align-top break-words">
          <div className={`p-3 rounded-lg border flex flex-col gap-3 transition-all duration-300 ${cardClasses}`}>
            {sourceItems.map((src) => (
              <div
                key={src.id}
                className={`flex items-start gap-3 ${src.status !== "pending"
                  ? "opacity-100"
                  : "opacity-70 group-hover:opacity-100 transition-opacity"
                  }`}
              >
                <span className="mt-0.5">
                  {statusIcon(src.status)}
                </span>
                <div className="leading-tight flex flex-col items-start gap-1">
                  <span
                    className={`font-semibold text-sm ${src.status !== "pending"
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
                      <span className="px-1.5 py-0.5 rounded-lg text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 uppercase tracking-wide border border-gray-200 dark:border-gray-600">
                        {src.regimen}
                      </span>
                    )}
                    {statusBadge(src.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </td>

        <td className="px-2 py-4 align-top text-center w-32 border-x border-gray-100 dark:border-gray-800/50">
          <div className="flex flex-col items-center justify-start mt-2 space-y-3">
            {equivalenceBadge(eq.type, "md")}

            <div className="flex flex-col items-center gap-1 opacity-80">
              {centerStatusLabel}
            </div>
          </div>
        </td>

        <td className="px-6 py-4 align-top break-words">
          <div
            className={`p-3 rounded-lg border flex flex-col gap-1 transition-all duration-300 relative ${cardClasses}`}
          >
            <div className="flex flex-col gap-1 items-start">
              <span
                className={`font-bold text-sm ${allApproved || hasProgress
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
