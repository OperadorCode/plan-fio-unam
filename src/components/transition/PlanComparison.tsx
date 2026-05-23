import React from "react";
import { simulateMigration } from "../../utils/transitionAnalysis";
import { CurrentPlanCard } from "./comparison/CurrentPlanCard";
import { TargetPlanCard } from "./comparison/TargetPlanCard";

type SimulationResult = ReturnType<typeof simulateMigration>;

interface PlanComparisonProps {
  originProgress: number;
  originApprovedCount: number;
  originTotalCourses: number;
  simulation: SimulationResult;
  lostCoursesDetails: { id: string; name: string }[];
  intermediateTitle: string;
  sourcePlanYear: number;
  targetPlanYear: number;
}

export const PlanComparison: React.FC<PlanComparisonProps> = ({
  originProgress,
  originApprovedCount,
  originTotalCourses,
  simulation,
  lostCoursesDetails,
  intermediateTitle,
  sourcePlanYear,
  targetPlanYear,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <CurrentPlanCard
        progress={originProgress}
        approvedCount={originApprovedCount}
        totalCourses={originTotalCourses}
        planYear={sourcePlanYear}
      />
      <TargetPlanCard
        progress={simulation.progress2025}
        approvedCountOriginal={originApprovedCount}
        coursesApproved2025={simulation.courses2025Approved}
        lostCoursesDetails={lostCoursesDetails}
        gainedTitles={simulation.gainedTitles}
        intermediateTitle={intermediateTitle}
        targetPlanYear={targetPlanYear}
      />
    </div>
  );
};
