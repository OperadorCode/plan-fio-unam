import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import { allPlans } from "../data/careers";
import type { Course } from "../types";

export interface OriginCourseMeta {
  name: string;
  year: string;
  regimen: string;
  hours: number;
}

export interface TargetCourseMeta {
  name: string;
  regimen: string;
  block: string;
}

export const useCareerMetadata = () => {
  const careerId = useAppStore((state) => state.careerId);

  const originCourseMeta = useMemo(() => {
    const originPlan = Object.values(allPlans).find(
      (p) => p.careerId === careerId && p.year !== 2025
    );
    const meta: Record<string, OriginCourseMeta> = {};

    if (originPlan) {
      Object.entries(originPlan.coursesData).forEach(([year, courses]) => {
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

  const targetCourseMeta = useMemo(() => {
    const planId = `${careerId}-2025`;
    const plan = allPlans[planId];
    const meta: Record<string, TargetCourseMeta> = {};

    if (plan) {
      Object.entries(plan.coursesData).forEach(([, courses]) => {
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

  return { originCourseMeta, targetCourseMeta };
};
