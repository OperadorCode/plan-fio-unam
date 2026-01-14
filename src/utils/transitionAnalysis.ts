import type { EquivalenceRule } from "../types";
import type { StudyPlan, Course } from "../types";
import { checkAllTitles } from "./titleValidation";

interface MigrationSimulation {
  courses2025Approved: string[];
  courses2025Pending: string[];
  lostCourses: string[];
  gainedTitles: {
    bui: boolean;
    intermediateTitle: boolean;
  };
  progress2025: number;
}

const calculateEquivalencies = (
  approvedIds2013: string[],
  rules: EquivalenceRule[]
): { newApproved: string[]; matchedSourceIds: string[] } => {
  const newApproved: string[] = [];
  const matchedSourceIds: string[] = [];

  rules.forEach((eq) => {
    if (eq.sourceIds.length === 0) return;

    const hasAllSources = eq.sourceIds.every((id) =>
      approvedIds2013.includes(id)
    );

    if (hasAllSources) {
      newApproved.push(eq.targetId);
      matchedSourceIds.push(...eq.sourceIds);
    }
  });

  return { newApproved, matchedSourceIds };
};

export const simulateMigration = (
  approvedIdsMixed: string[],
  equivalencies: EquivalenceRule[],
  targetPlan: StudyPlan,
  intermediateTitleFlag: keyof Course
): MigrationSimulation => {
  const { newApproved: equivalenciesFound, matchedSourceIds } =
    calculateEquivalencies(approvedIdsMixed, equivalencies);

  const allCourses2025 = Object.values(targetPlan.coursesData).flat();
  const all2025Ids = new Set(allCourses2025.map((c) => c.id));

  const directlyApproved2025 = approvedIdsMixed.filter((id) =>
    all2025Ids.has(id)
  );

  const finalApproved2025 = Array.from(
    new Set([...equivalenciesFound, ...directlyApproved2025])
  );

  const uniqueMatched = new Set(matchedSourceIds);
  const lostCourses = approvedIdsMixed.filter(
    (id) => !uniqueMatched.has(id) && !all2025Ids.has(id)
  );

  const gainedTitles = checkAllTitles(
    finalApproved2025,
    allCourses2025,
    intermediateTitleFlag
  );

  const total2025 = allCourses2025.length;
  const pending2025 = allCourses2025
    .filter((c) => !finalApproved2025.includes(c.id))
    .map((c) => c.id);

  return {
    courses2025Approved: finalApproved2025,
    courses2025Pending: pending2025,
    lostCourses,
    gainedTitles,
    progress2025:
      total2025 > 0 ? (finalApproved2025.length / total2025) * 100 : 0,
  };
};

export const getCriticalDates = (startYear: number = 2025) => {
  const currentYear = new Date().getFullYear();
  return [
    {
      year: startYear,
      type: "start",
      dateString: `01/04/${startYear}`,
      label: "Inicio de Vigencia",
      subLabel: `Plan ${startYear}`,
      warning: currentYear > startYear,
    },
    {
      year: startYear + 1,
      type: "milestone",
      label: "Implementación",
      subLabel: "2º y 3º Año",
      warning: currentYear >= startYear + 1,
    },
    {
      year: startYear + 2,
      type: "milestone",
      label: "Fin Cursado",
      subLabel: "4º Año Plan Anterior",
      warning: currentYear >= startYear + 2,
    },
    {
      year: startYear + 3,
      type: "milestone",
      label: "Fin Cursado",
      subLabel: "5º Año Plan Anterior",
      warning: currentYear >= startYear + 3,
    },
    {
      year: startYear + 4,
      type: "plain",
      warning: currentYear >= startYear + 4,
    },
    {
      year: startYear + 6,
      type: "plain",
      warning: currentYear >= startYear + 6,
    },
    {
      year: startYear + 7,
      type: "end",
      dateString: `31/03/${startYear + 7}`,
      label: "Caducidad Definitiva",
      warning: currentYear >= startYear + 5,
    },
  ];
};
