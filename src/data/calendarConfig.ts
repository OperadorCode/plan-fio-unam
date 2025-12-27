// ================== CONFIGURACIÓN DE EVENTOS DEL CALENDARIO ==================
// Define feriados nacionales, eventos académicos y fechas especiales FI-UNaM.
// No incluye mesas de examen (ver examDates.ts para eso).

import type { GeneralEvent } from '../schemas/calendarSchemas';

/**
 * =============================================================================
 * GUÍA PARA AGREGAR UN NUEVO AÑO:
 * 1. Copiá la estructura de un año existente (ej: events2026).
 * 2. Cambiá el nombre de la variable (ej: events2027).
 * 3. Actualizá las fechas respetando el formato 'YYYY-MM-DD'.
 * 4. Agregá la nueva variable al array `generalEvents` al final del archivo.
 * =============================================================================
 */

export type EventType = 'holiday' | 'academic' | 'special' | 'exam' | 'personal';

export const EVENT_COLORS: Record<EventType, string> = {
  exam: 'bg-blue-500 text-white',      // Exámenes 
  holiday: 'bg-red-500 text-white',    // Feriados nacionales
  academic: 'bg-green-500 text-white', // Inicio/fin de clases y recesos
  special: 'bg-yellow-500 text-white', // Eventos institucionales o asuetos
  personal: 'bg-purple-500 text-white' // Notas personales del usuario
};

const events2025: GeneralEvent[] = [
  { date: '2025-03-24', description: "Día de la Memoria", type: 'holiday' },
  { date: '2025-04-02', description: "Día del Veterano", type: 'holiday' },
  { date: '2025-05-01', description: "Día del Trabajador", type: 'holiday' },
  { date: '2025-05-25', description: "Revolución de Mayo", type: 'holiday' },
  { date: '2025-06-20', description: "Día de la Bandera", type: 'holiday' },
  { date: '2025-07-09', description: "Día de la Independencia", type: 'holiday' },
  { date: '2025-08-17', description: "Gral. San Martín", type: 'holiday' },
  { date: '2025-08-25', description: "Inicio 2º Cuatrimestre", type: 'academic' },
  { date: '2025-10-13', description: "Feriado Puente", type: 'holiday' },
  { date: '2025-11-20', description: "Soberanía Nacional", type: 'holiday' },
  { date: '2025-12-08', description: "Inmaculada Concepción", type: 'holiday' },
  { date: '2025-12-25', description: "Navidad", type: 'holiday' },
];

const events2026: GeneralEvent[] = [
  // --- INICIO AÑO ---
  { date: '2026-01-01', description: "Año Nuevo", type: 'holiday' },
  { date: '2026-02-16', description: "Carnaval", type: 'holiday' },
  { date: '2026-02-17', description: "Carnaval", type: 'holiday' },

  // --- PRIMER CUATRIMESTRE ---
  { date: '2026-03-16', description: "Inicio 1º Cuatrimestre", type: 'academic' },
  { date: '2026-03-24', description: "Día de la Memoria", type: 'holiday' },
  { date: '2026-04-02', description: "Malvinas", type: 'holiday' },
  { date: '2026-04-03', description: "Viernes Santo", type: 'holiday' },
  { date: '2026-04-16', description: "Aniversario UNaM", type: 'special' },
  { date: '2026-05-01', description: "Día del Trabajador", type: 'holiday' },
  { date: '2026-05-21', description: "Asueto Día del Profesor", type: 'special' },
  { date: '2026-05-25', description: "Revolución de Mayo", type: 'holiday' },
  { date: '2026-06-06', description: "Día de la Ingeniería", type: 'special' },
  { date: '2026-06-13', description: "Patrono de Oberá", type: 'holiday' },
  { date: '2026-06-17', description: "Gral. Güemes", type: 'holiday' },
  { date: '2026-06-20', description: "Manuel Belgrano", type: 'holiday' },
  { date: '2026-07-03', description: "Fin 1º Cuatrimestre", type: 'academic' },

  // --- RECESO ---
  { date: '2026-07-09', description: "Independencia", type: 'holiday' },
  { date: '2026-07-13', description: "Inicio Receso Invernal", type: 'academic' },
  { date: '2026-07-24', description: "Fin Receso Invernal", type: 'academic' },

  // --- SEGUNDO CUATRIMESTRE ---
  { date: '2026-08-17', description: "Gral. San Martín", type: 'holiday' },
  { date: '2026-08-18', description: "Inicio 2º Cuatrimestre", type: 'academic' },
  { date: '2026-08-30', description: "Aniversario FI-UNaM", type: 'special' },
  { date: '2026-09-21', description: "Día del Estudiante", type: 'special' },
  { date: '2026-10-12', description: "Diversidad Cultural", type: 'holiday' },
  { date: '2026-10-26', description: "Estudiante del Interior", type: 'special' },
  { date: '2026-11-20', description: "Soberanía Nacional", type: 'holiday' },
  { date: '2026-11-26', description: "Día Nodocente", type: 'special' },
  { date: '2026-12-04', description: "Fin 2º Cuatrimestre", type: 'academic' },
  { date: '2026-12-08', description: "Inmaculada Concepción", type: 'holiday' },
  { date: '2026-12-25', description: "Navidad", type: 'holiday' },
];

const events2027: GeneralEvent[] = [
  { date: '2027-01-01', description: "Año Nuevo", type: 'holiday' },
  { date: '2027-02-08', description: "Carnaval (Est.)", type: 'holiday' },
  { date: '2027-02-09', description: "Carnaval (Est.)", type: 'holiday' },
];

// Unificación de todos los años
export const generalEvents: GeneralEvent[] = [
  ...events2025,
  ...events2026,
  ...events2027
];
