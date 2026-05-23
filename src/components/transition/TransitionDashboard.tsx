import React from "react";
import { useMigrationLogic } from "../../hooks/useMigrationLogic";
import { useCareerMetadata } from "../../hooks/useCareerMetadata";
import { TransitionErrorBoundary } from "./TransitionErrorBoundary";
import TransitionStepContent from "./TransitionStepContent";

const TransitionDashboard: React.FC = () => {
  const {
    transitionData,
    hasTransition,
    approvedCourses,
    regularCourses,
    simulation,
    isAlreadyMigrated,
    isMigrating,
    performMigration,
  } = useMigrationLogic();

  const { originCourseMeta, targetCourseMeta } = useCareerMetadata();

  if (!hasTransition || !transitionData) return null;

  return (
    <TransitionErrorBoundary>
      <div className="w-full mx-auto space-y-8 pb-12 min-h-fit animate-fade-in text-gray-800 dark:text-gray-200">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4 md:pb-6 pt-4 px-4 relative z-10 bg-gray-50 dark:bg-gray-900">
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Actualizar Plan a {transitionData.targetPlan.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-2">
            Revisá cómo impacta el nuevo plan en tu carrera.
          </p>
        </div>

        <div className="px-4 xl:px-8 max-w-5xl mx-auto">
          <TransitionStepContent
            transitionData={transitionData}
            originCourseMeta={originCourseMeta}
            targetCourseMeta={targetCourseMeta}
            approvedCourses={approvedCourses}
            regularCourses={regularCourses}
            simulation={simulation}
            isAlreadyMigrated={isAlreadyMigrated}
            performMigration={performMigration}
            onLater={() => window.dispatchEvent(new CustomEvent("navigate-to-tab", { detail: { tabId: "table" } }))}
            isMigrating={isMigrating}
          />
        </div>
      </div>
    </TransitionErrorBoundary>
  );
};

export default TransitionDashboard;
