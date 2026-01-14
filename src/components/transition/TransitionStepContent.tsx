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
  currentStep: number;
  transitionData: TransitionData | null;
  courseMeta2013: Record<string, CourseMeta2013>;
  courseMeta2025: Record<string, CourseMeta2025>;
  approvedCourses: string[];
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
    currentStep,
    transitionData,
    courseMeta2013,
    courseMeta2025,
    approvedCourses,
    simulation,
    isAlreadyMigrated,
    performMigration,
    onLater,
    isMigrating,
  }) => {
    if (!transitionData) return null;

    switch (currentStep) {
      case 0:
        return (
          <IntroStep intermediateTitle={transitionData.intermediateTitle} />
        );
      case 1:
        return (
          <EquivalenciesStep
            courseMeta2013={courseMeta2013}
            courseMeta2025={courseMeta2025}
            approvedCourses={approvedCourses}
            equivalencies={transitionData.equivalencies}
            simulation={simulation}
            intermediateTitle={transitionData.intermediateTitle}
            sourcePlanYear={transitionData.sourcePlanYear}
            targetPlanYear={transitionData.targetPlan.year}
          />
        );
      case 2:
        return (
          <StructureStep
            creditsData={transitionData.creditsData}
            approvedCodes={simulation?.courses2025Approved || []}
            intermediateTitleName={transitionData.intermediateTitle}
            intermediateTitleFlag={transitionData.intermediateTitleFlag}
          />
        );
      case 3:
        if (!simulation) return null;
        return (
          <MigrationStep
            isAlreadyMigrated={isAlreadyMigrated}
            simulation={simulation}
            onMigrate={performMigration}
            onLater={onLater}
            isMigrating={isMigrating}
            targetPlanName={transitionData.targetPlan.name}
          />
        );
      default:
        return null;
    }
  }
);

TransitionStepContent.displayName = "TransitionStepContent";

export default TransitionStepContent;
