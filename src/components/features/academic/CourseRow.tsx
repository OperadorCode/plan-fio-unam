import React, { useMemo, useCallback, useState } from "react";
import {
  Check,
  Lock,
  Unlock,
  BookOpen,
  GraduationCap,
  Flame,
  AlertCircle,
} from "lucide-react";
import { useAppStore } from "../../../store/useAppStore";
import { useHoverContext } from "../../../context/HoverContext";
import { usePlanCourses } from "../../../hooks/usePlanCourses";
import {
  getMissingPrerequisites,
  getAllPrerequisites,
} from "../../../utils/logic";
import type { Course } from "../../../types";
import Tooltip from "../../common/Tooltip";

interface CourseRowProps {
  course: Course;
}

const CourseRow: React.FC<CourseRowProps> = ({ course }) => {
  // --- SELECTORES ---
  const status = useAppStore((state) => state.courseStatus[course.id]);
  const updateStatus = useAppStore((state) => state.updateStatus);
  const { hoveredCourseId, setHoveredCourseId } = useHoverContext();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { allCoursesById, unlocksMap, criticalityMap } = usePlanCourses();
  const fullCourseStatus = useAppStore((state) => state.courseStatus);
  const courseStatusSnapshot = useMemo(() => {
    const hasAll =
      course.requiredRegularToCourse?.includes("ALL") ||
      course.requiredApprovedToCourse?.includes("ALL") ||
      course.requiredApprovedToFinal?.includes("ALL");

    if (hasAll) {
      return fullCourseStatus;
    }

    const relevantIds = new Set<string>([course.id]);
    course.requiredRegularToCourse?.forEach((id) => relevantIds.add(id));
    course.requiredApprovedToCourse?.forEach((id) => relevantIds.add(id));
    course.requiredApprovedToFinal?.forEach((id) => relevantIds.add(id));
    const filtered: Record<string, (typeof fullCourseStatus)[string]> = {};
    relevantIds.forEach((id) => {
      if (fullCourseStatus[id]) {
        filtered[id] = fullCourseStatus[id];
      }
    });

    return filtered;
  }, [course, fullCourseStatus]);

  // --- CÁLCULOS DE CORRELATIVAS ---

  const missingForCursada = useMemo(() => {
    return getMissingPrerequisites(
      course,
      true,
      courseStatusSnapshot,
      allCoursesById
    );
  }, [course, courseStatusSnapshot, allCoursesById]);

  const missingForFinal = useMemo(() => {
    return getMissingPrerequisites(
      course,
      false,
      courseStatusSnapshot,
      allCoursesById
    );
  }, [course, courseStatusSnapshot, allCoursesById]);

  const unlocks = useMemo(() => {
    const unlocksForCourse = unlocksMap[course.id];
    if (!unlocksForCourse) return [];

    return Object.entries(unlocksForCourse).map(([name, typesSet]) => ({
      name,
      types: Array.from(typesSet),
    }));
  }, [course.id, unlocksMap]);

  const isPrerequisiteOfHovered = useMemo(() => {
    if (!hoveredCourseId || hoveredCourseId === course.id) return false;
    const prereqsOfHovered = getAllPrerequisites(
      hoveredCourseId,
      allCoursesById
    );
    return prereqsOfHovered.has(course.id);
  }, [hoveredCourseId, course.id, allCoursesById]);

  const criticalityScore = criticalityMap[course.id] ?? 0;

  const isCritical = criticalityScore >= 3;

  // --- ESTADOS HABILITADOS ---
  const canRegularize =
    missingForCursada.regular.length === 0 &&
    missingForCursada.approved.length === 0;
  const canApprove = canRegularize && missingForFinal.approved.length === 0;

  // --- HANDLERS ---
  const handleRegularChange = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (status === "regular" || status === "approved") {
        updateStatus(course.id, "pending");
      } else {
        if (canRegularize) updateStatus(course.id, "regular");
      }
    },
    [status, course.id, canRegularize, updateStatus]
  );

  const handleApprovedChange = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (status === "approved") {
        updateStatus(course.id, "regular");
      } else {
        if (canApprove) updateStatus(course.id, "approved");
      }
    },
    [status, course.id, canApprove, updateStatus]
  );

  // --- TOOLTIP CONTENT ---
  const tooltipContent = useMemo(() => {
    if (status === "approved") {
      const unlocksForCursada = unlocks.filter((u) =>
        u.types.some((t) => t.includes("Cursar"))
      );
      const unlocksForFinal = unlocks.filter((u) =>
        u.types.some((t) => t.includes("Rendir"))
      );

      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-400 font-bold border-b border-gray-700 pb-1 mb-1">
            <Check size={14} /> <span>Materia Aprobada</span>
          </div>

          {unlocks.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-gray-500 font-bold">
                Habilita:
              </p>

              {unlocksForCursada.length > 0 && (
                <div>
                  <p className="text-[10px] text-blue-300 font-semibold mb-0.5">
                    Para Cursar:
                  </p>
                  <ul className="list-disc pl-3 space-y-0.5 text-gray-300 mb-1.5">
                    {unlocksForCursada.map((u, i) => (
                      <li key={`c-${i}`}>
                        <span className="font-medium text-white">{u.name}</span>
                        {u.types.some((t) => t.includes("Aprobada")) && (
                          <span className="text-[10px] text-green-400 ml-1">
                            (Pide Aprobada)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {unlocksForFinal.length > 0 && (
                <div>
                  <p className="text-[10px] text-green-300 font-semibold mb-0.5">
                    Para Rendir Final:
                  </p>
                  <ul className="list-disc pl-3 space-y-0.5 text-gray-300">
                    {unlocksForFinal.map((u, i) => (
                      <li key={`f-${i}`}>
                        <span className="font-medium text-white">{u.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-400 text-xs italic">
              No desbloquea materias correlativas directas.
            </span>
          )}
        </div>
      );
    }

    if (!canRegularize) {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-bold border-b border-gray-700 pb-1">
            <Lock size={14} /> <span>No se puede Cursar</span>
          </div>

          {(missingForCursada.regular.length > 0 ||
            missingForCursada.approved.length > 0) && (
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">
                  Correlativas Faltantes:
                </p>
                {missingForCursada.regular.length > 0 && (
                  <div className="mb-2">
                    <span className="text-[10px] text-blue-300 block mb-0.5">
                      Falta Regularizar:
                    </span>
                    <ul className="list-disc pl-3 text-gray-300">
                      {missingForCursada.regular.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {missingForCursada.approved.length > 0 && (
                  <div>
                    <span className="text-[10px] text-green-300 block mb-0.5">
                      Falta Aprobar (Final):
                    </span>
                    <ul className="list-disc pl-3 text-gray-300">
                      {missingForCursada.approved.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
        </div>
      );
    }

    if (!canApprove) {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-gray-700 pb-1">
            <BookOpen size={14} />
            <span>
              {status === "regular"
                ? "Materia Regularizada"
                : "Habilitada para Cursar"}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-orange-400 font-bold mb-1">
              <AlertCircle size={12} /> <span>Falta para Rendir Final:</span>
            </div>
            <ul className="list-disc pl-3 text-gray-300">
              {missingForFinal.approved.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-gray-700 pb-1 mb-1">
          <Unlock size={14} /> <span>Totalmente Habilitada</span>
        </div>
        <p className="text-gray-300 text-sm">
          Podés cursar y rendir el final de esta materia.
        </p>

        {isCritical && (
          <div className="mt-2 bg-orange-900/30 p-2 rounded border border-orange-700/50 space-y-2">
            <div className="flex justify-between items-start">
              <p className="text-orange-400 text-xs font-bold flex items-center gap-1">
                <Flame size={12} /> Materia Crítica
              </p>
              <span className="text-[9px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded">
                {criticalityScore} desbloqueos
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 uppercase font-bold">
                Desbloquea directamente:
              </p>
              <ul className="list-disc pl-3 text-gray-300 space-y-0.5">
                {unlocks.slice(0, 5).map((u, i) => (
                  <li key={i}>
                    <span className="font-medium text-white">{u.name}</span>
                  </li>
                ))}
              </ul>
              {unlocks.length > 5 && (
                <p className="text-[10px] text-orange-400/80 italic pl-1">
                  + {unlocks.length - 5} más...
                </p>
              )}
            </div>
          </div>
        )}

        {unlocks.length > 0 && !isCritical && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
              Futuros Desbloqueos:
            </p>
            <div className="space-y-1">
              {unlocks.slice(0, 3).map((u, i) => (
                <div
                  key={i}
                  className="text-xs text-gray-400 flex items-start gap-1"
                >
                  <span className="text-gray-500">•</span>
                  <span>
                    Al aprobar habilita{" "}
                    <span className="text-gray-300 font-medium">{u.name}</span>
                  </span>
                </div>
              ))}
              {unlocks.length > 3 && (
                <p className="text-[10px] text-gray-500 italic pl-2">
                  + {unlocks.length - 3} más...
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }, [
    status,
    unlocks,
    isCritical,
    criticalityScore,
    canRegularize,
    canApprove,
    missingForCursada,
    missingForFinal,
  ]);

  const containerClasses = useMemo(() => {
    let classes =
      "group transition-colors duration-300 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 relative overflow-hidden border-l-4";

    if (isPrerequisiteOfHovered) {
      classes += " bg-yellow-50 dark:bg-yellow-900/20 border-l-yellow-400";
    } else {
      classes += " border-l-transparent";
    }

    if (status === "approved") {
      classes += " bg-green-50/40 dark:bg-green-900/10";
    } else if (!canRegularize) {
      classes += " opacity-90 bg-gray-50/50 dark:bg-gray-900/30";
    }
    return classes;
  }, [isPrerequisiteOfHovered, status, canRegularize]);

  const handleMouseEnter = useCallback(() => {
    setHoveredCourseId(course.id);
  }, [course.id, setHoveredCourseId]);

  const handleMouseLeave = useCallback(() => {
    setHoveredCourseId(null);
    setIsTooltipOpen(false);
  }, [setHoveredCourseId]);

  const handleClick = useCallback(() => {
    setIsTooltipOpen((prev) => !prev);
  }, []);

  return (
    <div
      id={`course-${course.id}`}
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="flex items-center p-3 gap-3">
        <div className="flex-grow min-w-0">
          <Tooltip content={tooltipContent} forceVisible={isTooltipOpen}>
            <div className="flex items-center gap-2 cursor-pointer">
              {/* ICON CONTAINER */}
              <div
                className={`
                    w-9 h-9 flex items-center justify-center
                    rounded-lg flex-shrink-0 transition-all duration-500 relative
                    ${status === "approved"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 scale-105"
                    : status === "regular"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : !canRegularize
                        ? "bg-red-50 text-red-300 dark:bg-red-900/10 dark:text-red-400/60"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-700 shadow-sm"
                  }
                    ${isPrerequisiteOfHovered
                    ? "ring-2 ring-yellow-400 ring-offset-1 dark:ring-offset-gray-900 animate-pulse"
                    : ""
                  }
                `}
              >
                {status === "approved" ? (
                  <GraduationCap size={18} />
                ) : !canRegularize ? (
                  <Lock size={18} />
                ) : (
                  <BookOpen size={18} />
                )}

                {canRegularize && !canApprove && status !== "approved" && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white dark:border-gray-800 z-10" />
                )}
              </div>

              {/* TEXT CONTAINER */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span
                    className={`font-semibold text-sm leading-tight transition-colors duration-300 ${isPrerequisiteOfHovered
                        ? "text-yellow-700 dark:text-yellow-400"
                        : status === "approved"
                          ? "text-green-800 dark:text-green-300"
                          : !canRegularize
                            ? "text-gray-600 dark:text-gray-300"
                            : "text-gray-700 dark:text-gray-200"
                      }`}
                  >
                    {course.name}
                  </span>

                  {isCritical && status !== "approved" && (
                    <span
                      title={`Materia Crítica: Desbloquea ${criticalityScore} materias directas`}
                      className="text-orange-500 animate-bounce-slow cursor-help flex-shrink-0"
                    >
                      <Flame size={14} fill="currentColor" />
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-gray-400 font-mono flex gap-2 items-center">
                  <span>{course.id}</span>

                  {course.regimen && (
                    <>
                      <span className="opacity-50">•</span>
                      <span className="uppercase text-[9px] tracking-wide bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-1 rounded">
                        {course.regimen.replace(/\.$/, "")}
                      </span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </Tooltip>
        </div>

        {/* BOTONES */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={handleRegularChange}
            disabled={!canRegularize}
            aria-label={`Regularizar ${course.name}`}
            title={
              status === "regular"
                ? "Desmarcar Regularizada"
                : "Marcar como Regularizada"
            }
            className={`
                    flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                    ${status === "regular" || status === "approved"
                ? "bg-blue-500 border-blue-600 text-white shadow-md hover:bg-blue-600 active:scale-95"
                : canRegularize
                  ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-200 cursor-not-allowed"
              }
                `}
          >
            <span className="text-xs font-bold">R</span>
          </button>

          <button
            onClick={handleApprovedChange}
            disabled={!canApprove}
            aria-label={`Aprobar Final ${course.name}`}
            title={
              status === "approved"
                ? "Desmarcar Aprobada"
                : "Marcar como Aprobada"
            }
            className={`
                    flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                    ${status === "approved"
                ? "bg-green-500 border-green-600 text-white shadow-md hover:bg-green-600 active:scale-95"
                : canApprove
                  ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400"
                  : "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-200 cursor-not-allowed opacity-50"
              }
                `}
          >
            {!canApprove && canRegularize ? (
              <Lock size={14} className="text-gray-400" />
            ) : (
              <Check size={18} strokeWidth={3} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseRow);
