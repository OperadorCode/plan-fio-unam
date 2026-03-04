import React, { useMemo } from "react";
import { EquivalenciesTable } from "../EquivalenciesTable";
import { PlanComparison } from "../PlanComparison";
import type {
  CourseMeta2013,
  CourseMeta2025,
} from "../../../hooks/useCareerMetadata";
import type { simulateMigration } from "../../../utils/transitionAnalysis";

interface EquivalenciesStepProps {
  courseMeta2013: Record<string, CourseMeta2013>;
  courseMeta2025: Record<string, CourseMeta2025>;
  approvedCourses: string[];
  regularCourses: string[];
  equivalencies: any[];
  simulation: ReturnType<typeof simulateMigration> | null;
  intermediateTitle: string;
  sourcePlanYear: number;
  targetPlanYear: number;
}

export const EquivalenciesStep: React.FC<EquivalenciesStepProps> = ({
  courseMeta2013,
  courseMeta2025,
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

    const validCourseIds2013 = new Set(Object.keys(courseMeta2013));

    const filteredApprovedCourses = approvedCourses.filter((id) =>
      validCourseIds2013.has(id)
    );

    const totalCourses2013 = validCourseIds2013.size;
    const approvedCount2013 = filteredApprovedCourses.length;
    const progress2013 =
      totalCourses2013 > 0 ? (approvedCount2013 / totalCourses2013) * 100 : 0;

    const lostCoursesDetails = simulation.lostCourses.map((id) => ({
      id,
      name: courseMeta2013[id]?.name || id,
    }));

    return {
      progress2013,
      approvedCount2013,
      totalCourses2013,
      lostCoursesDetails,
    };
  }, [simulation, courseMeta2013, approvedCourses]);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Comparación Visual de Planes */}
      {simulation && comparisonData && (
        <PlanComparison
          progress2013={comparisonData.progress2013}
          approvedCount2013={comparisonData.approvedCount2013}
          totalCourses2013={comparisonData.totalCourses2013}
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
          courseMeta2013={courseMeta2013}
          courseMeta2025={courseMeta2025}
          approvedCourses={approvedCourses}
          regularCourses={regularCourses}
          equivalencies={equivalencies}
        />
      </div>
    </div>
  );
};
