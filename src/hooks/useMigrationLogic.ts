import { useState, useMemo, useCallback } from "react";
import { useAppStore } from "../store/useAppStore";
import { simulateMigration } from "../utils/transitionAnalysis";
import { useTransitionData } from "./useTransitionData";

export const useMigrationLogic = () => {
  const { courseStatus, migrateToPlan, activePlanId } = useAppStore();
  const { data: transitionData, hasTransition } = useTransitionData();
  const [isMigrating, setIsMigrating] = useState(false);

  const approvedCourses = useMemo(
    () =>
      Object.entries(courseStatus)
        .filter(([_, status]) => status === "approved")
        .map(([id]) => id),
    [courseStatus]
  );

  const regularCourses = useMemo(
    () =>
      Object.entries(courseStatus)
        .filter(([_, status]) => status === "regular")
        .map(([id]) => id),
    [courseStatus]
  );

  const simulation = useMemo(() => {
    if (!transitionData) return null;
    return simulateMigration(
      approvedCourses,
      regularCourses,
      transitionData.equivalencies,
      transitionData.targetPlan,
      transitionData.intermediateTitleFlag
    );
  }, [approvedCourses, regularCourses, transitionData]);

  const isAlreadyMigrated =
    transitionData?.config.targetPlanId === activePlanId;

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
    isMigrating,

    transitionData,
    hasTransition,
    approvedCourses,
    regularCourses,
    simulation,
    isAlreadyMigrated,

    performMigration,
  };
};
