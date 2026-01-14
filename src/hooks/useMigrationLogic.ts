import { useState, useMemo, useCallback } from "react";
import { useAppStore } from "../store/useAppStore";
import { simulateMigration } from "../utils/transitionAnalysis";
import { useTransitionData } from "./useTransitionData";
import { useCareerMetadata } from "./useCareerMetadata";

export interface MigrationStepConfig {
  title: string;
  description: string;
}

const STEPS: MigrationStepConfig[] = [
  { title: "Introducción", description: "Panorama General y Plazos" },
  { title: "Equivalencias", description: "Reconocimiento de Materias" },
  { title: "Nuevo Plan", description: "Sistema de Créditos 2025" },
  { title: "Migración", description: "Confirmación Definitiva" },
];

export const useMigrationLogic = () => {
  const { courseStatus, migrateToPlan, activePlanId } = useAppStore();
  const { data: transitionData, hasTransition } = useTransitionData();
  const { courseMeta2013 } = useCareerMetadata();
  const [currentStep, setCurrentStep] = useState(0);
  const [isMigrating, setIsMigrating] = useState(false);

  const approvedCourses = useMemo(
    () =>
      Object.entries(courseStatus)
        .filter(([_, status]) => status === "approved")
        .map(([id]) => id),
    [courseStatus]
  );

  const sourcePlanCourses = useMemo(() => {
    return approvedCourses.filter((id) => courseMeta2013[id]);
  }, [approvedCourses, courseMeta2013]);

  const simulation = useMemo(() => {
    if (!transitionData) return null;
    return simulateMigration(
      sourcePlanCourses,
      transitionData.equivalencies,
      transitionData.targetPlan,
      transitionData.intermediateTitleFlag
    );
  }, [sourcePlanCourses, transitionData]);

  const isAlreadyMigrated =
    transitionData?.config.targetPlanId === activePlanId;

  const nextStep = useCallback(
    () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1)),
    []
  );

  const prevStep = useCallback(
    () => setCurrentStep((prev) => Math.max(prev - 1, 0)),
    []
  );

  const performMigration = useCallback(() => {
    if (!transitionData || !simulation || isMigrating) return;

    setIsMigrating(true);
    migrateToPlan(
      transitionData.config.targetPlanId,
      simulation.courses2025Approved
    );
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }, [transitionData, simulation, migrateToPlan, isMigrating]);

  return {
    currentStep,
    steps: STEPS,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === STEPS.length - 1,
    isMigrating,

    transitionData,
    hasTransition,
    approvedCourses,
    simulation,
    isAlreadyMigrated,

    nextStep,
    prevStep,
    performMigration,
    itemsHelper: {
      setCurrentStep,
    },
  };
};
