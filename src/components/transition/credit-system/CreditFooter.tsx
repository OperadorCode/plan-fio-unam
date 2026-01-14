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
    <div className="bg-slate-900 dark:bg-black text-white rounded-xl p-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm border border-slate-800">
      <div className="text-center sm:text-left">
        <h4 className="text-base font-bold text-gray-100">
          Carga Académica Total
        </h4>
        <p className="text-xs text-gray-400">
          Requerimientos globales para titulación
        </p>
      </div>
      <div className="flex items-center justify-center gap-8 sm:gap-12 w-full sm:w-auto">
        <div className="text-center">
          <div className="text-2xl font-bold font-mono text-white">
            {totalHours}
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            Horas
          </div>
        </div>
        <div className="h-8 w-px bg-gray-700"></div>
        <div className="text-center">
          <div className="text-3xl font-bold font-mono text-blue-400">
            {totalCredits}
          </div>
          <div className="text-[10px] text-blue-400/60 uppercase tracking-widest font-bold mt-1">
            Créditos
          </div>
        </div>
      </div>
    </div>
  );
};
