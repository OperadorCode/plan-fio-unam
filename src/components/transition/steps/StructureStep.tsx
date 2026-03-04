import React from "react";
import { CreditSystemView } from "../CreditSystemView";
import type { CreditSystemData } from "../../../types/creditSystem";
import type { Course } from "../../../types";

interface StructureStepProps {
  creditsData: CreditSystemData;
  approvedCodes: string[];
  regularCodes?: string[];
  intermediateTitleName: string;
  intermediateTitleFlag: keyof Course;
}

export const StructureStep: React.FC<StructureStepProps> = ({
  creditsData,
  approvedCodes,
  regularCodes = [],
  intermediateTitleName,
  intermediateTitleFlag,
}) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800">
        <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">
          Estructura Académica
        </h3>
        <p className="text-sm text-emerald-700 dark:text-emerald-200">
          El nuevo plan se rige por el Sistema Argentino de Créditos (SACAU).
          Visualizá tu proyección y los créditos requeridos por bloque.
        </p>
      </div>
      <CreditSystemView
        creditData={creditsData}
        approvedCodes={approvedCodes}
        regularCodes={regularCodes}
        intermediateTitleName={intermediateTitleName}
        intermediateTitleFlag={intermediateTitleFlag}
      />
    </div>
  );
};
