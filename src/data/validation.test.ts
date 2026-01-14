/**
 * Suite de pruebas de integridad para los planes de estudio (StudyPlan).
 *
 * Valida de forma automatizada:
 * 1. Conformidad de Esquema: Verifica que cada plan cumpla con `StudyPlanSchema` (Zod).
 * 2. Integridad Referencial: Asegura que todos los IDs en las correlatividades
 *    (`requiredRegularToCourse`, `requiredApprovedToCourse`, `requiredApprovedToFinal`) existan dentro del conjunto de materias.
 * 3. Consistencia de Electivas: Valida que los slots marcados como electivos
 *    referencien grupos existentes en `electivesData`.
 */

import { describe, it, expect } from "vitest";
import { allPlans } from "./careers";
import { StudyPlanSchema } from "../schemas/careerSchemas";
import type { StudyPlan } from "../types";

describe("Validación de Integridad de Datos (Carreras)", () => {
  Object.values(allPlans).forEach((plan: StudyPlan) => {
    describe(`Plan: ${plan.name} (${plan.id})`, () => {
      it("Debe cumplir con el esquema Zod (Estructura base)", () => {
        const result = StudyPlanSchema.safeParse(plan);
        if (!result.success) {
          console.error(
            `Error en esquema del plan ${plan.id}:`,
            result.error.format()
          );
        }
        expect(result.success).toBe(true);
      });

      it("Todas las correlativas deben existir dentro del plan", () => {
        const allCourseIds = new Set<string>();

        Object.values(plan.coursesData)
          .flat()
          .forEach((c) => allCourseIds.add(c.id));

        if (plan.electivesData) {
          Object.values(plan.electivesData)
            .flat()
            .forEach((c) => allCourseIds.add(c.id));
        }
        const checkRefs = (courseVars: StudyPlan["coursesData"][string]) => {
          courseVars.forEach((c) => {
            const refs = [
              ...c.requiredRegularToCourse,
              ...c.requiredApprovedToCourse,
              ...c.requiredApprovedToFinal,
            ];
            refs.forEach((refId) => {
              if (refId === "ALL") return;

              if (!allCourseIds.has(refId)) {
                throw new Error(
                  `La materia '${c.name}' (${c.id}) referencia a '${refId}' que NO existe en el plan.`
                );
              }
            });
          });
        };

        expect(() =>
          checkRefs(Object.values(plan.coursesData).flat())
        ).not.toThrow();

        if (plan.electivesData) {
          expect(() =>
            checkRefs(Object.values(plan.electivesData!).flat())
          ).not.toThrow();
        }
      });

      it("Los slots de electivas deben tener grupos válidos definidos en electivesData", () => {
        const slots = Object.values(plan.coursesData)
          .flat()
          .filter((c) => c.isElectiveSlot);

        slots.forEach((slot) => {
          const group = slot.electiveGroup;
          expect(group).toBeDefined();

          if (plan.electivesData) {
            const options = plan.electivesData[group!];
            if (!options || options.length === 0) {
              throw new Error(
                `El slot '${slot.name}' apunta al grupo '${group}' que no existe o está vacío en electivesData.`
              );
            }
          } else {
            throw new Error(
              `El slot '${slot.name}' requiere electivas, pero el plan no tiene 'electivesData'.`
            );
          }
        });
      });
    });
  });
});
