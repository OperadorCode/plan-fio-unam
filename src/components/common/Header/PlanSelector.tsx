import React, { useRef, useState } from "react";
import { BookOpen, ChevronDown, Check, ArrowRightLeft } from "lucide-react";
import { useAppStore } from "../../../store/useAppStore";
import { allPlans, careersRegistry } from "../../../data/careers";
import { useTransitionData } from "../../../hooks/useTransitionData";

export const PlanSelector: React.FC = () => {
  const careerId = useAppStore((state) => state.careerId);
  const activePlanId = useAppStore((state) => state.activePlanId);
  const setActivePlan = useAppStore((state) => state.setActivePlan);

  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [showPlanHint, setShowPlanHint] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const hasSeenPlanHint = localStorage.getItem("planHintDismissed");
    if (hasSeenPlanHint) return;

    let timer: ReturnType<typeof setTimeout>;

    const tryShowHint = (delay: number) => {
      if (!localStorage.getItem("careerHintDismissed")) return;
      clearTimeout(timer);
      timer = setTimeout(() => setShowPlanHint(true), delay);
    };

    const handleCareerHintDismissed = () => {
      tryShowHint(800);
    };

    const handleCareerMenuOpened = () => {
      clearTimeout(timer);
      setShowPlanHint(false);
    };

    const handleCareerMenuClosed = () => {
      tryShowHint(800);
    };

    if (localStorage.getItem("careerHintDismissed")) {
      tryShowHint(2500);
    }

    window.addEventListener("careerHintDismissed", handleCareerHintDismissed);
    window.addEventListener("careerMenuOpened", handleCareerMenuOpened);
    window.addEventListener("careerMenuClosed", handleCareerMenuClosed);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("careerHintDismissed", handleCareerHintDismissed);
      window.removeEventListener("careerMenuOpened", handleCareerMenuOpened);
      window.removeEventListener("careerMenuClosed", handleCareerMenuClosed);
    };
  }, []);

  const dismissHint = () => {
    setShowPlanHint(false);
    localStorage.setItem("planHintDismissed", "true");
  };

  const { hasTransition, data: transitionData } = useTransitionData();

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
      {/* Tooltip Animado */}
      {showPlanHint && (
        <div className="absolute top-full left-0 mt-3 w-max z-50 animate-bounce-slow pointer-events-none">
          <div className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg relative">
            <div className="absolute bottom-full left-4 -mb-[1px] border-4 border-transparent border-b-blue-600"></div>
            Elegí tu plan
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setIsPlanOpen(!isPlanOpen);
          dismissHint();
        }}
        aria-haspopup="true"
        aria-expanded={isPlanOpen}
        aria-label={`Seleccionar Plan (Actual: ${currentPlanDisplay})`}
        className={`
                    relative overflow-hidden
                    flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm transition-all duration-200 group
                    ${isPlanOpen
            ? "bg-white dark:bg-gray-700 shadow-sm"
            : "hover:bg-blue-50 dark:hover:bg-gray-700/50"
          }
                    ${showPlanHint
            ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 animate-pulse"
            : ""
          }
                `}
      >
        {showPlanHint && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent -translate-x-full animate-shimmer" />
        )}

        <BookOpen
          size={16}
          className={`transition-colors ${isPlanOpen
            ? "text-blue-700 dark:text-blue-400"
            : "text-blue-600 dark:text-gray-400 group-hover:text-blue-800"
            }`}
        />
        <span className="font-semibold text-blue-700 dark:text-gray-200 hidden sm:block group-hover:text-blue-900 dark:group-hover:text-white">
          {currentPlanDisplay}
        </span>
        <ChevronDown
          size={14}
          className={`text-blue-400 dark:text-gray-400 opacity-70 transition-transform duration-200 ${isPlanOpen ? "rotate-180" : ""
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
                                    ${isSelected
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
          {hasTransition && transitionData && activePlanId !== transitionData.config.targetPlanId && (
            <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("navigate-to-tab", {
                      detail: { tabId: "transition" },
                    })
                  );
                  setIsPlanOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center justify-between group"
              >
                <span>Actualizar a Nuevo Plan</span>
                <ArrowRightLeft size={12} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
