
/**
 * Componente interactivo para la gestión y organización de mesas de examen final.
 * 
 * Este componente permite a los alumnos:
 * - Visualizar cronológicamente los turnos de examen (pasados, actuales y futuros).
 * - Realizar un seguimiento de los días restantes para cada turno mediante un countdown.
 * - Planificar inscripciones validando automáticamente requisitos académicos (correlativas y estado de cursada).
 * - Persistir la planificación en el estado global de la aplicación.
 * 
 * @requires useAppStore - Gestión de estado global de la carrera del usuario.
 * @requires examDates - Configuración de fechas y turnos del calendario académico.
 * @requires logic/getMissingPrerequisites - Utilidad para validación de dependencias entre materias.
 */



import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { examDates } from '../data/examDates';
import { careerPlans } from '../data/careers_legacy';
import { getMissingPrerequisites } from '../utils/logic';
import {
    CalendarCheck,
    GraduationCap,
    Clock,
    Plus,
    X,
    ChevronUp,
} from 'lucide-react';
import type { Course } from '../types';


const getDaysDiff = (targetDateStr: string) => {
    const target = new Date(targetDateStr + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const ExamPlanner: React.FC = () => {
    const { careerId, courseStatus, examPlan, addExamToPlan, removeExamFromPlan } = useAppStore();
    const [openSelectorTurnId, setOpenSelectorTurnId] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // --- DATOS ---
    const allCoursesById = useMemo(() => {
        const plan = careerPlans[careerId];
        if (!plan) return {};
        return Object.values(plan.coursesData)
            .flat()
            .reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<string, Course>);
    }, [careerId]);

    const availableSubjects = useMemo(() => {
        return Object.values(allCoursesById).filter((course) => {
            const status = courseStatus[course.id];
            if (status === 'approved') return false;

            const missing = getMissingPrerequisites(course, false, courseStatus, allCoursesById);
            if (missing.approved.length > 0) return false;

            return true;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [allCoursesById, courseStatus]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollContainerRef.current) {
                const firstFutureCard = scrollContainerRef.current.querySelector('[data-future="true"]');
                if (firstFutureCard) {
                    firstFutureCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                }
            }
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const toggleSelector = (turnId: string) => {
        setOpenSelectorTurnId(prev => prev === turnId ? null : turnId);
    };

    const handleToggleSubject = (turnId: string, courseId: string) => {
        const currentPlan = examPlan[turnId] || [];
        if (currentPlan.includes(courseId)) {
            removeExamFromPlan(turnId, courseId);
        } else {
            addExamToPlan(turnId, courseId);
        }
    };

    return (
        <div className="space-y-4 animate-fade-in w-full">

            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 dark:text-white leading-none">Mesas de Examen</h2>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">
                            {availableSubjects.length} materias habilitadas para rendir
                        </p>
                    </div>
                </div>
            </div>

            {/* --- CARRUSEL --- */}
            <div
                ref={scrollContainerRef}
                className="
            flex gap-4 overflow-x-auto pb-4 px-1 
            snap-x snap-mandatory scroll-pl-1
            custom-scrollbar scroll-smooth
        "
            >
                {examDates.map((turn) => {
                    const daysToStart = getDaysDiff(turn.start);
                    const daysToEnd = getDaysDiff(turn.end);

                    const isPast = daysToEnd < 0;
                    const isCurrent = daysToStart <= 0 && daysToEnd >= 0;
                    const isFuture = daysToStart > 0;

                    const selectedCourseIds = examPlan[turn.id] || [];
                    const isSelectorOpen = openSelectorTurnId === turn.id;

                    let borderClass = 'border-gray-200 dark:border-gray-700';
                    let bgHeader = 'bg-gray-50 dark:bg-gray-800';

                    if (isCurrent) {
                        borderClass = 'border-blue-400 ring-1 ring-blue-400 dark:border-blue-500';
                        bgHeader = 'bg-blue-50 dark:bg-blue-900/20';
                    } else if (isPast) {
                        bgHeader = 'bg-gray-100 dark:bg-gray-800 opacity-90';
                    }

                    return (
                        <div
                            key={turn.id}
                            data-future={!isPast}
                            className={`
                        /* RESPONSIVE WIDTHS: Ajustados para mostrar ~4 en desktop */
                        w-[85vw] sm:w-[320px] md:w-[280px] lg:w-[260px] 
                        flex-shrink-0 snap-start
                        bg-white dark:bg-gray-800 rounded-xl border shadow-sm transition-all duration-300
                        flex flex-col
                        ${borderClass} ${isPast ? 'opacity-60 grayscale-[0.8]' : ''}
                    `}
                        >
                            <div className={`p-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl ${bgHeader}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`
                                text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1
                                ${isFuture ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' : ''}
                                ${isCurrent ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 animate-pulse' : ''}
                                ${isPast ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : ''}
                            `}>
                                        {isFuture && <><Clock size={10} /> {daysToStart} días</>}
                                        {isCurrent && <><CalendarCheck size={10} /> En Curso</>}
                                        {isPast && <>Finalizado</>}
                                    </span>
                                </div>

                                <h3 className="font-bold text-gray-800 dark:text-white text-sm leading-tight mb-0.5 truncate" title={turn.name}>
                                    {turn.name}
                                </h3>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                                    {turn.displayDates}
                                </p>
                            </div>

                            <div className="p-3 flex-grow flex flex-col gap-2 min-h-[100px]">
                                {selectedCourseIds.length > 0 ? (
                                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-1">
                                        {selectedCourseIds.map(id => {
                                            const course = allCoursesById[id];
                                            if (!course) return null;
                                            const isRegular = courseStatus[id] === 'regular';
                                            return (
                                                <div key={id} className="group flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded border border-gray-100 dark:border-gray-700">
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        <div className={`w-1 h-6 rounded-full ${isRegular ? 'bg-blue-400' : 'bg-orange-400'} flex-shrink-0`}></div>
                                                        <div className="overflow-hidden">
                                                            <p className="font-medium text-xs text-gray-700 dark:text-gray-200 truncate" title={course.name}>
                                                                {course.name}
                                                            </p>
                                                            <p className="text-[9px] text-gray-400 leading-none">
                                                                {isRegular ? 'Regular' : 'Libre'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {!isPast && (
                                                        <button
                                                            onClick={() => removeExamFromPlan(turn.id, id)}
                                                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-300 dark:text-gray-600 border-2 border-dashed border-gray-100 dark:border-gray-700/50 rounded-lg p-2">
                                        <span className="text-[10px] text-center">Sin inscripciones</span>
                                    </div>
                                )}
                            </div>

                            {!isPast && (
                                <div className="p-2 border-t border-gray-100 dark:border-gray-700 relative">
                                    <button
                                        onClick={() => toggleSelector(turn.id)}
                                        className={`
                                    w-full py-1.5 px-3 text-[10px] font-bold uppercase tracking-wide rounded-lg flex items-center justify-center gap-2 transition-all
                                    ${isSelectorOpen
                                                ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'}
                                `}
                                    >
                                        {isSelectorOpen ? (
                                            <>Cerrar <ChevronUp size={12} /></>
                                        ) : (
                                            <>Gestionar <Plus size={12} /></>
                                        )}
                                    </button>

                                    {isSelectorOpen && (
                                        <div className="absolute bottom-full left-0 right-0 mb-2 mx-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 z-20 animate-fade-in flex flex-col max-h-[220px]">
                                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600 rounded-t-xl flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">Habilitadas</span>
                                                <button onClick={() => toggleSelector(turn.id)}><X size={14} className="text-gray-400" /></button>
                                            </div>
                                            <div className="overflow-y-auto p-1 custom-scrollbar">
                                                {availableSubjects.map(course => {
                                                    const isSelected = selectedCourseIds.includes(course.id);
                                                    const isRegular = courseStatus[course.id] === 'regular';
                                                    return (
                                                        <button
                                                            key={course.id}
                                                            onClick={() => handleToggleSubject(turn.id, course.id)}
                                                            className={`
                                                        w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors mb-1
                                                        ${isSelected
                                                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                                                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}
                                                    `}
                                                        >
                                                            <span className="truncate pr-2 w-3/4">{course.name}</span>
                                                            <span className={`flex-shrink-0 text-[9px] px-1 rounded border ${isRegular
                                                                    ? 'border-blue-200 text-blue-600 bg-blue-50'
                                                                    : 'border-orange-200 text-orange-600 bg-orange-50'
                                                                }`}>
                                                                {isRegular ? 'R' : 'L'}
                                                            </span>
                                                        </button>
                                                    )
                                                })}
                                                {availableSubjects.length === 0 && (
                                                    <p className="p-3 text-center text-xs text-gray-400">No hay materias habilitadas.</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className="w-1 flex-shrink-0"></div>
            </div>
        </div>
    );
};

export default ExamPlanner;