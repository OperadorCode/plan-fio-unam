/**
 * Utilidades para el manejo de información de materias (Regimen, Periodos, etc.)
 * Centraliza la lógica de parsing de strings como "1º C.", "Anual", etc.
 */

export const REGIMEN = {
  ANUAL: "Anual",
  PRIMER_CUATRIMESTRE: "1º C.",
  SEGUNDO_CUATRIMESTRE: "2º C.",
};

/**
 * Devuelve un texto legible para mostrar en la interfaz (tooltip o tarjeta).
 * Ej: "1º C." -> "1º Cuatrimestre"
 */

export const getPeriodText = (regimen: string | undefined): string => {
  if (!regimen) return "";
  const lower = regimen.toLowerCase();

  if (lower.includes("1") || lower.includes("primer")) return "1º Cuatrimestre";
  if (lower.includes("2") || lower.includes("segundo"))
    return "2º Cuatrimestre";
  if (lower.includes("anual")) return "Anual";

  return regimen;
};

/**
 * Devuelve un valor numérico para ordenar materias por periodo dentro del año.
 * Anual -> 0
 * 1º C -> 1
 * 2º C -> 2
 * Default -> 3
 */

export const getRegimenOrderValue = (regimen: string | undefined): number => {
  if (!regimen) return 3;
  const lower = regimen.toLowerCase();

  if (lower.includes("anual")) return 0;
  if (lower.includes("1") || lower.includes("primer")) return 1;
  if (lower.includes("2") || lower.includes("segundo")) return 2;

  return 3;
};

/**
 * Helpers para validar el regimen
 */

export const isFirstSemester = (regimen: string): boolean => {
  return regimen.includes("1º C.") || regimen.toLowerCase().includes("primer");
};

export const isSecondSemester = (regimen: string): boolean => {
  return regimen.includes("2º C.") || regimen.toLowerCase().includes("segundo");
};

export const isAnnual = (regimen: string): boolean => {
  return regimen === "Anual" || regimen.toLowerCase().includes("anual");
};
