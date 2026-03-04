import React from "react";

interface CreditFooterProps {
  totalHours: number;
  totalCredits: number;
}

export const CreditFooter: React.FC<CreditFooterProps> = ({
  totalHours,
  totalCredits,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl p-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-center sm:text-left">
        <h4 className="text-base font-bold text-gray-900 dark:text-white">
          Carga Académica Total
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Requerimientos globales para titulación
        </p>
      </div>
      <div className="flex items-center justify-center gap-8 sm:gap-12 w-full sm:w-auto">
        <div className="text-center">
          <div className="text-2xl font-bold font-mono text-gray-800 dark:text-gray-100">
            {totalHours}
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-1">
            Horas (aprox.)
          </div>
        </div>
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
        <div className="text-center">
          <div className="text-3xl font-bold font-mono text-blue-600 dark:text-blue-400">
            {totalCredits}
          </div>
          <div className="text-[10px] text-blue-600/70 dark:text-blue-400/70 uppercase tracking-widest font-bold mt-1">
            Créditos
          </div>
        </div>
      </div>
    </div>
  );
};
