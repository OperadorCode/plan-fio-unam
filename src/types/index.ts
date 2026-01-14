/**
 * --------------------------------------------------------
 * Definiciones de tipos globales para el Planificador FIO
 * Actualizado para soporte de Materias Electivas/Optativas
 * --------------------------------------------------------
 */

export const _TYPES_VERSION = "1.0.0";
export type { TabId } from "./navigation";

export type KnowledgeBlock = "CB" | "TB" | "TA" | "CC"; // Ciencias Básicas, Tecnologías Básicas, etc.

export interface Course {
  id: string;
  name: string;
  regimen: string; // "1º C.", "2º C.", "Anual"
  hours?: number | string; // Permitimos string para casos como "-" o number para horas reales

  // --- NUEVOS CAMPOS PLAN 2025 ---
  credits?: number; // Créditos RTF/SACAU
  weeklyHours?: number; // Horas Presenciales Semanales (HPS)
  totalHours?: number; // Carga Horaria Total (CHT = HPT + HAT)
  block?: KnowledgeBlock; // Bloque de conocimiento

  // Flags para títulos intermedios
  isTULOC?: boolean; // Pertenece al Técnico Univ. en Lab. de Obras Civiles (Civil)
  isBUI?: boolean; // Pertenece al Bachiller Univ. en Ingeniería (General)
  isTUGPP?: boolean; // Pertenece al Técnico Univ. en Gestión de Proc. de Producción (Industrial)
  isTUEM?: boolean; // Pertenece al Técnico Univ. en Electrotecnia y Metrología (Electromecánica)
  isTUEA?: boolean; // Pertenece al Técnico Univ. en Electrónica de Automatización (Electrónica)

  // Correlativas
  requiredRegularToCourse: string[]; // IDs de correlativas para cursar (Regularizar)
  requiredApprovedToCourse: string[]; // IDs de correlativas para cursar (Aprobadas)
  requiredApprovedToFinal: string[]; // IDs de correlativas para rendir final
  criticality?: number; // Nivel de importancia en la cadena de correlatividades

  // Transición
  equivalenceId?: string;

  /**
   * LÓGICA DE ELECTIVAS
   */
  isElectiveSlot?: boolean;
  electiveGroup?: string;
}

/**
 * Propiedades extendidas para uso en el Grafo (UI)
 */
export interface GraphCourse extends Course {
  realId?: string; // ID original de la opción seleccionada (si es optativa)
  year?: number; // Año al que pertenece (1-6)
  isSelectedOption?: boolean; // Flag para saber si es una opción elegida
}

/**
 * Representa un Plan de Estudio específico (ej: Computación 2018)
 */
export interface StudyPlan {
  id: string; // ID único del plan (ej: 'civil-2013')
  careerId: string; // ID de la carrera (ej: 'civil')
  name: string; // Nombre descriptivo (ej: 'Ingeniería Civil (Plan 2013)')
  year: number; // Año de aprobación del plan (ej: 2013)
  active: boolean; // Define si es el plan vigente por defecto
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
  color: string; // Clase de color base (ej: 'blue', 'green')
  icon: string; // Nombre del icono lucide
  availablePlans: string[]; // IDs de los planes disponibles para elegir
}

// --- BASES DE DATOS ---
export type PlansDB = Record<string, StudyPlan>;
export type CareersRegistry = Record<string, CareerMetadata>;

// --- COMPATIBILIDAD LEGACY [OLD] ---
/** @deprecated Use StudyPlan instead */
export interface CareerPlan {
  name: string;
  planYear: string;
  coursesData: Record<string, Course[]>;
}
export type CareersDB = Record<string, CareerPlan>;

// --- ESTADOS Y EVENTOS ---

export type CourseStatus = "approved" | "regular" | "pending";
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

export type EquivalenceType = "DIRECTA" | "PARCIAL";

export interface EquivalenceRule {
  targetId: string;
  targetName: string;
  sourceIds: string[];
  type: EquivalenceType;
  note?: string;
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
