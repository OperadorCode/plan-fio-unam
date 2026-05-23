import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { careersRegistry } from "../../data/careers";
import { getCareerIcon } from "../../utils/iconHelpers";

const careerColorClasses: Record<string, string> = {
  cyan: "from-cyan-500 to-cyan-600 shadow-cyan-500/20",
  blue: "from-blue-500 to-blue-600 shadow-blue-500/20",
  orange: "from-orange-500 to-orange-600 shadow-orange-500/20",
  indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/20",
  green: "from-green-500 to-green-600 shadow-green-500/20",
  rose: "from-rose-500 to-rose-600 shadow-rose-500/20",
  yellow: "from-yellow-500 to-yellow-600 shadow-yellow-500/20",
};

const defaultColorClasses = "from-blue-500 to-blue-600 shadow-blue-500/20";

export const TransitionHeader: React.FC = () => {
  const careerId = useAppStore((state) => state.careerId);
  const career = careersRegistry[careerId];
  const careerName = career?.name || "Plan de Transición";
  const colorClasses = careerColorClasses[career?.color || "blue"] || defaultColorClasses;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800 dark:to-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses} text-white shadow-lg`}
            >
              {getCareerIcon(career?.icon, 32)}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
                {careerName}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide uppercase">
                  Facultad de Ingeniería
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  • Universidad Nacional de Misiones
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
