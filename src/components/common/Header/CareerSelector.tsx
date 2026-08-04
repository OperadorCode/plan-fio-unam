import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Check, GraduationCap } from "lucide-react";
import { useAppStore } from "../../../store/useAppStore";
import { careersRegistry } from "../../../data/careers";
import { getCareerIcon } from "../../../utils/iconHelpers";
import { ConfirmationModal } from "../ConfirmationModal";

export const CareerSelector: React.FC = () => {
  const careerId = useAppStore((state) => state.careerId);
  const courseStatus = useAppStore((state) => state.courseStatus);
  const setCareer = useAppStore((state) => state.setCareer);
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [showCareerHint, setShowCareerHint] = useState(false);
  const [seenNewElectromecanica, setSeenNewElectromecanica] = useState(
    () => localStorage.getItem("seenNew_electromecanica") === "true"
  );
  const [pendingCareerId, setPendingCareerId] = useState<string | null>(null);

  const hasProgress = Object.keys(courseStatus).length > 0;

  const careerRef = useRef<HTMLDivElement>(null);
  const currentCareer = careersRegistry[careerId];

  useEffect(() => {
    const hasSeenHint = localStorage.getItem("careerHintDismissed");
    if (!hasSeenHint) {
      const timer = setTimeout(() => setShowCareerHint(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);



  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        careerRef.current &&
        !careerRef.current.contains(event.target as Node)
      ) {
        setIsCareerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dismissHint = () => {
    setShowCareerHint(false);
    localStorage.setItem("careerHintDismissed", "true");
    window.dispatchEvent(new Event("careerHintDismissed"));
  };

  useEffect(() => {
    if (isCareerOpen) {
      window.dispatchEvent(new Event("careerMenuOpened"));
    } else {
      window.dispatchEvent(new Event("careerMenuClosed"));
    }
  }, [isCareerOpen]);

  const mainContent = (
    <div className="relative" ref={careerRef}>
      {/* Tooltip Animado */}
      {showCareerHint && (
        <div className="absolute top-full left-0 mt-3 w-max z-50 animate-bounce-slow pointer-events-none">
          <div className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg relative">
            <div className="absolute bottom-full left-4 -mb-[1px] border-4 border-transparent border-b-blue-600"></div>
            Elegí tu carrera
          </div>
        </div>
      )}

      <button
        id="career-button"
        onClick={() => {
          setIsCareerOpen(!isCareerOpen);
          dismissHint();
        }}
        aria-haspopup="true"
        aria-expanded={isCareerOpen}
        aria-label={currentCareer?.name || "Seleccionar Carrera"}
        title={currentCareer?.name || "Seleccionar Carrera"}
        className={`
                    relative overflow-hidden
                    flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors duration-200
                    ${isCareerOpen
            ? "bg-white dark:bg-gray-700 shadow-sm text-blue-700 dark:text-blue-400"
            : "text-blue-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50 hover:text-blue-800 dark:hover:text-white"
          }
                    ${showCareerHint
            ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 animate-pulse"
            : ""
          }
                `}
      >
        {showCareerHint && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent -translate-x-full animate-shimmer" />
        )}

        <div
          className={`relative z-10 ${isCareerOpen ? "text-blue-600 dark:text-blue-400" : ""
            }`}
        >
          {currentCareer ? (
            getCareerIcon(currentCareer.icon, 20)
          ) : (
            <GraduationCap size={20} />
          )}
        </div>

        <ChevronDown
          size={14}
          className={`text-gray-400 opacity-70 transition-transform duration-200 relative z-10 ${isCareerOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isCareerOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1 animate-fade-in z-50 origin-top-left">
          <div className="px-3 py-2 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-100 dark:border-gray-700 mb-1 bg-gray-50 dark:bg-gray-800/50">
            Carreras Disponibles
          </div>
          {Object.values(careersRegistry).map((career) => {
            const isSelected = careerId === career.id;
            const isDisabled = !career.enabled;
            return (
              <button
                key={career.id}
                onClick={() => {
                  if (isDisabled) return;
                  if (isSelected) {
                    setIsCareerOpen(false);
                    return;
                  }
                  if (career.id === "electromecanica") {
                    localStorage.setItem("seenNew_electromecanica", "true");
                    setSeenNewElectromecanica(true);
                  }
                  if (hasProgress) {
                    setPendingCareerId(career.id);
                  } else {
                    setCareer(career.id);
                  }
                  setIsCareerOpen(false);
                }}
                disabled={isDisabled}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between gap-2 transition-colors
                                    ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected
                      ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/10"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }
                                `}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className={
                      isDisabled
                        ? "text-gray-400 dark:text-gray-600"
                        : isSelected
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    }
                  >
                    {getCareerIcon(career.icon, 16)}
                  </span>
                  <span
                    className={`flex items-center gap-2 min-w-0 ${isDisabled
                      ? "text-gray-400 dark:text-gray-600"
                      : isSelected
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300"
                      }`}
                  >
                    <span className="truncate">{career.name}</span>
                    {career.id === "electromecanica" && !seenNewElectromecanica && (
                      <span className="text-[9px] uppercase font-bold text-white bg-blue-500 px-1.5 py-0.5 rounded-full animate-pulse flex-shrink-0">
                        Nuevo
                      </span>
                    )}
                  </span>
                </div>
                {isDisabled ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                    Próximamente
                  </span>
                ) : (
                  isSelected && <Check size={14} className="flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <>
      <ConfirmationModal
        isOpen={pendingCareerId !== null}
        onClose={() => setPendingCareerId(null)}
        onConfirm={() => {
          if (pendingCareerId) {
            setCareer(pendingCareerId);
            setPendingCareerId(null);
          }
        }}
        title="Cambiar de carrera"
        message="Al cambiar de carrera se borrará todo tu progreso actual (materias, exámenes, notas y calendario). Te recomendamos exportar un backup antes de continuar."
        confirmText="Cambiar carrera"
        cancelText="Cancelar"
        type="warning"
      />
      {mainContent}
    </>
  );
};

