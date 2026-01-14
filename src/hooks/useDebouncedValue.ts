import { useEffect, useState } from "react";

/**
 * Hook para debounce de valores.
 * Útil para optimizar búsquedas y filtros que se ejecutan en cada tecla presionada.
 *
 * @param value - El valor a debounce
 * @param delay - Delay en milisegundos (default: 300ms)
 * @returns El valor debounced
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
