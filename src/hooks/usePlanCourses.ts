/**
 * Hook que centraliza el cálculo de datos derivados del plan de estudios.
 *
 * Optimización de performance: Estos cálculos se hacían previamente en cada
 * instancia de CourseRow, causando O(n²) operaciones. Ahora se calculan
 * una sola vez y se comparten via contexto.
 */

import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import { usePlanContext } from "../context/PlanContext";
import { careerPlans } from "../data/careers";
import { buildUnlocksMap, calculateCriticality } from "../utils/logic";
import type { Course, StudyPlan } from "../types";

interface PlanCoursesData {
  allCourses: Course[];
  allCoursesById: Record<string, Course>;
  unlocksMap: ReturnType<typeof buildUnlocksMap>;
  criticalityMap: Record<string, number>;
}

export const usePlanCourses = (): PlanCoursesData => {
  const careerId = useAppStore((state) => state.careerId);
  const selectedElectives = useAppStore((state) => state.selectedElectives);
  const { currentPlan } = usePlanContext();

  const allCourses = useMemo(() => {
    if (!currentPlan) return [];

    const plan = careerPlans[
      careerId as keyof typeof careerPlans
    ] as unknown as StudyPlan;

    const rawCourses = Object.values(currentPlan.coursesData).flat();

    return rawCourses.map((c) => {
      if (c.isElectiveSlot && selectedElectives[c.id]) {
        const optionData = plan?.electivesData?.[c.electiveGroup!]?.find(
          (o) => o.id === selectedElectives[c.id]
        );

        if (optionData) {
          return { ...optionData, id: c.id };
        }
      }
      return c;
    });
  }, [currentPlan, careerId, selectedElectives]);

  const allCoursesById = useMemo(() => {
    const map: Record<string, Course> = {};
    for (const course of allCourses) {
      map[course.id] = course;
    }
    return map;
  }, [allCourses]);

  const unlocksMap = useMemo(() => {
    return buildUnlocksMap(allCourses);
  }, [allCourses]);

  const criticalityMap = useMemo(() => {
    const map: Record<string, number> = {};
    allCourses.forEach((course) => {
      map[course.id] = calculateCriticality(course.id, allCourses);
    });
    return map;
  }, [allCourses]);

  return {
    allCourses,
    allCoursesById,
    unlocksMap,
    criticalityMap,
  };
};
