export interface EquivalenceRule {
  targetId: string; // ID de la materia en el Plan 2025 (Nuevo)
  targetName: string; // Nombre referencia Plan 2025
  sourceIds: string[]; // IDs de las materias necesarias del Plan 2013 (Viejo)
  type: "DIRECTA" | "PARCIAL";
  note?: string;
}

/**
 * Tabla de Equivalencias entre Plan 2013 y Plan 2025 (Ingeniería Industrial)
 */
export const industrialEquivalencias: EquivalenceRule[] = [
  // --- PRIMER AÑO ---
  {
    targetId: "IN0111",
    targetName: "Álgebra 1",
    sourceIds: ["IN111"], // Álgebra y Geometría Analítica
    type: "DIRECTA",
  },
  {
    targetId: "IN0112",
    targetName: "Cálculo Diferencial",
    sourceIds: ["IN112"], // Cálculo 1
    type: "DIRECTA",
  },
  {
    targetId: "IN0113",
    targetName: "Sistemas de Representación Gráfica",
    sourceIds: ["IN131"], // Sistemas de Representación Gráfica
    type: "DIRECTA",
  },
  {
    targetId: "IN0114",
    targetName: "Introducción a la Ingeniería",
    sourceIds: ["IN161", "IN261"], // Ingeniería y Sociedad / Ingeniería e Industrias
    type: "DIRECTA",
    note: "Se integran contenidos de ambas asignaturas para cubrir la introducción.",
  },
  {
    targetId: "IN0121",
    targetName: "Álgebra 2",
    sourceIds: ["IN111"], // Álgebra y Geometría Analítica
    type: "DIRECTA",
  },
  {
    targetId: "IN0122",
    targetName: "Cálculo Integral",
    sourceIds: ["IN112"], // Cálculo 1
    type: "DIRECTA",
  },
  {
    targetId: "IN0123",
    targetName: "Física 1",
    sourceIds: ["IN121"], // Física 1
    type: "DIRECTA",
  },
  {
    targetId: "IN0124",
    targetName: "Química",
    sourceIds: ["IN122"], // Química General
    type: "DIRECTA",
  },

  // --- SEGUNDO AÑO ---
  {
    targetId: "IN0211",
    targetName: "Cálculo Multivariable",
    sourceIds: ["IN211"], // Cálculo 2
    type: "DIRECTA",
  },
  {
    targetId: "IN0212",
    targetName: "Física 2",
    sourceIds: ["IN221"], // Física 2
    type: "DIRECTA",
  },
  {
    targetId: "IN0213",
    targetName: "Probabilidad y Estadística",
    sourceIds: ["IN213"], // Probabilidad y Estadística
    type: "DIRECTA",
  },
  {
    targetId: "IN0214",
    targetName: "Inglés 1",
    sourceIds: ["IN363"], // Inglés 1
    type: "DIRECTA",
  },
  {
    targetId: "IN0221",
    targetName: "Estática y Resistencia de Materiales",
    sourceIds: ["IN253"], // Estática y Resistencia de Materiales (Plan 2013)
    type: "DIRECTA",
  },
  {
    targetId: "IN0222",
    targetName: "Inglés 2",
    sourceIds: ["IN469"], // Inglés 2
    type: "DIRECTA",
  },
  {
    targetId: "IN0223",
    targetName: "Matemática Aplicada",
    sourceIds: ["IN212"], // Matemática Aplicada
    type: "DIRECTA",
  },
  {
    targetId: "IN0224",
    targetName: "Termodinámica",
    sourceIds: ["IN231"], // Termodinámica
    type: "DIRECTA",
  },

  // --- TERCER AÑO ---
  {
    targetId: "IN0313", // Asumiendo ID por secuencia
    targetName: "Informática",
    sourceIds: ["IN241"], // Informática
    type: "DIRECTA",
  },
  {
    targetId: "IN0314",
    targetName: "Instalaciones Industriales",
    sourceIds: ["IN539"], // Construcciones e Instalaciones Industriales
    type: "DIRECTA",
  },
  {
    targetId: "IN0321",
    targetName: "Desarrollo de Producto",
    sourceIds: ["IN567"], // Desarrollo de Producto
    type: "DIRECTA",
  },

  // --- CUARTO Y QUINTO AÑO (CICLO SUPERIOR) ---
  {
    targetId: "IN0411", // Asumiendo ID estándar para esta materia en 4to año
    targetName: "Economía y Organización de la Producción",
    sourceIds: ["IN458"], // Economía General / Org. Prod.
    type: "DIRECTA",
  },
  {
    targetId: "IN0513",
    targetName: "Gestión Tecnológica e Innovación",
    sourceIds: ["IN562"], // Ingeniería Industrial I
    type: "DIRECTA",
  },
  {
    targetId: "IN0514", // ID inferido para evitar colisión con IN0513
    targetName: "Planificación y Control de la Producción 2",
    sourceIds: ["IN561"], // Planificación y Control de la Producción 2
    type: "DIRECTA",
  },
  {
    targetId: "IN0522",
    targetName: "Formulación y Evaluación de Proyectos",
    sourceIds: ["IN467", "IN569"], // Planes de Negocios y Marketing + Proyecto Final
    type: "DIRECTA",
  },
  {
    targetId: "IN0523",
    targetName: "Ingeniería de Calidad",
    sourceIds: ["IN565"], // Ingeniería de Calidad
    type: "DIRECTA",
  },
  {
    targetId: "IN0524",
    targetName: "Sistemas Informáticos Industriales",
    sourceIds: ["IN366"], // Sistemas Informáticos Industriales
    type: "DIRECTA",
  },

  // --- TRAYECTO FINAL ---
  {
    targetId: "IN0500", // ID genérico para Trabajo Final / PPS
    targetName: "Trabajo Final de Graduación / PPS",
    sourceIds: ["PPS"], // Práctica Profesional Supervisada
    type: "PARCIAL",
    note: "Requiere cumplimiento de requisitos específicos del nuevo plan.",
  },
  {
    targetId: "OP",
    targetName: "Optativas",
    sourceIds: [],
    type: "PARCIAL",
    note: "Sin equivalencia directa (ver reconocimiento por créditos).",
  },
];
