import React from "react";
import { Filter, Layers } from "lucide-react";

interface CreditSummaryCardProps {
  totalApproved: number;
  totalObjective: number;
}

export const CreditSummaryCard: React.FC<CreditSummaryCardProps> = ({
  totalApproved,
  totalObjective,
}) => {
  const percentage = Math.round((totalApproved / totalObjective) * 100) || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Layers size={100} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <Filter size={20} />
          </div>
          <h3 className="font-bold text-gray-700 dark:text-gray-200">
            Resumen de Créditos
          </h3>
        </div>

        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {totalApproved}
          </span>
          <span className="text-lg text-gray-500 mb-1.5 font-medium">
            / {totalObjective}
          </span>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-1000"
            style={{
              width: `${(totalApproved / totalObjective) * 100}%`,
            }}
          />
        </div>
        <p className="text-xs text-gray-500">
          Completaste el{" "}
          <strong className="text-gray-700 dark:text-gray-300">
            {percentage}%
          </strong>{" "}
          de la carrera.
        </p>
      </div>
    </div>
  );
};
