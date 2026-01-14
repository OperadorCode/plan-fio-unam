import { civilEquivalencias } from "../data/careers/civil/equivalencias";
import { civil2025 } from "../data/careers/civil/plan2025";
import { creditos2025 as creditosCivil } from "../data/careers/civil/creditos2025";
import { electromecanicaEquivalencias } from "../data/careers/electromecanica/equivalencias";
import { electromecanica2025 } from "../data/careers/electromecanica/plan2025";
import { creditos2025 as creditosElectromecanica } from "../data/careers/electromecanica/creditos2025";
import { electronicaEquivalencias } from "../data/careers/electronica/equivalencias";
import { electronica2025 } from "../data/careers/electronica/plan2025";
import { creditos2025 as creditosElectronica } from "../data/careers/electronica/creditos2025";
import { industrialEquivalencias } from "../data/careers/industrial/equivalencias";
import { industrial2025 } from "../data/careers/industrial/plan2025";
import { creditos2025 as creditosIndustrial } from "../data/careers/industrial/creditos2025";
import { useAppStore } from "../store/useAppStore";
import type { StudyPlan, Course } from "../types";
import type { CreditSystemData } from "../types/creditSystem";

export interface TransitionData {
  equivalencies: any[];
  targetPlan: StudyPlan;
  creditsData: CreditSystemData;
  intermediateTitle: string;
  intermediateTitleFlag: keyof Course;
  sourcePlanYear: number;
  config: {
    targetPlanId: string;
  };
}

export const useTransitionData = () => {
  const careerId = useAppStore((state) => state.careerId);

  const transitionRegistry: Record<string, TransitionData> = {
    civil: {
      equivalencies: civilEquivalencias,
      targetPlan: civil2025,
      creditsData: creditosCivil,
      intermediateTitle:
        "Técnico/a Universitario/a en Laboratorio de Obras Civiles",
      intermediateTitleFlag: "isTULOC",
      sourcePlanYear: 2013,
      config: {
        targetPlanId: "civil-2025",
      },
    },
    electromecanica: {
      equivalencies: electromecanicaEquivalencias,
      targetPlan: electromecanica2025,
      creditsData: creditosElectromecanica,
      intermediateTitle: "Técnico Universitario en Electrotecnia y Metrología",
      intermediateTitleFlag: "isTUEM",
      sourcePlanYear: 2013,
      config: {
        targetPlanId: "electromecanica-2025",
      },
    },
    electronica: {
      equivalencies: electronicaEquivalencias,
      targetPlan: electronica2025,
      creditsData: creditosElectronica,
      intermediateTitle:
        "Técnico Universitario en Electrónica de Automatización",
      intermediateTitleFlag: "isTUEA",
      sourcePlanYear: 2013,
      config: {
        targetPlanId: "electronica-2025",
      },
    },
    industrial: {
      equivalencies: industrialEquivalencias,
      targetPlan: industrial2025,
      creditsData: creditosIndustrial,
      intermediateTitle:
        "Técnico Universitario en Gestión de Procesos de Producción",
      intermediateTitleFlag: "isTUGPP",
      sourcePlanYear: 2013,
      config: {
        targetPlanId: "industrial-2025",
      },
    },
  };

  const data = transitionRegistry[careerId as keyof typeof transitionRegistry];

  return {
    hasTransition: !!data,
    data,
  };
};
