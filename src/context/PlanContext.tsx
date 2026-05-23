import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { careerPlans, allPlans } from "../data/careers";
import { StudyPlanSchema } from "../schemas/careerSchemas";
import type { StudyPlan, Course } from "../types";

interface PlanContextType {
  currentPlan: StudyPlan | null;
  allCourses: Course[];
  loading: boolean;
  error: string | null;
  validationWarnings: string[];
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const activePlanId = useAppStore((state) => state.activePlanId);
  const careerId = useAppStore((state) => state.careerId);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  const planData = useMemo(() => {
    let plan = allPlans[activePlanId];

    if (!plan && careerPlans[careerId as keyof typeof careerPlans]) {
      plan = careerPlans[careerId as keyof typeof careerPlans];
    }

    return plan || null;
  }, [activePlanId, careerId]);

  useEffect(() => {
    if (!planData || !import.meta.env.DEV) {
      setTimeout(() => setValidationWarnings([]), 0);
      return;
    }

    const validation = StudyPlanSchema.safeParse(planData);
    if (!validation.success) {
      const warnings = validation.error.issues.map(
        (issue) => `[${issue.path.join(".")}]: ${issue.message}`
      );
      console.warn("[PlanContext] Validation warnings:", warnings);
      setTimeout(() => setValidationWarnings(warnings), 0);
    } else {
      setTimeout(() => setValidationWarnings([]), 0);
    }
  }, [planData]);

  const allCourses = useMemo(() => {
    if (!planData) return [];
    return Object.values(planData.coursesData).flat();
  }, [planData]);

  const errorMessage = useMemo(() => {
    if (!planData) {
      return `No se pudo cargar el plan de estudios para "${careerId}". Verificá tu conexión o seleccioná otra carrera.`;
    }
    return null;
  }, [planData, careerId]);

  const value = useMemo(
    () => ({
      currentPlan: planData,
      allCourses,
      loading: false,
      error: errorMessage,
      validationWarnings,
    }),
    [planData, allCourses, errorMessage, validationWarnings]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }
  return context;
};
