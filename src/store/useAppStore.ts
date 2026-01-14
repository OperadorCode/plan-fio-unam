// -----------------------------------------------------------------------------
// Estado global y lógica central del planificador académico FIO (Zustand)
// -----------------------------------------------------------------------------
//
// Este archivo define el store principal de la aplicación usando Zustand,
// manejando el estado persistente, las acciones y la lógica de validación de materias,
// optativas, exámenes, notas y eventos del calendario.
//
// Estructura:
// 1. Tipos y estado inicial
// 2. Acciones simples (setters, notas, eventos, exámenes)
// 3. Lógica de optativas (elegir y propagar)
// 4. Lógica central de validación en cascada (correlativas)
// 5. Persistencia y guardado
// -----------------------------------------------------------------------------

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CourseStatusMap, CourseStatus, StudyPlan } from "../types";
import { careerPlans, allPlans } from "../data/careers";
import { validateCourseStatus } from "../utils/academicValidation";

interface AppState {
  careerId: string;
  activePlanId: string;
  courseStatus: CourseStatusMap;
  examPlan: Record<string, string[]>;
  notes: Record<string, string>;
  calendarEvents: Record<string, string[]>;
  selectedElectives: Record<string, string>;

  setCareer: (id: string) => void;
  setActivePlan: (planId: string) => void;
  migrateToPlan: (targetPlanId: string, approvedCourses: string[]) => void;
  updateStatus: (courseId: string, status: CourseStatus) => void;
  selectElective: (slotId: string, optionId: string) => void;
  addExamToPlan: (periodId: string, courseId: string) => void;
  removeExamFromPlan: (periodId: string, courseId: string) => void;
  saveNote: (courseId: string, note: string) => void;
  addCalendarEvent: (dateKey: string, text: string) => void;
  removeCalendarEvent: (dateKey: string, index: number) => void;

  resetProgress: () => void;
  loadBackup: (data: {
    careerId: string;
    activePlanId?: string;
    courseStatus: CourseStatusMap;
    selectedElectives?: Record<string, string>;
    examPlan?: Record<string, string[]>;
    notes?: Record<string, string>;
    calendarEvents?: Record<string, string[]>;
  }) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      careerId: "civil",
      activePlanId: "civil-2013",
      courseStatus: {},
      examPlan: {},
      notes: {},
      calendarEvents: {},
      selectedElectives: {},

      setCareer: (careerId) => {
        const defaultPlanId =
          careerPlans[careerId as keyof typeof careerPlans]?.id ||
          `${careerId}-2013`;
        set({ careerId, activePlanId: defaultPlanId });
      },
      setActivePlan: (planId) => set({ activePlanId: planId }),

      migrateToPlan: (targetPlanId, approvedCourses) => {
        set((state) => {
          const newStatus: CourseStatusMap = { ...state.courseStatus };
          approvedCourses.forEach((courseId) => {
            newStatus[courseId] = "approved";
          });

          return {
            activePlanId: targetPlanId,
            courseStatus: newStatus,
          };
        });
      },

      saveNote: (courseId, note) => {
        set((state) => ({ notes: { ...state.notes, [courseId]: note } }));
      },
      addCalendarEvent: (dateKey, text) => {
        set((state) => {
          const currentEvents = state.calendarEvents[dateKey] || [];
          return {
            calendarEvents: {
              ...state.calendarEvents,
              [dateKey]: [...currentEvents, text],
            },
          };
        });
      },
      removeCalendarEvent: (dateKey, index) => {
        set((state) => {
          const currentEvents = state.calendarEvents[dateKey];
          if (!currentEvents) return state;
          const newEvents = [...currentEvents];
          newEvents.splice(index, 1);
          const newCalendarEvents = { ...state.calendarEvents };
          if (newEvents.length === 0) delete newCalendarEvents[dateKey];
          else newCalendarEvents[dateKey] = newEvents;
          return { calendarEvents: newCalendarEvents };
        });
      },
      addExamToPlan: (periodId, courseId) => {
        set((state) => {
          const periodList = state.examPlan[periodId] || [];
          if (periodList.includes(courseId)) return state;
          return {
            examPlan: {
              ...state.examPlan,
              [periodId]: [...periodList, courseId],
            },
          };
        });
      },
      removeExamFromPlan: (periodId, courseId) => {
        set((state) => {
          const periodList = state.examPlan[periodId] || [];
          return {
            examPlan: {
              ...state.examPlan,
              [periodId]: periodList.filter((id) => id !== courseId),
            },
          };
        });
      },

      selectElective: (slotId, optionId) => {
        set((state) => ({
          selectedElectives: {
            ...state.selectedElectives,
            [slotId]: optionId,
          },
        }));
        get().updateStatus(slotId, "pending");
      },

      updateStatus: (courseId, newStatus) => {
        set((state) => {
          const tempStatus = { ...state.courseStatus };
          if (newStatus === "pending") {
            delete tempStatus[courseId];
          } else {
            tempStatus[courseId] = newStatus;
          }

          const currentPlan =
            allPlans[state.activePlanId] ||
            (careerPlans[
              state.careerId as keyof typeof careerPlans
            ] as unknown as StudyPlan);

          if (!currentPlan) return { courseStatus: tempStatus };
          return validateCourseStatus(
            tempStatus,
            currentPlan,
            state.selectedElectives,
            state.examPlan
          );
        });
      },

      resetProgress: () => {
        set((state) => ({
          courseStatus: {},
          examPlan: {},
          notes: {},
          calendarEvents: {},
          selectedElectives: {},
          careerId: state.careerId,
        }));
      },

      loadBackup: (data) => {
        set(() => ({
          careerId: data.careerId,
          activePlanId:
            data.activePlanId ||
            careerPlans[data.careerId as keyof typeof careerPlans]?.id,
          courseStatus: data.courseStatus,
          selectedElectives: data.selectedElectives || {},
          examPlan: data.examPlan || {},
          notes: data.notes || {},
          calendarEvents: data.calendarEvents || {},
        }));
      },
    }),
    {
      name: "planificador-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        careerId: state.careerId,
        activePlanId: state.activePlanId,
        courseStatus: state.courseStatus,
        examPlan: state.examPlan,
        notes: state.notes,
        calendarEvents: state.calendarEvents,
        selectedElectives: state.selectedElectives,
      }),
    }
  )
);
