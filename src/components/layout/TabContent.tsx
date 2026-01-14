import React, { Suspense, lazy } from "react";
import YearTable from "../features/academic/YearTable";
import { LoadingScreen } from "../common/LoadingScreen";
import TransitionErrorBoundary from "../common/TransitionErrorBoundary";
import ExamPlannerErrorBoundary from "../common/ExamPlannerErrorBoundary";
import MapErrorBoundary from "../common/MapErrorBoundary";
import type { StudyPlan } from "../../types";

const CareerMap = lazy(() => import("../features/academic/CareerMap"));
const TransitionDashboard = lazy(
  () => import("../transition/TransitionDashboard")
);
const Calendar = lazy(() => import("../features/planner/Calendar"));
const ExamPlanner = lazy(() => import("../features/planner/ExamPlanner"));

import { useTransitionData } from "../../hooks/useTransitionData";

interface TabContentProps {
  activeTab: "table" | "map" | "transition" | "exams" | "calendar";
  currentPlan: StudyPlan;
  careerId: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  currentPlan,
}) => {
  const { hasTransition } = useTransitionData();

  return (
    <div className="animate-fade-in min-h-[500px]">
      {activeTab === "table" && (
        <div className="space-y-8 animate-fade-in">
          {Object.entries(currentPlan.coursesData).map(([year, courses]) => (
            <YearTable key={year} year={year} courses={courses} />
          ))}
        </div>
      )}

      {activeTab === "map" && (
        <div className="w-full h-[80vh] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <LoadingScreen message="Cargando mapa interactivo..." />
              </div>
            }
          >
            <MapErrorBoundary>
              <CareerMap courses={currentPlan.coursesData} />
            </MapErrorBoundary>
          </Suspense>
        </div>
      )}

      {activeTab === "transition" && hasTransition && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingScreen message="Cargando panel de transición..." />
            </div>
          }
        >
          <TransitionErrorBoundary>
            <TransitionDashboard />
          </TransitionErrorBoundary>
        </Suspense>
      )}

      {activeTab === "exams" && (
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Gestión de Mesas de Examen
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Administrá el cronograma de finales, validá correlatividades y
                optimizá tu estrategia académica.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[200px]">
                  <LoadingScreen message="Cargando planificador..." />
                </div>
              }
            >
              <ExamPlannerErrorBoundary>
                <ExamPlanner />
              </ExamPlannerErrorBoundary>
            </Suspense>
          </div>
        </div>
      )}

      {activeTab === "calendar" && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingScreen message="Cargando calendario..." />
            </div>
          }
        >
          <div className="w-full">
            <Calendar />
          </div>
        </Suspense>
      )}
    </div>
  );
};
