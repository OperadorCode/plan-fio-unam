import { useMemo, useState } from "react";
import type { CreditSystemData } from "../types/creditSystem";
import type { Course } from "../types";
import { calculateBUIProgress } from "../utils/titleValidation";

export const useCreditProgress = (
  creditData: CreditSystemData,
  approvedCodes: string[] = [],
  intermediateTitleName: string = "Título Intermedio",
  intermediateTitleFlag: keyof Course = "isTULOC"
) => {
  const { bloques_conocimiento, plan_de_estudios } = creditData;

  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const blockProgress = useMemo(() => {
    const stats: Record<string, { approvedCredits: number }> = {};
    let totalApproved = 0;

    let bachelorCredits = 0;
    let intermediateCredits = 0;
    let intermediateTotalCredits = 0;

    bloques_conocimiento.forEach((b) => {
      stats[b.sigla] = { approvedCredits: 0 };
    });

    plan_de_estudios.forEach((year) => {
      year.asignaturas.forEach((subject) => {
        if (subject[intermediateTitleFlag]) {
          intermediateTotalCredits += subject.CRE;
        }

        if (approvedCodes.includes(subject.codigo)) {
          if (stats[subject.bloque]) {
            const credits = subject.CRE;
            stats[subject.bloque].approvedCredits += credits;
            totalApproved += credits;
            if (subject.bloque === "CB" || subject.bloque === "TB") {
              bachelorCredits += credits;
            }
          }

          if (subject[intermediateTitleFlag]) {
            intermediateCredits += subject.CRE;
          }
        }
      });
    });

    const buiProgress = calculateBUIProgress(bachelorCredits, 136);

    const isIntermediateReady =
      intermediateCredits >= intermediateTotalCredits &&
      intermediateTotalCredits > 0;

    return {
      stats,
      totalApproved,
      bachelorCredits,
      isBachelorReady: buiProgress.isReady,
      intermediateCredits,
      intermediateTotalCredits,
      isIntermediateReady,
    };
  }, [
    approvedCodes,
    bloques_conocimiento,
    plan_de_estudios,
    intermediateTitleFlag,
  ]);

  const titles = useMemo(
    () => [
      {
        name: "Bachiller Universitario en Ingeniería",
        subtitle: "Progreso Ciclo Básico (CB + TB)",
        current: blockProgress.bachelorCredits,
        total: 136,
        isReady: blockProgress.isBachelorReady,
        requirements: "Requiere completar bloques CB y TB (~136 créditos).",
      },
      {
        name: intermediateTitleName,
        subtitle: "Progreso Título Intermedio",
        current: blockProgress.intermediateCredits,
        total: blockProgress.intermediateTotalCredits,
        isReady: blockProgress.isIntermediateReady,
        requirements:
          "Requiere aprobar todas las asignaturas específicas del título.",
      },
    ],
    [blockProgress, intermediateTitleName]
  );

  const nextTitle = () => {
    setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
  };

  const prevTitle = () => {
    setCurrentTitleIndex((prev) => (prev - 1 + titles.length) % titles.length);
  };

  const handleBlockSelect = (sigla: string) => {
    if (selectedBlock === sigla) {
      setSelectedBlock(null);
    } else {
      setSelectedBlock(sigla);
    }
  };

  return {
    blockProgress,
    titles,
    currentTitleIndex,
    currentTitle: titles[currentTitleIndex],
    nextTitle,
    prevTitle,
    selectedBlock,
    handleBlockSelect,
    setSelectedBlock,
  };
};
