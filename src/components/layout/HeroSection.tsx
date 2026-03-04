import React from "react";
import Stats from "../features/stats/Stats";
import type { StudyPlan, Course } from "../../types";
import type { TabId } from "../../types/navigation";
import { useTransitionData } from "../../hooks/useTransitionData";
import { ArrowRightLeft } from "lucide-react";

interface HeroSectionProps {
  currentPlan: StudyPlan;
  activeTab: TabId;
  allCourses: Course[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeTab,
  allCourses,
  currentPlan,
}) => {
  const { hasTransition, data: transitionData } = useTransitionData();

  if (activeTab !== "table") return null;

  const showBanner = hasTransition && transitionData && currentPlan.id !== transitionData.config.targetPlanId;

  return (
    <div className="mb-6 animate-fade-in-down flex flex-col gap-4">
      {showBanner && (
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <ArrowRightLeft size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Nuevo Plan Disponible</h3>
              <p className="text-indigo-100 text-sm">Hay una actualización de plan de estudios disponible. Revisá las equivalencias y los requisitos para cambiarte al nuevo plan.</p>
            </div>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("navigate-to-tab", { detail: { tabId: "transition" } }))}
            className="whitespace-nowrap px-5 py-2.5 bg-white text-indigo-600 hover:bg-indigo-50 font-extrabold rounded-xl text-sm transition-all shadow-sm w-full sm:w-auto text-center hover:scale-105 active:scale-95"
          >
            Ver Detalles y Actualizar
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>

        <div className="relative z-10">
          <Stats
            allCourses={allCourses}
            variant="dashboard"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
