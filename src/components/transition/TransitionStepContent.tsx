import React, { memo } from "react";
import type {
  CourseMeta2013,
  CourseMeta2025,
} from "../../hooks/useCareerMetadata";
import type { TransitionData } from "../../hooks/useTransitionData";
import { IntroStep } from "./steps/IntroStep";
import { EquivalenciesStep } from "./steps/EquivalenciesStep";
import { StructureStep } from "./steps/StructureStep";
import { MigrationStep } from "./steps/MigrationStep";

interface StepContentProps {
  transitionData: TransitionData | null;
  courseMeta2013: Record<string, CourseMeta2013>;
  courseMeta2025: Record<string, CourseMeta2025>;
  approvedCourses: string[];
  regularCourses: string[];
  simulation: ReturnType<
    typeof import("../../utils/transitionAnalysis").simulateMigration
  > | null;
  isAlreadyMigrated: boolean;
  performMigration: () => void;
  onLater: () => void;
  isMigrating: boolean;
}

const TransitionStepContent: React.FC<StepContentProps> = memo(
  ({
    transitionData,
    courseMeta2013,
    courseMeta2025,
    approvedCourses,
    regularCourses,
    simulation,
    isAlreadyMigrated,
    performMigration,
    onLater,
    isMigrating,
  }) => {
    if (!transitionData) return null;

    return (
      <div className="flex flex-col gap-16 md:gap-24 animate-fade-in pb-12">
        {/* Sección 1: Introducción */}
        <section id="transicion-intro" className="scroll-mt-24">
          <IntroStep intermediateTitle={transitionData.intermediateTitle} />
        </section>

        {/* Sección 2: Equivalencias */}
        <section id="transicion-equivalencias" className="scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-500 rounded-r-full hidden md:block" />
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Cambios en tu Trayecto</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">Revisá cómo se reconocen tus materias actuales en el nuevo plan.</p>
            </div>
          </div>
          <EquivalenciesStep
            courseMeta2013={courseMeta2013}
            courseMeta2025={courseMeta2025}
            approvedCourses={approvedCourses}
            regularCourses={regularCourses}
            equivalencies={transitionData.equivalencies}
            simulation={simulation}
            intermediateTitle={transitionData.intermediateTitle}
            sourcePlanYear={transitionData.sourcePlanYear}
            targetPlanYear={transitionData.targetPlan.year}
          />
        </section>

        {/* Sección 3: Estructura del Nuevo Plan */}
        <section id="transicion-estructura" className="scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-r-full hidden md:block" />
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Estructura del Nuevo Plan</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">Conocé los requisitos y el sistema de créditos.</p>
            </div>
          </div>
          <StructureStep
            creditsData={transitionData.creditsData}
            approvedCodes={simulation?.courses2025Approved || []}
            regularCodes={simulation?.courses2025Regular || []}
            intermediateTitleName={transitionData.intermediateTitle}
            intermediateTitleFlag={transitionData.intermediateTitleFlag}
          />
        </section>

        {/* Sección 4: Confirmación Final */}
        {simulation && (
          <section id="transicion-confirmacion" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-500 rounded-r-full hidden md:block" />
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Confirmación Final</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">Revisá tu progreso y completá la migración al nuevo plan.</p>
              </div>
            </div>
            <MigrationStep
              isAlreadyMigrated={isAlreadyMigrated}
              simulation={simulation}
              onMigrate={performMigration}
              onLater={onLater}
              isMigrating={isMigrating}
              targetPlanName={transitionData.targetPlan.name}
            />
          </section>
        )}
      </div>
    );
  }
);

TransitionStepContent.displayName = "TransitionStepContent";

export default TransitionStepContent;
