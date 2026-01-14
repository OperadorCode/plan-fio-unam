/**
 * Componente que agrupa y visualiza las materias correspondientes a un año académico
 * o categoría específica. Gestiona el cálculo de métricas de progreso (aprobadas/regulares)
 * y renderiza la lista de materias u optativas asociadas.
 *
 * Funcionalidades principales:
 * - Cálculo reactivo de estadísticas de progreso mediante `useMemo`.
 * - Formateo dinámico del encabezado según el identificador del año.
 * - Integración con el estado global para reflejar cambios en tiempo real.
 */

import React, { useMemo } from "react";
import { useAppStore } from "../../../store/useAppStore";
import CourseRow from "./CourseRow";
import { ElectiveSlotRow } from "./ElectiveSlotRow";
import type { Course } from "../../../types";

interface YearTableProps {
  year: string;
  courses: Course[];
}

const YearTable: React.FC<YearTableProps> = React.memo(({ year, courses }) => {
  const courseStatus = useAppStore((state) => state.courseStatus);

  const stats = useMemo(() => {
    let approved = 0;
    let regular = 0;

    courses.forEach((c) => {
      if (courseStatus[c.id] === "approved") approved++;
      else if (courseStatus[c.id] === "regular") regular++;
    });

    return { approved, regular, total: courses.length };
  }, [courses, courseStatus]);

  const progressPercentage =
    Math.round((stats.approved / stats.total) * 100) || 0;

  const formatYear = (y: string) => {
    if (y === "0") return "Materias Extracurriculares";
    if (!isNaN(Number(y))) return `${y}º Año`;
    return y;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden animate-fade-in mb-6">
      {/* --- HEADER DEL BLOQUE (AÑO Y PROGRESO) --- */}
      <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`
                w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm
                ${
                  progressPercentage === 100
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                }
            `}
          >
            {year}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white text-lg leading-none">
              {formatYear(year)}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {stats.approved} de {stats.total} aprobadas
            </p>
          </div>
        </div>

        {/* --- BARRA DE PROGRESO VISUAL --- */}
        <div className="w-full sm:w-1/3 flex flex-col gap-1">
          <div className="flex justify-between text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <span>Progreso</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            {stats.regular > 0 && progressPercentage < 100 && (
              <div
                className="h-full bg-blue-300/50 -mt-2 transition-all duration-500"
                style={{
                  width: `${(stats.regular / stats.total) * 100}%`,
                  marginLeft: `${progressPercentage}%`,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {courses.map((course) =>
          course.isElectiveSlot ? (
            <ElectiveSlotRow key={course.id} slot={course} />
          ) : (
            <CourseRow key={course.id} course={course} />
          )
        )}
      </div>
    </div>
  );
});

export default YearTable;
