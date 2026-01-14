import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { careersRegistry } from "../../data/careers";
import { getCareerIcon } from "../../utils/iconHelpers";

export const TransitionHeader: React.FC = () => {
  const careerId = useAppStore((state) => state.careerId);
  const career = careersRegistry[careerId];
  const careerName = career?.name || "Plan de Transición";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800 dark:to-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br from-${
                career?.color || "blue"
              }-500 to-${
                career?.color || "blue"
              }-600 text-white shadow-lg shadow-${
                career?.color || "blue"
              }-500/20`}
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
