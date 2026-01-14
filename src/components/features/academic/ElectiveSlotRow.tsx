/**
 * Componente para gestionar espacios de materias electivas. Maneja la selección de materias
 * específicas dentro de un grupo electivo predefinido y realiza el seguimiento de su progreso académico (regular/aprobada).
 *
 * @param {Course} slot - El objeto de materia base que define el grupo electivo y la posición.
 *
 * @internal
 * - Obtiene las opciones disponibles de `careerPlans` utilizando la clave `electiveGroup`.
 * - Gestiona el estado de selección a través del store global `useAppStore`.
 * - Valida las correlativas dinámicamente para la opción electiva seleccionada usando `getMissingPrerequisites`.
 * - Implementa la lógica de progresión de estado (Regularizar -> Aprobar) limitada por los requisitos académicos.
 */

import React, { useState, useMemo } from "react";
import { ChevronDown, Check, BookOpen, Lock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../../store/useAppStore";
import { careerPlans } from "../../../data/careers";
import { getMissingPrerequisites } from "../../../utils/logic";
import type { Course, StudyPlan } from "../../../types";

interface Props {
  slot: Course;
}

export const ElectiveSlotRow: React.FC<Props> = ({ slot }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    careerId,
    selectedElectives,
    selectElective,
    courseStatus,
    updateStatus,
  } = useAppStore();

  const currentPlan = careerPlans[
    careerId as keyof typeof careerPlans
  ] as unknown as StudyPlan;
  const options = currentPlan?.electivesData?.[slot.electiveGroup!] || [];

  const selectedOptionId = selectedElectives[slot.id];
  const activeOption = options.find((o) => o.id === selectedOptionId);
  const currentStatus = courseStatus[slot.id];
  const allCoursesById = useMemo(() => {
    if (!currentPlan) return {};
    const flat = Object.values(currentPlan.coursesData).flat();
    const electives = Object.values(currentPlan.electivesData || {}).flat();
    const combined = [...flat, ...electives];
    return combined.reduce(
      (acc, c) => ({ ...acc, [c.id]: c }),
      {} as Record<string, Course>
    );
  }, [currentPlan]);

  const getMissing = (option: Course, forCursar: boolean) => {
    return getMissingPrerequisites(
      option,
      forCursar,
      courseStatus,
      allCoursesById
    );
  };

  const handleSelect = (optionId: string) => {
    selectElective(slot.id, optionId);
    setIsOpen(false);
  };

  const canRegularize = activeOption
    ? getMissing(activeOption, true).regular.length === 0 &&
      getMissing(activeOption, true).approved.length === 0
    : false;

  const canApprove =
    activeOption && canRegularize
      ? getMissing(activeOption, false).approved.length === 0
      : false;

  const handleRegularChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStatus === "regular" || currentStatus === "approved") {
      updateStatus(slot.id, "pending");
    } else if (canRegularize) {
      updateStatus(slot.id, "regular");
    }
  };

  const handleApprovedChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStatus === "approved") {
      updateStatus(slot.id, "regular");
    } else if (canApprove) {
      updateStatus(slot.id, "approved");
    }
  };

  const getContainerClasses = () => {
    let classes =
      "group relative flex flex-col transition-all duration-300 ease-in-out border-l-4 cursor-pointer ";

    if (currentStatus === "approved")
      classes += "bg-green-50/40 dark:bg-green-900/10 border-green-500 ";
    else if (currentStatus === "regular")
      classes += "bg-blue-50/40 dark:bg-blue-900/10 border-blue-400 ";
    else if (activeOption && !canRegularize)
      classes += "bg-gray-50 dark:bg-gray-900 border-gray-300 opacity-90 ";
    else
      classes += "bg-white dark:bg-gray-800 border-indigo-300 hover:shadow-md ";

    return classes;
  };

  return (
    <div className="mb-3 transition-all duration-200">
      {/* --- FILA PRINCIPAL --- */}
      <div className={getContainerClasses()} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-3">
          {/* INFO DE LA MATERIA */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`font-semibold text-sm sm:text-base ${
                  currentStatus
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {activeOption ? activeOption.name : slot.name}
              </span>

              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  activeOption
                    ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                    : "bg-gray-100 text-gray-500 border-gray-200"
                }`}
              >
                {activeOption ? "Optativa" : "Seleccionar"}
              </span>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-2 min-h-[20px]">
              {activeOption ? (
                <>
                  <span className="font-mono text-[10px] opacity-70">
                    {activeOption.id}
                  </span>
                  <span>•</span>
                  <span>
                    {activeOption.hours !== "-"
                      ? `${activeOption.hours}hs`
                      : "Semestral"}
                  </span>
                  {!canRegularize && (
                    <span className="text-red-500 flex items-center gap-1 font-medium ml-2">
                      <Lock size={10} /> Requisitos pendientes
                    </span>
                  )}
                </>
              ) : (
                <span className="text-indigo-500 font-medium animate-pulse">
                  Opciones disponibles...
                </span>
              )}
            </div>
          </div>

          {/* CONTROLES */}
          <div className="flex items-center gap-3">
            {activeOption && (
              <div
                className="flex items-center gap-1 sm:gap-2 mr-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* BOTÓN REGULAR */}
                <button
                  onClick={handleRegularChange}
                  disabled={!canRegularize}
                  title={
                    !canRegularize
                      ? "Faltan correlativas de cursada"
                      : "Regularizar"
                  }
                  className={`
                                flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300
                                ${
                                  currentStatus === "regular" ||
                                  currentStatus === "approved"
                                    ? "bg-blue-500 border-blue-600 text-white shadow-md hover:bg-blue-600"
                                    : canRegularize
                                    ? "bg-white dark:bg-gray-800 border-gray-300 text-gray-400 hover:border-blue-400 hover:text-blue-400"
                                    : "bg-gray-100 dark:bg-gray-900 border-gray-200 text-gray-200 cursor-not-allowed"
                                }
                            `}
                >
                  <span className="text-[10px] font-bold">R</span>
                </button>

                {/* BOTÓN APROBADO */}
                <button
                  onClick={handleApprovedChange}
                  disabled={!canApprove}
                  title={
                    !canApprove ? "Faltan finales anteriores" : "Aprobar Final"
                  }
                  className={`
                                flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300
                                ${
                                  currentStatus === "approved"
                                    ? "bg-green-500 border-green-600 text-white shadow-md hover:bg-green-600"
                                    : canApprove
                                    ? "bg-white dark:bg-gray-800 border-gray-300 text-gray-400 hover:border-green-400 hover:text-green-400"
                                    : "bg-gray-100 dark:bg-gray-900 border-gray-200 text-gray-200 cursor-not-allowed opacity-50"
                                }
                            `}
                >
                  {!canApprove && canRegularize ? (
                    <Lock size={12} />
                  ) : (
                    <Check size={16} strokeWidth={3} />
                  )}
                </button>
              </div>
            )}

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400"
            >
              <ChevronDown size={20} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- MENÚ DESPLEGABLE --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 ml-1 sm:ml-4 border-l-2 border-indigo-200 pl-2 sm:pl-4 space-y-2 pb-2">
              <div className="flex items-center gap-4 mb-2 px-1 pt-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Catálogo de Opciones
                </p>
                {selectedOptionId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect("");
                    }}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Eliminar
                  </button>
                )}
              </div>

              {options.map((opt) => {
                const missing = getMissing(opt, true);
                const isAvailable =
                  missing.regular.length === 0 && missing.approved.length === 0;
                const isSelected = opt.id === selectedOptionId;
                const isSelectedInOtherSlot = Object.keys(
                  selectedElectives
                ).some((key) => {
                  if (key === slot.id) return false;
                  const otherSlot = Object.values(currentPlan.coursesData)
                    .flat()
                    .find((c) => c.id === key);
                  if (
                    otherSlot?.electiveGroup === slot.electiveGroup &&
                    selectedElectives[key] === opt.id
                  ) {
                    return true;
                  }
                  return false;
                });

                const isDisabled = isSelectedInOtherSlot;

                return (
                  <button
                    key={opt.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isDisabled && isAvailable) handleSelect(opt.id);
                    }}
                    disabled={isSelected || isDisabled || !isAvailable}
                    className={`
                                    w-full text-left p-3 rounded-lg border text-sm flex flex-col gap-1 transition-all group
                                    ${
                                      isSelected
                                        ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 z-10"
                                        : isDisabled
                                        ? "bg-gray-100 dark:bg-gray-900 border-gray-200 opacity-60 cursor-not-allowed"
                                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-sm"
                                    }
                                    ${
                                      !isAvailable && !isSelected && !isDisabled
                                        ? "opacity-70 bg-gray-50 dark:bg-gray-900 grayscale-[0.3]"
                                        : ""
                                    }
                                `}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div
                        className={`font-semibold ${
                          isSelected
                            ? "text-indigo-900"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {opt.name}
                      </div>

                      <div>
                        {isSelected ? (
                          <span className="text-indigo-600 font-bold text-xs flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-md border border-indigo-100">
                            <Check size={14} /> Actual
                          </span>
                        ) : isDisabled ? (
                          <span className="text-gray-500 text-xs flex items-center gap-1 border border-gray-300 px-2 py-1 rounded bg-gray-200">
                            <Lock size={14} /> Ya seleccionada
                          </span>
                        ) : isAvailable ? (
                          <span className="text-green-600 text-xs flex items-center gap-1 bg-green-50 px-2 py-1 rounded border border-green-100">
                            <BookOpen size={14} /> Disponible
                          </span>
                        ) : (
                          <span className="text-red-400 text-xs flex items-center gap-1">
                            <Lock size={14} /> Bloqueada
                          </span>
                        )}
                      </div>
                    </div>

                    {!isAvailable && !isSelected && !isDisabled && (
                      <div className="text-xs text-red-400 mt-1 pl-2 border-l-2 border-red-200">
                        <span className="font-bold mr-1">Falta:</span>
                        {[...missing.regular, ...missing.approved]
                          .slice(0, 3)
                          .join(", ")}
                        {[...missing.regular, ...missing.approved].length > 3 &&
                          "..."}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
