import React, { useRef, useState } from "react";
import { BookOpen, ChevronDown, Check } from "lucide-react";
import { useAppStore } from "../../../store/useAppStore";
import { allPlans, careersRegistry } from "../../../data/careers";

export const PlanSelector: React.FC = () => {
  const careerId = useAppStore((state) => state.careerId);
  const activePlanId = useAppStore((state) => state.activePlanId);
  const setActivePlan = useAppStore((state) => state.setActivePlan);

  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);

  const currentCareer = careersRegistry[careerId];

  const availablePlansData = React.useMemo(() => {
    const availablePlanIds = currentCareer ? currentCareer.availablePlans : [];
    return availablePlanIds.map((id) => allPlans[id]).filter(Boolean);
  }, [currentCareer]);

  const [currentPlanDisplay, setCurrentPlanDisplay] = useState<string>("");

  React.useEffect(() => {
    const activePlan = allPlans[activePlanId];
    if (activePlan) {
      setCurrentPlanDisplay(activePlan.year.toString());
    } else if (availablePlansData.length > 0) {
      const defaultPlan =
        availablePlansData.find((p) => p.active) ||
        availablePlansData[availablePlansData.length - 1];
      setCurrentPlanDisplay(defaultPlan?.year.toString() || "...");
    }
  }, [activePlanId, availablePlansData]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (planRef.current && !planRef.current.contains(event.target as Node)) {
        setIsPlanOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={planRef}>
      <button
        onClick={() => setIsPlanOpen(!isPlanOpen)}
        aria-haspopup="true"
        aria-expanded={isPlanOpen}
        aria-label={`Seleccionar Plan (Actual: ${currentPlanDisplay})`}
        className={`
                    flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm transition-all duration-200 group
                    ${
                      isPlanOpen
                        ? "bg-white dark:bg-gray-700 shadow-sm"
                        : "hover:bg-blue-50 dark:hover:bg-gray-700/50"
                    }
                `}
      >
        <BookOpen
          size={16}
          className={`transition-colors ${
            isPlanOpen
              ? "text-blue-700 dark:text-blue-400"
              : "text-blue-600 dark:text-gray-400 group-hover:text-blue-800"
          }`}
        />
        <span className="font-semibold text-blue-700 dark:text-gray-200 hidden sm:block group-hover:text-blue-900 dark:group-hover:text-white">
          {currentPlanDisplay}
        </span>
        <ChevronDown
          size={14}
          className={`text-blue-400 dark:text-gray-400 opacity-70 transition-transform duration-200 ${
            isPlanOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isPlanOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1 animate-fade-in z-50">
          <div className="px-3 py-2 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-100 dark:border-gray-700 mb-1">
            Planes de Estudio
          </div>
          {availablePlansData.map((plan) => {
            const isSelected = activePlanId === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => {
                  setActivePlan(plan.id);
                  setIsPlanOpen(false);
                }}
                className={`
                                    w-full px-4 py-2 text-left text-sm flex items-center justify-between transition-colors
                                    ${
                                      isSelected
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    }
                                `}
              >
                <span>Plan {plan.year}</span>
                {isSelected && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
