
/**
 * Componente que representa una fila de una materia en el plan de estudios.
 * Muestra información sobre la materia, su estado, correlativas y desbloqueos.
 */

import React, { useMemo, useCallback, useState } from 'react';
import { Check, Lock, Unlock, BookOpen, GraduationCap, Flame, ArrowUpRight, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { careerPlans } from '../data/careers';
import { getMissingPrerequisites, buildUnlocksMap, getAllPrerequisites, calculateCriticality } from '../utils/logic';
import type { Course, StudyPlan } from '../types';
import Tooltip from './common/Tooltip';

interface CourseRowProps {
  course: Course;
}

const CourseRow: React.FC<CourseRowProps> = ({ course }) => {
  // --- SELECTORES ---
  const careerId = useAppStore(state => state.careerId);
  const status = useAppStore(state => state.courseStatus[course.id]);
  const updateStatus = useAppStore(state => state.updateStatus);
  const hoveredCourseId = useAppStore(state => state.hoveredCourseId);
  const setHoveredCourseId = useAppStore(state => state.setHoveredCourseId);

  const selectedElectives = useAppStore(state => state.selectedElectives);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // --- LÓGICA DE DATOS ---

  const { allCourses, allCoursesById } = useMemo(() => {
    const plan = careerPlans[careerId as keyof typeof careerPlans] as unknown as StudyPlan;

    if (!plan) return { allCourses: [], allCoursesById: {} };
    let rawCourses = Object.values(plan.coursesData).flat();

    const effectiveCourses = rawCourses.map(c => {
      if (c.isElectiveSlot && selectedElectives[c.id]) {
        const optionData = plan.electivesData?.[c.electiveGroup!]?.find(o => o.id === selectedElectives[c.id]);

        if (optionData) {
          return { ...optionData, id: c.id };
        }
      }
      return c;
    });

    const map = effectiveCourses.reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<string, Course>);

    return { allCourses: effectiveCourses, allCoursesById: map };
  }, [careerId, selectedElectives]);

  const courseStatusSnapshot = useAppStore(state => state.courseStatus);

  // --- CÁLCULOS DE CORRELATIVAS ---

  const missingForCursada = useMemo(() => {
    return getMissingPrerequisites(course, true, courseStatusSnapshot, allCoursesById);
  }, [course, courseStatusSnapshot, allCoursesById]);

  const missingForFinal = useMemo(() => {
    return getMissingPrerequisites(course, false, courseStatusSnapshot, allCoursesById);
  }, [course, courseStatusSnapshot, allCoursesById]);

  const unlocks = useMemo(() => {
    const map = buildUnlocksMap(allCourses);
    const unlocksForCourse = map[course.id];
    if (!unlocksForCourse) return [];

    return Object.entries(unlocksForCourse).map(([name, typesSet]) => ({
      name,
      types: Array.from(typesSet)
    }));
  }, [course.id, allCourses]);

  // --- INTERACCIÓN ---
  const isPrerequisiteOfHovered = useMemo(() => {
    if (!hoveredCourseId || hoveredCourseId === course.id) return false;
    const prereqsOfHovered = getAllPrerequisites(hoveredCourseId, allCoursesById);
    return prereqsOfHovered.has(course.id);
  }, [hoveredCourseId, course.id, allCoursesById]);

  // --- CRITICIDAD ---
  const criticalityScore = useMemo(() => {
    return calculateCriticality(course.id, allCourses);
  }, [course.id, allCourses]);

  const isCritical = criticalityScore >= 3;

  // --- ESTADOS HABILITADOS ---
  const canRegularize = missingForCursada.regular.length === 0 && missingForCursada.approved.length === 0;
  const canApprove = canRegularize && missingForFinal.approved.length === 0;

  // --- HANDLERS ---
  const handleRegularChange = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'regular' || status === 'approved') {
      updateStatus(course.id, 'pending');
    } else {
      if (canRegularize) updateStatus(course.id, 'regular');
    }
  }, [status, course.id, canRegularize, updateStatus]);

  const handleApprovedChange = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'approved') {
      updateStatus(course.id, 'regular');
    } else {
      if (canApprove) updateStatus(course.id, 'approved');
    }
  }, [status, course.id, canApprove, updateStatus]);

  // --- TOOLTIP CONTENT ---
  const tooltipContent = useMemo(() => {
    if (status === 'approved') {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-400 font-bold border-b border-gray-700 pb-1 mb-1">
            <Check size={14} /> <span>Materia Aprobada</span>
          </div>
          {unlocks.length > 0 ? (
            <div>
              <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Habilita:</p>
              <ul className="list-disc pl-3 space-y-0.5 text-gray-300">
                {unlocks.map((u, i) => (
                  <li key={i}>
                    <span className="font-medium text-white">{u.name}</span> <span className="text-[10px] opacity-70">({u.types.join(', ')})</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span className="text-gray-400 text-xs italic">No desbloquea materias correlativas directas.</span>
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

          {(missingForCursada.regular.length > 0 || missingForCursada.approved.length > 0) && (
            <div>
              <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Correlativas Faltantes:</p>
              {missingForCursada.regular.length > 0 && (
                <div className="mb-2">
                  <span className="text-[10px] text-blue-300 block mb-0.5">Falta Regularizar:</span>
                  <ul className="list-disc pl-3 text-gray-300">
                    {missingForCursada.regular.map((n, i) => <li key={i}>{n}</li>)}
                  </ul>
                </div>
              )}
              {missingForCursada.approved.length > 0 && (
                <div>
                  <span className="text-[10px] text-green-300 block mb-0.5">Falta Aprobar (Final):</span>
                  <ul className="list-disc pl-3 text-gray-300">
                    {missingForCursada.approved.map((n, i) => <li key={i}>{n}</li>)}
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
            <span>{status === 'regular' ? 'Materia Regularizada' : 'Habilitada para Cursar'}</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-orange-400 font-bold mb-1">
              <AlertCircle size={12} /> <span>Falta para Rendir Final:</span>
            </div>
            <ul className="list-disc pl-3 text-gray-300">
              {missingForFinal.approved.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-gray-700 pb-1 mb-1">
          <Unlock size={14} /> <span>Totalmente Habilitada</span>
        </div>
        <p className="text-gray-300">Podés cursar y rendir el final de esta materia.</p>
        {isCritical && (
          <div className="mt-2 bg-orange-900/30 p-2 rounded border border-orange-700/50">
            <p className="text-orange-400 text-xs font-bold flex items-center gap-1 mb-1">
              <Flame size={12} /> Materia Crítica
            </p>
            <p className="text-[10px] text-gray-300">
              Desbloquea directamente <span className="text-white font-bold">{criticalityScore}</span> materias.
            </p>
          </div>
        )}
        {unlocks.length > 0 && !isCritical && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Futuros Desbloqueos:</p>
            <p className="text-xs text-gray-400">Esta materia es clave para {unlocks.length} futuras materias.</p>
          </div>
        )}
      </div>
    );
  }, [status, unlocks, isCritical, criticalityScore, canRegularize, canApprove, missingForCursada, missingForFinal]);

  // --- CLASES DINÁMICAS ---
  const getContainerClasses = () => {
    let classes = "group transition-all duration-300 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 relative overflow-hidden border-l-4";

    if (isPrerequisiteOfHovered) {
      classes += " bg-yellow-50 dark:bg-yellow-900/20 border-l-yellow-400";
    } else {
      classes += " border-l-transparent";
    }

    if (status === 'approved') {
      classes += " bg-green-50/40 dark:bg-green-900/10";
    } else if (!canRegularize) {
      classes += " opacity-60 bg-gray-50/50 dark:bg-gray-900/50 grayscale-[0.5]";
    }
    return classes;
  };

  return (
    <div
      className={getContainerClasses()}
      onMouseEnter={() => setHoveredCourseId(course.id)}
      onMouseLeave={() => {
        setHoveredCourseId(null);
        setIsTooltipOpen(false);
      }}
      onClick={() => setIsTooltipOpen(!isTooltipOpen)}
    >
      <div className="flex items-center p-3 gap-3">

        <div className="flex-grow min-w-0">
          <Tooltip content={tooltipContent} forceVisible={isTooltipOpen}>
            <div className="flex items-center gap-2 cursor-pointer">

              {/* ICON CONTAINER */}
              <div className={`
                    w-9 h-9 flex items-center justify-center
                    rounded-lg flex-shrink-0 transition-all duration-500 relative
                    ${status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 scale-105' :
                  status === 'regular' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    !canRegularize ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500' :
                      'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-700 shadow-sm'}
                    ${isPrerequisiteOfHovered ? 'ring-2 ring-yellow-400 ring-offset-1 dark:ring-offset-gray-900 animate-pulse' : ''}
                `}>
                {status === 'approved' ? <GraduationCap size={18} /> :
                  !canRegularize ? <Lock size={18} /> : <BookOpen size={18} />}

                {canRegularize && !canApprove && status !== 'approved' && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white dark:border-gray-800 z-10" />
                )}
              </div>

              {/* TEXT CONTAINER */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-semibold text-sm leading-tight transition-colors duration-300 ${isPrerequisiteOfHovered ? 'text-yellow-700 dark:text-yellow-400' :
                    status === 'approved' ? 'text-green-800 dark:text-green-300' :
                      'text-gray-700 dark:text-gray-200'
                    }`}>
                    {course.name}
                  </span>

                  {isCritical && status !== 'approved' && (
                    <span title={`Materia Crítica: Desbloquea ${criticalityScore} materias directas`} className="text-orange-500 animate-bounce-slow cursor-help flex-shrink-0">
                      <Flame size={14} fill="currentColor" />
                    </span>
                  )}

                  {isPrerequisiteOfHovered && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 animate-fade-in flex-shrink-0">
                      <ArrowUpRight size={10} /> Requisito
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-gray-400 font-mono flex gap-2">
                  <span>{course.id}</span>
                  <span>•</span>
                  <span>{course.hours ? `${course.hours}hs` : '-'}</span>
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
            title={status === 'regular' ? "Desmarcar Regularizada" : "Marcar como Regularizada"}
            className={`
                    flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                    ${(status === 'regular' || status === 'approved')
                ? 'bg-blue-500 border-blue-600 text-white shadow-md hover:bg-blue-600 active:scale-95'
                : canRegularize
                  ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-200 cursor-not-allowed'}
                `}
          >
            <span className="text-xs font-bold">R</span>
          </button>

          <button
            onClick={handleApprovedChange}
            disabled={!canApprove}
            aria-label={`Aprobar Final ${course.name}`}
            title={status === 'approved' ? "Desmarcar Aprobada" : "Marcar como Aprobada"}
            className={`
                    flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                    ${status === 'approved'
                ? 'bg-green-500 border-green-600 text-white shadow-md hover:bg-green-600 active:scale-95'
                : canApprove
                  ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-200 cursor-not-allowed opacity-50'}
                `}
          >
            {!canApprove && canRegularize ? <Lock size={14} className="text-gray-400" /> : <Check size={18} strokeWidth={3} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseRow);