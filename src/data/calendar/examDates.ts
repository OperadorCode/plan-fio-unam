// ================== FECHAS DE MESAS DE EXAMEN ==================
// Fuente única de turnos oficiales para el planificador académico.
// Cada objeto representa un turno de examen con rango de fechas y nombre visual.

import type { ExamDate } from "../../schemas/calendarSchemas";

/**
 * =============================================================================
 * GUÍA PARA AGREGAR NUEVAS MESAS:
 * 1. Creá una nueva constante por año (ej: exams2027).
 * 2. Copiá la estructura de un examen existente.
 * 3. Asegurate de que 'start' y 'end' sean formato 'YYYY-MM-DD'.
 * 4. Agregá la nueva variable al array `examDates` al final.
 * =============================================================================
 */

// --- 2025 (FINALIZADO) ---
const exams2025: ExamDate[] = [
  {
    id: "may-25",
    name: "Turno Mayo",
    start: "2025-05-13",
    end: "2025-05-17",
    displayDates: "13/05 al 17/05",
  },
  {
    id: "jul-1-25",
    name: "1º Turno Julio",
    start: "2025-07-01",
    end: "2025-07-05",
    displayDates: "01/07 al 05/07",
  },
  {
    id: "jul-2-25",
    name: "2º Turno Julio/Agosto",
    start: "2025-07-29",
    end: "2025-08-02",
    displayDates: "29/07 al 02/08",
  },
  {
    id: "sep-25",
    name: "Turno Septiembre",
    start: "2025-09-16",
    end: "2025-09-20",
    displayDates: "16/09 al 20/09",
  },
  {
    id: "nov-25",
    name: "1º Turno Noviembre",
    start: "2025-11-25",
    end: "2025-11-29",
    displayDates: "25/11 al 29/11",
  },
  {
    id: "dic-25",
    name: "2º Turno Diciembre 2025",
    start: "2025-12-16",
    end: "2025-12-20",
    displayDates: "16/12 al 20/12",
  },
];

const exams2026: ExamDate[] = [
  // --- INICIO 2026 ---
  {
    id: "feb-1-26",
    name: "1º Turno Febrero",
    start: "2026-02-09",
    end: "2026-02-13",
    displayDates: "09/02 al 13/02",
  },
  {
    id: "feb-2-26",
    name: "2º Turno Febrero",
    start: "2026-02-23",
    end: "2026-02-27",
    displayDates: "23/02 al 27/02",
  },
  {
    id: "mar-26",
    name: "9º Turno Marzo 2026",
    start: "2026-03-09",
    end: "2026-03-13",
    displayDates: "09/03 al 13/03",
  },
  {
    id: "abr-26",
    name: "1º Turno Abril",
    start: "2026-04-06",
    end: "2026-04-10",
    displayDates: "06/04 al 10/04",
  },
  {
    id: "jul-1-26",
    name: "2º Turno Julio",
    start: "2026-07-27",
    end: "2026-07-31",
    displayDates: "27/07 al 31/07",
  },
  {
    id: "ago-26",
    name: "3º Turno Agosto",
    start: "2026-08-10",
    end: "2026-08-14",
    displayDates: "10/08 al 14/08",
  },
  {
    id: "sep-26",
    name: "4º Turno Septiembre",
    start: "2026-09-28",
    end: "2026-10-02",
    displayDates: "28/09 al 02/10",
  },
  {
    id: "dic-1-26",
    name: "5º Turno Diciembre",
    start: "2026-12-07",
    end: "2026-12-11",
    displayDates: "07/12 al 11/12",
  },
  {
    id: "dic-2-26",
    name: "6º Turno Diciembre",
    start: "2026-12-14",
    end: "2026-12-18",
    displayDates: "14/12 al 18/12",
  },
];

const exams2027: ExamDate[] = [
  // --- INICIO 2027 ---
  {
    id: "feb-1-27",
    name: "7º Turno Febrero 2027",
    start: "2027-02-10",
    end: "2027-02-12",
    displayDates: "10/02 al 12/02",
  },
  {
    id: "feb-2-27",
    name: "8º Turno Febrero 2027",
    start: "2027-02-22",
    end: "2027-02-26",
    displayDates: "22/02 al 26/02",
  },
  {
    id: "mar-27",
    name: "9º Turno Marzo 2027",
    start: "2027-03-08",
    end: "2027-03-12",
    displayDates: "08/03 al 12/03",
  },
];

export const examDates: ExamDate[] = [...exams2025, ...exams2026, ...exams2027];
