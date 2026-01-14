/**
 * Módulo de validación de títulos intermedios.
 *
 * Centraliza la lógica de verificación de requisitos para:
 * - Bachiller Universitario en Ingeniería (BUI)
 * - Títulos Intermedios específicos de cada carrera
 *
 * Esta implementación unifica la lógica previamente dispersa en
 * transitionAnalysis.ts y useCreditProgress.ts.
 */

import type { Course } from "../types";

/**
 * Verifica si el usuario cumple los requisitos para el BUI.
 *
 * Criterio: Todas las materias marcadas con `isBUI: true` deben estar aprobadas.
 *
 * @param approvedIds - IDs de materias aprobadas
 * @param allCourses - Lista completa de materias del plan
 * @returns true si cumple los requisitos del BUI
 */

export const checkBUIStatus = (
  approvedIds: string[],
  allCourses: Course[]
): boolean => {
  const buiCourses = allCourses.filter((c) => c.isBUI === true);

  // Si no hay materias BUI definidas, no aplica el título
  if (buiCourses.length === 0) return false;

  return buiCourses.every((c) => approvedIds.includes(c.id));
};

/**
 * Verifica si el usuario cumple los requisitos para un título intermedio.
 *
 * Criterio: Todas las materias marcadas con el flag especificado deben estar aprobadas.
 *
 * @param approvedIds - IDs de materias aprobadas
 * @param allCourses - Lista completa de materias del plan
 * @param intermediateTitleFlag - Nombre del campo que marca materias del título (ej: "isTULOC")
 * @returns true si cumple los requisitos del título intermedio
 */
export const checkIntermediateTitleStatus = (
  approvedIds: string[],
  allCourses: Course[],
  intermediateTitleFlag: keyof Course
): boolean => {
  const intermediateCourses = allCourses.filter(
    (c) => c[intermediateTitleFlag] === true
  );

  // Si no hay materias definidas para el título, no aplica
  if (intermediateCourses.length === 0) return false;

  return intermediateCourses.every((c) => approvedIds.includes(c.id));
};

/**
 * Calcula el progreso de créditos para el BUI basándose en los bloques CB y TB.
 *
 * Nota: Esta función complementa checkBUIStatus. Mientras que checkBUIStatus
 * verifica completitud binaria, esta función calcula el progreso porcentual.
 *
 * @param approvedCourseCredits - Créditos aprobados en bloques CB y TB
 * @param threshold - Umbral de créditos requeridos (por defecto 136)
 * @returns Objeto con créditos actuales, umbral y si está completado
 */

export const calculateBUIProgress = (
  approvedCourseCredits: number,
  threshold: number = 136
): { current: number; total: number; isReady: boolean } => {
  return {
    current: approvedCourseCredits,
    total: threshold,
    isReady: approvedCourseCredits >= threshold,
  };
};

/**
 * Wrapper que verifica ambos títulos intermedios a la vez.
 *
 * @param approvedIds - IDs de materias aprobadas
 * @param allCourses - Lista completa de materias del plan
 * @param intermediateTitleFlag - Flag del título intermedio específico de la carrera
 * @returns Objeto con estado de ambos títulos
 */

export const checkAllTitles = (
  approvedIds: string[],
  allCourses: Course[],
  intermediateTitleFlag: keyof Course
): { bui: boolean; intermediateTitle: boolean } => {
  return {
    bui: checkBUIStatus(approvedIds, allCourses),
    intermediateTitle: checkIntermediateTitleStatus(
      approvedIds,
      allCourses,
      intermediateTitleFlag
    ),
  };
};
