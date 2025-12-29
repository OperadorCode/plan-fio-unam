
/**
 * Componente de nodo personalizado de React Flow que representa una materia individual dentro del grafo del plan de estudios.
 * Gestiona los estados visuales según el estado de la materia (aprobada, regular, etc.), el resaltado y la atenuación
 * basados en el filtrado o la selección actual del grafo.
 */

import { memo, useMemo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { Check, BookOpen, MousePointerClick, Flame, ArrowRightCircle } from 'lucide-react';
import type { GraphCourse, CourseStatus } from '../../types';
import { getPeriodText } from '../../utils/courseUtils';

interface CourseNodeData {
    course: GraphCourse;
    status: CourseStatus;
    isDimmed: boolean;
    isHighlighted: boolean;
    isSelected: boolean;
    criticality: number;
}


export const CourseNode = memo(({ data }: NodeProps<CourseNodeData>) => {
    const { course, status, isDimmed, isHighlighted, isSelected, criticality } = data;

    const isElectiveSelection = course.isSelectedOption;
    const displayId = course.realId || course.id;
    const year = course.year;

    let borderColor = isElectiveSelection ? "border-indigo-300 dark:border-indigo-700" : "border-gray-400 dark:border-gray-500";
    let bgColor = "bg-white dark:bg-gray-800";
    let shadowClass = "shadow-md";
    let icon = null;
    let textColor = "text-gray-700 dark:text-gray-200";

    const opacityClass = isDimmed ? 'opacity-10 grayscale transition-all duration-300' : 'opacity-100 transition-all duration-300';

    if (status === 'approved') {
        borderColor = "border-green-500 ring-2 ring-green-100 dark:ring-green-900/30";
        bgColor = "bg-green-50 dark:bg-green-900/20";
        icon = <Check size={24} className="text-green-600 dark:text-green-400" strokeWidth={3} />;
        textColor = "text-green-900 dark:text-green-100";
    } else if (status === 'regular') {
        borderColor = "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/30";
        bgColor = "bg-blue-50 dark:bg-blue-900/20";
        icon = <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />;
        textColor = "text-blue-900 dark:text-blue-100";
    } else if (isElectiveSelection) {
        bgColor = "bg-indigo-50/50 dark:bg-indigo-900/10";
        icon = <ArrowRightCircle size={20} className="text-indigo-400" />;
    }

    if (isHighlighted || isSelected) {
        shadowClass = "shadow-2xl ring-4 ring-blue-400 ring-offset-4 dark:ring-offset-gray-900 scale-110 z-50";
        bgColor = "bg-white dark:bg-gray-700";
    }

    const isCritical = criticality >= 3 && status !== 'approved';
    const periodText = useMemo(() => getPeriodText(course.regimen), [course.regimen]);

    return (
        <div className={`relative group ${opacityClass}`}>
            <div className={`w-72 p-5 rounded-2xl border-2 ${borderColor} ${bgColor} ${shadowClass} transition-all cursor-pointer relative overflow-hidden`}>

                {isCritical && (
                    <div className="absolute top-0 right-0 p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-bl-xl border-l border-b border-orange-200 dark:border-orange-700/50" title="Materia Crítica">
                        <Flame size={16} className="text-orange-500 animate-pulse-slow" fill="currentColor" />
                    </div>
                )}

                {isElectiveSelection && !isCritical && (
                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 rounded-bl-lg text-[9px] font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider">
                        Optativa
                    </div>
                )}

                <Handle type="target" position={Position.Left} isConnectable={false} className="!bg-transparent !border-0 !w-full !h-full !top-0 !left-0 !rounded-none" />
                <Handle type="source" position={Position.Right} isConnectable={false} className="!bg-transparent !border-0 !w-full !h-full !top-0 !left-0 !rounded-none" />

                <div className="flex justify-between items-start mb-3 pr-6">
                    <span className={`text-xs font-mono font-bold tracking-widest px-2 py-1 rounded ${isElectiveSelection ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'bg-gray-200/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300'}`}>
                        {displayId}
                    </span>
                    {icon}
                </div>

                <h4 className={`text-lg font-extrabold leading-tight ${textColor}`}>
                    {course.name}
                </h4>

                <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-2">
                    <div className="flex justify-between items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                        <span className="flex-shrink-0">{year || '?'}º Año</span>
                        {periodText && (
                            <span className="text-right truncate ml-3 max-w-[60%]" title={periodText}>
                                {periodText}
                            </span>
                        )}
                    </div>

                    {isSelected && (
                        <div className="mt-1.5 flex items-center justify-end gap-1 text-blue-500 animate-pulse">
                            <MousePointerClick size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wide">Fijada</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
