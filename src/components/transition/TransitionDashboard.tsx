import React from "react";
import { useMigrationLogic } from "../../hooks/useMigrationLogic";
import { useCareerMetadata } from "../../hooks/useCareerMetadata";
import { TransitionErrorBoundary } from "./TransitionErrorBoundary";
import { Stepper } from "../common/Stepper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TransitionStepContent from "./TransitionStepContent";

const TransitionDashboard: React.FC = () => {
  const {
    currentStep,
    steps,
    isFirstStep,
    isLastStep,
    transitionData,
    hasTransition,
    approvedCourses,
    simulation,
    isAlreadyMigrated,
    isMigrating,
    nextStep,
    prevStep,
    performMigration,
    itemsHelper,
  } = useMigrationLogic();

  const { courseMeta2013, courseMeta2025 } = useCareerMetadata();

  if (!hasTransition || !transitionData) return null;

  return (
    <TransitionErrorBoundary>
      <div className="w-full mx-auto p-4 space-y-8 pb-12 min-h-fit">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={itemsHelper.setCurrentStep}
        />
        <div className="min-h-[400px]">
          <TransitionStepContent
            currentStep={currentStep}
            transitionData={transitionData}
            courseMeta2013={courseMeta2013}
            courseMeta2025={courseMeta2025}
            approvedCourses={approvedCourses}
            simulation={simulation}
            isAlreadyMigrated={isAlreadyMigrated}
            performMigration={performMigration}
            onLater={() => itemsHelper.setCurrentStep(0)}
            isMigrating={isMigrating}
          />
        </div>
        <div className="flex justify-between items-center pt-8 mt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={prevStep}
            disabled={isFirstStep}
            aria-label="Anterior"
            title="Anterior"
            className={`
                h-10 w-10 flex items-center justify-center rounded-full transition-all
                ${
                  isFirstStep
                    ? "text-gray-200 dark:text-gray-800 cursor-not-allowed"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }
            `}
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>

          <div
            className="flex gap-2"
            role="list"
            aria-label="Indicador de progreso"
          >
            {steps.map((_step, idx) => (
              <div
                key={idx}
                role="listitem"
                aria-current={idx === currentStep ? "step" : undefined}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? "bg-indigo-600 dark:bg-indigo-500 scale-125"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          {!isLastStep ? (
            <button
              onClick={nextStep}
              aria-label="Siguiente"
              title="Siguiente"
              className="h-10 w-10 flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-lg shadow-gray-200 dark:shadow-none hover:bg-black dark:hover:bg-gray-200 transition-all hover:scale-110 active:scale-95"
            >
              <ArrowRight size={20} strokeWidth={2} />
            </button>
          ) : (
            <div className="w-10"></div>
          )}
        </div>
      </div>
    </TransitionErrorBoundary>
  );
};

export default TransitionDashboard;
