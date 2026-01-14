/**
 * Componente de visualización de métricas académicas.
 *
 * Este componente calcula y muestra la distribución de estados de los cursos
 * (aprobados, regulares y pendientes) utilizando un gráfico circular SVG
 * y contadores detallados. Utiliza el estado global para sincronizar el progreso.
 */

import React, { useMemo } from "react";
import { useAppStore } from "../../../store/useAppStore";
import {
  PieChart,
  CheckCircle2,
  Clock,
  Circle,
  AlertCircle,
} from "lucide-react";
import type { Course } from "../../../types";

interface StatsProps {
  allCourses: Course[];
  className?: string;
  variant?: "card" | "transparent" | "dashboard";
}

const Stats: React.FC<StatsProps> = ({
  allCourses,
  className = "",
  variant = "card",
}) => {
  const courseStatus = useAppStore((state) => state.courseStatus);

  const stats = useMemo(() => {
    const total = allCourses.length;
    if (total === 0) return { approved: 0, regular: 0, total: 0, pending: 0 };

    let approved = 0;
    let regular = 0;
    allCourses.forEach((course) => {
      const status = courseStatus[course.id];
      if (status === "approved") approved++;
      else if (status === "regular") regular++;
    });

    return {
      total,
      approved,
      regular,
      pending: total - approved - regular,
    };
  }, [allCourses, courseStatus]);

  if (stats.total === 0) return null;

  const approvedPct = (stats.approved / stats.total) * 100;
  const regularPct = (stats.regular / stats.total) * 100;

  const circumference = 100;
  const approvedDash = `${approvedPct} ${circumference - approvedPct}`;
  const regularDash = `${regularPct} ${circumference - regularPct}`;
  const regularOffset = 25 - approvedPct;


  if (variant === "dashboard") {
    return (
      <div
        className={`w-full grid grid-cols-1 lg:grid-cols-4 gap-6 items-center ${className}`}
      >
        <div className="flex items-center gap-6 lg:col-span-1">
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg
              viewBox="0 0 36 36"
              className="w-full h-full transform -rotate-90"
            >
              <path
                className="text-gray-100 dark:text-gray-700"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-yellow-400"
                strokeDasharray={`${regularPct} 100`}
                strokeDashoffset={-approvedPct}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-green-500"
                strokeDasharray={`${approvedPct} 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap={approvedPct > 0 ? "round" : "butt"}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(approvedPct)}%
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Progreso
            </h2>
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                Aprobadas
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>{" "}
                Regulares
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
              Aprobadas
            </span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.approved}
              </span>
              <span className="text-xs text-green-700 font-medium mb-1">
                Materias
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
              Regulares
            </span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.regular}
              </span>
              <span className="text-xs text-yellow-700 font-medium mb-1">
                Materias
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
              Pendientes
            </span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.pending}
              </span>
              <span className="text-xs text-gray-600 font-medium mb-1">
                Materias
              </span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 flex flex-col justify-center">
            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              Total
            </span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {stats.total}
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-400/80 font-medium mb-1">
                Materias
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const containerStyles =
    variant === "card"
      ? "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      : "p-2";

  return (
    <div
      className={`${containerStyles} flex flex-col md:flex-row items-center justify-around gap-8 animate-fade-in ${className}`}
    >
      <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
        <svg
          viewBox="0 0 36 36"
          className="w-full h-full transform transition-transform duration-500 hover:scale-105"
          role="img"
          aria-labelledby="stats-title"
        >
          <title id="stats-title">
            Gráfico de Progreso: {Math.round(approvedPct)}% Aprobado
          </title>

          <path
            className="text-gray-100 dark:text-gray-700 transition-colors"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="text-yellow-400 drop-shadow-sm transition-all duration-1000 ease-out"
            strokeDasharray={regularDash}
            strokeDashoffset={regularOffset}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            className="text-green-500 drop-shadow-sm transition-all duration-1000 ease-out"
            strokeDasharray={approvedDash}
            strokeDashoffset="25"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-gray-800 dark:text-white transition-colors">
            {Math.round(approvedPct)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
            Completado
          </span>
        </div>
      </div>

      <div className="flex-1 w-full md:w-auto min-w-[200px]">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2 flex items-center gap-2">
          <PieChart size={20} className="text-blue-500" />
          Progreso de Carrera
        </h2>
        <div className="space-y-4">
          <StatRow
            icon={
              <CheckCircle2
                size={18}
                className="text-green-600 dark:text-green-400"
              />
            }
            bg="bg-green-100 dark:bg-green-900/30"
            label="Materias Aprobadas"
            value={stats.approved}
          />

          <StatRow
            icon={
              <Clock
                size={18}
                className="text-yellow-600 dark:text-yellow-400"
              />
            }
            bg="bg-yellow-100 dark:bg-yellow-900/30"
            label="Regularizadas"
            value={stats.regular}
          />

          <StatRow
            icon={<Circle size={18} className="text-gray-400" />}
            bg="bg-gray-100 dark:bg-gray-700/50"
            label="Pendientes"
            value={stats.pending}
          />

          <div className="pt-3 mt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              <AlertCircle size={12} />
              Total Materias
            </span>
            <span className="text-gray-800 dark:text-white font-bold text-lg">
              {stats.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatRow = ({
  icon,
  bg,
  label,
  value,
}: {
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: number;
}) => (
  <div className="flex items-center justify-between group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-default">
    <div className="flex items-center gap-3">
      <div
        className={`p-1.5 rounded-md ${bg} transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>
      <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
        {label}
      </span>
    </div>
    <span className="text-gray-900 dark:text-white font-bold text-lg">
      {value}
    </span>
  </div>
);

export default Stats;
