/**
 * --------------------------------------------------------
 * Definiciones de tipos globales para el Planificador FIO
 * Actualizado para soporte de Materias Electivas/Optativas
 * --------------------------------------------------------
 */

export const _TYPES_VERSION = "1.0.0";

export interface Course {
  id: string;
  name: string;
  regimen: string;
  hours: number | string;   // Permitimos string para casos como "-" o number para horas reales
  cursarReg: string[];      // IDs de correlativas para cursar (Regularizar)
  cursarAprob: string[];    // IDs de correlativas para cursar (Aprobadas)
  rendirAprob: string[];    // IDs de correlativas para rendir final
  criticality?: number;     // Nivel de importancia en la cadena de correlatividades

  /**
   * ID de Equivalencia.
   * Identificador único universal de la materia (independiente del plan).
   * Conecta materias entre distintos planes (ej: Plan 99 <-> Plan 13).
   */
  equivalenceId?: string;

  /**
   * LÓGICA DE ELECTIVAS 
   */

  /**
   * Indica si esta materia es un "slot" o contenedor vacío (ej: "Electiva 1").
   * Si es true, la UI mostrará un selector en lugar de una materia fija.
   */
  isElectiveSlot?: boolean;

  /**
   * El ID del grupo de opciones que corresponden a este slot (ej: 'OPTATIVAS_COMPUTACION').
   * Se usa para buscar la lista de opciones en StudyPlan.electivesData.
   */
  electiveGroup?: string;
}

/**
 * Propiedades extendidas para uso en el Grafo (UI)
 */
export interface GraphCourse extends Course {
  realId?: string;           // ID original de la opción seleccionada (si es optativa)
  year?: number;             // Año al que pertenece (1-6)
  isSelectedOption?: boolean;// Flag para saber si es una opción elegida
}

/**
 * Representa un Plan de Estudio específico (ej: Computación 2018)
 */
export interface StudyPlan {
  id: string;        // ID único del plan (ej: 'civil-2013')
  careerId: string;  // ID de la carrera (ej: 'civil')
  name: string;      // Nombre descriptivo (ej: 'Ingeniería Civil (Plan 2013)')
  year: number;      // Año de aprobación del plan (ej: 2013)
  active: boolean;   // Define si es el plan vigente por defecto
  coursesData: Record<string, Course[]>; // Clave: Año ("1", "2"...), Valor: Lista de materias

  /**
   * POOL DE MATERIAS ELECTIVAS 
   * Diccionario con las opciones reales disponibles para elegir.
   * Clave: ID del grupo (ej: 'OPTATIVAS_COMPUTACION').
   * Valor: Lista de materias (Course[]) que el usuario puede seleccionar.
   */
  electivesData?: Record<string, Course[]>;
}

/**
 * Metadatos de la Carrera (independiente del plan).
 * Define la identidad visual y qué planes tiene disponibles.
 */
export interface CareerMetadata {
  id: string;
  name: string;
  color: string;     // Clase de color base (ej: 'blue', 'green')
  icon: string;      // Nombre del icono lucide
  availablePlans: string[]; // IDs de los planes disponibles para elegir
}

// --- BASES DE DATOS ---
export type PlansDB = Record<string, StudyPlan>;
export type CareersRegistry = Record<string, CareerMetadata>;

// --- COMPATIBILIDAD LEGACY [OLD] ---
export interface CareerPlan {
  name: string;
  planYear: string;
  coursesData: Record<string, Course[]>;
}
export type CareersDB = Record<string, CareerPlan>;

// --- ESTADOS Y EVENTOS ---

// Estados posibles de una materia para el usuario
export type CourseStatus = 'approved' | 'regular' | 'pending';

// Mapa de estados de todas las materias (ID -> Estado)
export type CourseStatusMap = Record<string, CourseStatus>;

export interface CalendarEvent {
  year: number;
  month: string;
  days: number[];
  type: string;
}

export interface ExamPeriod {
  id: string;
  name: string;
  dates: string;
  startDate: string;
  endDate: string;
}