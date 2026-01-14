/**
 * Utilidades de procesamiento de texto.
 *
 * Centraliza funciones de normalización y transformación de strings
 * para búsquedas, comparaciones y filtros.
 */

/**
 * Normaliza un texto para búsquedas case-insensitive y sin acentos.
 *
 * - Convierte a minúsculas
 * - Remueve diacríticos (acentos, tildes, etc.)
 *
 * @param text - Texto a normalizar
 * @returns Texto normalizado
 *
 * @example
 * normalizeText("Álgebra") // "algebra"
 * normalizeText("Diseño") // "diseno"
 */

export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

/**
 * Verifica si un texto contiene otro, ignorando mayúsculas y acentos.
 *
 * @param haystack - Texto donde buscar
 * @param needle - Texto a buscar
 * @returns true si haystack contiene needle (normalizado)
 */
export const containsNormalized = (
  haystack: string,
  needle: string
): boolean => {
  return normalizeText(haystack).includes(normalizeText(needle));
};
