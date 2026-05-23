import React, { useMemo } from "react";
import { EquivalenciesTable } from "../EquivalenciesTable";
import { PlanComparison } from "../PlanComparison";
import type {
  OriginCourseMeta,
  TargetCourseMeta,
} from "../../../hooks/useCareerMetadata";
import type { EquivalenceRule } from "../../../types";
import type { simulateMigration } from "../../../utils/transitionAnalysis";

interface EquivalenciesStepProps {
  originCourseMeta: Record<string, OriginCourseMeta>;
  targetCourseMeta: Record<string, TargetCourseMeta>;
  approvedCourses: string[];
  regularCourses: string[];
  equivalencies: EquivalenceRule[];
  simulation: ReturnType<typeof simulateMigration> | null;
  intermediateTitle: string;
  sourcePlanYear: number;
  targetPlanYear: number;
}

export const EquivalenciesStep: React.FC<EquivalenciesStepProps> = ({
  originCourseMeta,
  targetCourseMeta,
  approvedCourses,
  regularCourses,
  equivalencies,
  simulation,
  intermediateTitle,
  sourcePlanYear,
  targetPlanYear,
}) => {
  const comparisonData = useMemo(() => {
    if (!simulation) return null;

    const validCourseIds2013 = new Set(Object.keys(originCourseMeta));

    const filteredApprovedCourses = approvedCourses.filter((id) =>
      validCourseIds2013.has(id)
    );

    const originTotalCourses = validCourseIds2013.size;
    const originApprovedCount = filteredApprovedCourses.length;
    const originProgress =
      originTotalCourses > 0 ? (originApprovedCount / originTotalCourses) * 100 : 0;

    const lostCoursesDetails = simulation.lostCourses.map((id) => ({
      id,
      name: originCourseMeta[id]?.name || id,
    }));

    return {
      originProgress,
      originApprovedCount,
      originTotalCourses,
      lostCoursesDetails,
    };
  }, [simulation, originCourseMeta, approvedCourses]);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Comparación Visual de Planes */}
      {simulation && comparisonData && (
        <PlanComparison
          originProgress={comparisonData.originProgress}
          originApprovedCount={comparisonData.originApprovedCount}
          originTotalCourses={comparisonData.originTotalCourses}
          simulation={simulation}
          lostCoursesDetails={comparisonData.lostCoursesDetails}
          intermediateTitle={intermediateTitle}
          sourcePlanYear={sourcePlanYear}
          targetPlanYear={targetPlanYear}
        />
      )}

      {/* Tabla de Equivalencias */}
      <div className="mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Tabla de Equivalencias</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Consultá cómo se reconocen las materias de tu plan actual en el nuevo plan de estudios.
          </p>
        </div>
        <EquivalenciesTable
          originCourseMeta={originCourseMeta}
          targetCourseMeta={targetCourseMeta}
          approvedCourses={approvedCourses}
          regularCourses={regularCourses}
          equivalencies={equivalencies}
        />
      </div>
    </div>
  );
};
