import React from "react";
import { simulateMigration } from "../../utils/transitionAnalysis";
import { CurrentPlanCard } from "./comparison/CurrentPlanCard";
import { TargetPlanCard } from "./comparison/TargetPlanCard";

type SimulationResult = ReturnType<typeof simulateMigration>;

interface PlanComparisonProps {
  progress2013: number;
  approvedCount2013: number;
  totalCourses2013: number;
  simulation: SimulationResult;
  lostCoursesDetails: { id: string; name: string }[];
  intermediateTitle: string;
  sourcePlanYear: number;
  targetPlanYear: number;
}

export const PlanComparison: React.FC<PlanComparisonProps> = ({
  progress2013,
  approvedCount2013,
  totalCourses2013,
  simulation,
  lostCoursesDetails,
  intermediateTitle,
  sourcePlanYear,
  targetPlanYear,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <CurrentPlanCard
        progress={progress2013}
        approvedCount={approvedCount2013}
        totalCourses={totalCourses2013}
        planYear={sourcePlanYear}
      />
      <TargetPlanCard
        progress={simulation.progress2025}
        approvedCountOriginal={approvedCount2013}
        coursesApproved2025={simulation.courses2025Approved}
        lostCoursesDetails={lostCoursesDetails}
        gainedTitles={simulation.gainedTitles}
        intermediateTitle={intermediateTitle}
        targetPlanYear={targetPlanYear}
      />
    </div>
  );
};
