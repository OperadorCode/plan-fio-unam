// ================== CONFIGURACIÓN DE EVENTOS DEL CALENDARIO ==================
// Define feriados nacionales, eventos académicos y fechas especiales FI-UNaM.
// No incluye mesas de examen (ver examDates.ts para eso).

import type { GeneralEvent } from "../../schemas/calendarSchemas";

/**
 * =============================================================================
 * GUÍA PARA AGREGAR UN NUEVO AÑO:
 * 1. Copiá la estructura de un año existente (ej: events2026).
 * 2. Cambiá el nombre de la variable (ej: events2027).
 * 3. Actualizá las fechas respetando el formato 'YYYY-MM-DD'.
 * 4. Agregá la nueva variable al array `generalEvents` al final del archivo.
 * =============================================================================
 */

export type EventType =
  | "holiday"
  | "academic"
  | "special"
  | "exam"
  | "personal";

export const EVENT_COLORS: Record<EventType, string> = {
  exam: "bg-blue-500 text-white", // Exámenes
  holiday: "bg-red-500 text-white", // Feriados nacionales
  academic: "bg-green-500 text-white", // Inicio/fin de clases y recesos
  special: "bg-yellow-500 text-white", // Eventos institucionales o asuetos
  personal: "bg-purple-500 text-white", // Notas personales del usuario
};

// CALENDARIO 2025 [FINALIZADO]
const events2025: GeneralEvent[] = [
  { date: "2025-03-24", description: "Día de la Memoria", type: "holiday" },
  { date: "2025-04-02", description: "Día del Veterano", type: "holiday" },
  { date: "2025-05-01", description: "Día del Trabajador", type: "holiday" },
  { date: "2025-05-25", description: "Revolución de Mayo", type: "holiday" },
  { date: "2025-06-20", description: "Día de la Bandera", type: "holiday" },
  {
    date: "2025-07-09",
    description: "Día de la Independencia",
    type: "holiday",
  },
  { date: "2025-08-17", description: "Gral. San Martín", type: "holiday" },
  {
    date: "2025-08-25",
    description: "Inicio 2º Cuatrimestre",
    type: "academic",
  },
  { date: "2025-10-13", description: "Feriado Puente", type: "holiday" },
  { date: "2025-11-20", description: "Soberanía Nacional", type: "holiday" },
  { date: "2025-12-08", description: "Inmaculada Concepción", type: "holiday" },
  { date: "2025-12-25", description: "Navidad", type: "holiday" },
];

// CALENDARIO 2026

// ------- 1. CICLO LECTIVO 2026 -------
// INICIO: 2026-02-09
// FINALIZACION: 2026-12-18

// ------- 2. AÑO ACADÉMICO 2026 -------

// INICIO: 2026-04-01
// FINALIZACION: 2027-03-31
// FIN DE VALIDEZ DE TRABAJOS PRACTICOS REGULARIZADOS EN 2023: 2026-03-31

// ------ 3. PERÍODO DE CLASES 2026 ------

// --- 3.1. ASIGNATURAS ANUALES - PRIMER AÑO ---
// (CARRERAS DE INGENIERÍA Y LICENCIATURA EN HIGIENE Y SEGURIDAD)

// PRIMER CUATRIMESTRE INICIO: 2026-03-16
// PRIMER CUATRIMESTRE FINALIZACION: 2026-07-03

// SEGUNDO CUATRIMESTRE INICIO: 2026-08-18
// SEGUNDO CUATRIMESTRE FINALIZACION: 2026-12-04

// VENCIMIENTO INFORME REGULARIZACION 1: 2026-12-11
// VENCIMIENTO INFORME REGULARIZACION 2: 2027-02-26

// --- 3.2. ASIGNATURAS ANUALES - 2.º A 5.º AÑO (INGENIERÍAS) ---

// INICIO: 2026-03-16
// FINALIZACION: 2026-12-04
// DURACION TOTAL: 30 SEMANAS

// PRIMER CUATRIMESTRE: 2026-03-16 AL 2026-07-03
// SEGUNDO CUATRIMESTRE: 2026-08-18 AL 2026-12-04

// --- 3.3. ASIGNATURAS CUATRIMESTRALES - PRIMER CUATRIMESTRE ---

// INICIO: 2026-03-16
// FINALIZACION: 2026-07-03
// DURACION: 15 SEMANAS

// VENCIMIENTO INFORME REGULARIZACION 1: 2026-07-10
// VENCIMIENTO INFORME REGULARIZACION 2: 2026-08-07

