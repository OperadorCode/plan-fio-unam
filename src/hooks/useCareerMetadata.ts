import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import { allPlans } from "../data/careers";
import type { Course } from "../types";

export interface CourseMeta2013 {
  name: string;
  year: string;
  regimen: string;
  hours: number;
}

export interface CourseMeta2025 {
  name: string;
  regimen: string;
  block: string;
}

export const useCareerMetadata = () => {
  const careerId = useAppStore((state) => state.careerId);

  const courseMeta2013 = useMemo(() => {
    const planId = `${careerId}-2013`;
    const plan = allPlans[planId];
    const meta: Record<string, CourseMeta2013> = {};

    if (plan) {
      Object.entries(plan.coursesData).forEach(([year, courses]) => {
        courses.forEach((c: Course) => {
          meta[c.id] = {
            name: c.name,
            year,
            regimen: c.regimen,
            hours: typeof c.hours === "number" ? c.hours : 0,
          };
        });
      });
    }
    return meta;
  }, [careerId]);

  const courseMeta2025 = useMemo(() => {
    const planId = `${careerId}-2025`;
    const plan = allPlans[planId];
    const meta: Record<string, CourseMeta2025> = {};

    if (plan) {
      Object.entries(plan.coursesData).forEach(([_, courses]) => {
        courses.forEach((c: Course) => {
          meta[c.id] = {
            name: c.name,
            regimen: c.regimen,
            block: c.block || "",
          };
        });
      });
    }
    return meta;
  }, [careerId]);

  return { courseMeta2013, courseMeta2025 };
};