// --- 3.4. ASIGNATURAS CUATRIMESTRALES - SEGUNDO CUATRIMESTRE ---

// INICIO: 2026-08-18
// FINALIZACION: 2026-12-04
// DURACION: 15 SEMANAS

// VENCIMIENTO INFORME REGULARIZACION 1: 2026-12-11
// VENCIMIENTO INFORME REGULARIZACION 2: 2027-12-18

// ------ 7. INSCRIPCIÓN Y REINSCRIPCIÓN ESTUDIANTES 2026 ------

// --- 7.1. CURSADO ANUAL Y PRIMER CUATRIMESTRE ---
// INICIO: 2026-02-23
// FINALIZACION: 2026-03-31

// --- 7.2. SEGUNDO CUATRIMESTRE ---
// INICIO: 2026-08-03
// FINALIZACION: 2026-08-21

// --- 7.3. REINSCRIPCIÓN GENERAL ---
// INICIO: 2026-04-01
// FINALIZACION: 2026-08-31

// --- 7.4. CAMBIO DE CARRERA / CAMBIO DE PLAN ---
// INICIO: 2026-03-02
// FINALIZACION: 2026-03-27

// ------ 10. FERIADOS Y ASUETOS 2026–2027 ------

// --- 10.1. FERIADOS 2026 ---
// (SUSCEPTIBLE DE CAMBIOS SEGÚN NOVEDADES OFICIALES)

// DÍA DEL VETERANO Y LOS CAÍDOS EN MALVINAS: 2026-04-02
// VIERNES SANTO: 2026-04-03
// ANIVERSARIO UNAM: 2026-04-16
// DÍA DEL TRABAJADOR: 2026-05-01
// DÍA REVOLUCIÓN DE MAYO: 2026-05-25
// DÍA DE LA INGENIERÍA: 2026-06-06
// PATRONO DE OBERÁ: 2026-06-13
// PASO A LA INMORTALIDAD GRAL. GÜEMES: 2026-06-17
// PASO A LA INMORTALIDAD GRAL. BELGRANO: 2026-06-20
// DÍA INDEPENDENCIA NACIONAL: 2026-07-09
// PASO A LA INMORTALIDAD GRAL. SAN MARTÍN: 2026-08-17
// ANIVERSARIO FACULTAD DE INGENIERÍA UNAM: 2026-08-30
// DÍA DEL RESPETO A LA DIVERSIDAD CULTURAL: 2026-10-12
// DÍA DE LA SOBERANÍA NACIONAL: 2026-11-20
// INMACULADA CONCEPCIÓN DE MARÍA: 2026-12-08
// NAVIDAD: 2026-12-25

// --- 10.2. ASUETOS ACADÉMICOS PERSONAL DOCENTE Y ESTUDIANTIL ---
// DÍA DEL PROFESOR: 2026-05-21
// DÍA DEL ESTUDIANTE: 2026-09-21

// --- 10.3. CONMEMORACIÓN (TRAGEDIA 26 DE OCTUBRE 2025) ---
// DÍA DEL ESTUDIANTE DEL INTERIOR: 2026-10-26

// --- 10.4. ASUETO ADMINISTRATIVO ---
// DÍA DEL TRABAJADOR NODOCENTE: 2026-11-26

// --- 10.5. FERIADOS 2027 ---
// CARNAVAL (A CONFIRMAR): 2027-02-08
// CARNAVAL (A CONFIRMAR): 2027-02-09
// DÍA NACIONAL DE LA MEMORIA POR LA VERDAD Y LA JUSTICIA: 2027-03-24

// ------ 11. DÍA DEL GRADUADO – UNaM ------

// FECHA: 2026-10-30

// ------ 12. SEMANA ANIVERSARIO Y JIDeTEV ------

// JIDETEV INICIO: 2026-08-25
// JIDETEV FINALIZACION: 2026-08-28
// ANIVERSARIO FI-UNAM: 2026-08-30

// ------ 13. RALLY LATINOAMERICANO DE INNOVACIÓN 2026 ------

// INICIO: 2026-10-09
// FINALIZACION: 2026-10-10

const events2026: GeneralEvent[] = [
  // --- INICIO AÑO ---
  { date: "2026-01-01", description: "Año Nuevo", type: "holiday" },
  { date: "2026-02-16", description: "Carnaval", type: "holiday" },
  { date: "2026-02-17", description: "Carnaval", type: "holiday" },

  // --- INSCRIPCIONES ---
  {
    date: "2026-02-23",
    description: "Inicio Inscripción Anual/1º Cuat",
    type: "academic",
  },
  {
    date: "2026-03-02",
    description: "Inicio Cambio de Carrera",
    type: "academic",
  },

  // --- PRIMER CUATRIMESTRE ---
  {
    date: "2026-03-16",
    description: "Inicio 1º Cuatrimestre",
    type: "academic",
  },
  { date: "2026-03-24", description: "Día de la Memoria", type: "holiday" },
  {
    date: "2026-03-27",
    description: "Fin Cambio de Carrera",
    type: "academic",
  },
  {
    date: "2026-03-31",
    description: "Fin Inscripción Anual/1º Cuat",
    type: "academic",
  },
  {
    date: "2026-04-01",
    description: "Inicio Año Académico / Reinscripción",
    type: "academic",
  },
  { date: "2026-04-02", description: "Malvinas", type: "holiday" },
  { date: "2026-04-03", description: "Viernes Santo", type: "holiday" },
  { date: "2026-04-16", description: "Aniversario UNaM", type: "special" },
  { date: "2026-05-01", description: "Día del Trabajador", type: "holiday" },
  {
    date: "2026-05-21",
    description: "Asueto Día del Profesor",
    type: "special",
  },
  { date: "2026-05-25", description: "Revolución de Mayo", type: "holiday" },
  { date: "2026-06-06", description: "Día de la Ingeniería", type: "special" },
  { date: "2026-06-13", description: "Patrono de Oberá", type: "holiday" },
  { date: "2026-06-17", description: "Gral. Güemes", type: "holiday" },
  { date: "2026-06-20", description: "Manuel Belgrano", type: "holiday" },
  { date: "2026-07-03", description: "Fin 1º Cuatrimestre", type: "academic" },

  // --- RECESO ---
  { date: "2026-07-09", description: "Independencia", type: "holiday" },
  {
    date: "2026-07-13",
    description: "Inicio Receso Invernal",
    type: "academic",
  },
  { date: "2026-07-24", description: "Fin Receso Invernal", type: "academic" },

  // --- SEGUNDO CUATRIMESTRE ---
  {
    date: "2026-08-03",
    description: "Inicio Inscripción 2º Cuat",
    type: "academic",
  },
  { date: "2026-08-17", description: "Gral. San Martín", type: "holiday" },
  {
    date: "2026-08-18",
    description: "Inicio 2º Cuatrimestre",
    type: "academic",
  },
  {
    date: "2026-08-21",
    description: "Fin Inscripción 2º Cuat",
    type: "academic",
  },
  { date: "2026-08-25", description: "Inicio JIDeTEV", type: "special" },
  { date: "2026-08-28", description: "Fin JIDeTEV", type: "special" },
  { date: "2026-08-30", description: "Aniversario FI-UNaM", type: "special" },
  {
    date: "2026-08-31",
    description: "Fin Reinscripción General",
    type: "academic",
  },
  { date: "2026-09-21", description: "Día del Estudiante", type: "special" },
  {
    date: "2026-10-09",
    description: "Inicio Rally Latinoamericano",
    type: "special",
  },
  {
    date: "2026-10-10",
    description: "Fin Rally Latinoamericano",
    type: "special",
  },
  { date: "2026-10-12", description: "Diversidad Cultural", type: "holiday" },
  {
    date: "2026-10-26",
    description: "Estudiante del Interior",
    type: "special",
  },
  { date: "2026-10-30", description: "Día del Graduado", type: "special" },
  { date: "2026-11-20", description: "Soberanía Nacional", type: "holiday" },
  { date: "2026-11-26", description: "Día Nodocente", type: "special" },
  { date: "2026-12-04", description: "Fin 2º Cuatrimestre", type: "academic" },
  { date: "2026-12-08", description: "Inmaculada Concepción", type: "holiday" },
  { date: "2026-12-25", description: "Navidad", type: "holiday" },
];

const events2027: GeneralEvent[] = [
  { date: "2027-01-01", description: "Año Nuevo", type: "holiday" },
  { date: "2027-02-08", description: "Carnaval (Est.)", type: "holiday" },
  { date: "2027-02-09", description: "Carnaval (Est.)", type: "holiday" },
];

// Unificación de todos los años
export const generalEvents: GeneralEvent[] = [
  ...events2025,
  ...events2026,
  ...events2027,
];
