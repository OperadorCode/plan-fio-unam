export interface EquivalenceRule {
  targetId: string; // ID de la materia en el Plan 2025 (Nuevo)
  targetName: string; // Nombre referencia Plan 2025
  sourceIds: string[]; // IDs de las materias necesarias del Plan 2013 (Viejo)
  type: "DIRECTA" | "PARCIAL";
  note?: string; 
}

/**
 * Tabla de Equivalencias entre Plan 2013 (Res. C.S. N°075/12) y Plan 2025
 * Fuente: ANEXO RESOLUCIÓN CS Nº 073/2025 - TABLA 3
 */
export const electronicaEquivalencias: EquivalenceRule[] = [
  // --- PRIMER AÑO ---
  {
    targetId: "ET0111",
    targetName: "Álgebra 1",
    sourceIds: ["ET111"], // Álgebra y Geometría Analítica
    type: "DIRECTA",
  },
  {
    targetId: "ET0112",
    targetName: "Cálculo Diferencial",
    sourceIds: ["ET112"], // Cálculo 1
    type: "DIRECTA",
  },
  {
    targetId: "ET0113",
    targetName: "Sistemas de Representación Gráfica",
    sourceIds: ["ET131"], // Sistemas de Representación Gráfica
    type: "DIRECTA",
  },
  {
    targetId: "ET0114",
    targetName: "Prototipos Electrónicos",
    sourceIds: ["ET242"], // Tecnología Electrónica
    type: "DIRECTA",
  },
  {
    targetId: "ET0121",
    targetName: "Álgebra 2",
    sourceIds: ["ET111"], // Álgebra y Geometría Analítica
    type: "DIRECTA",
  },
  {
    targetId: "ET0122",
    targetName: "Cálculo Integral",
    sourceIds: ["ET112"], // Cálculo 1
    type: "DIRECTA",
  },
  {
    targetId: "ET0123",
    targetName: "Física 1",
    sourceIds: ["ET121"], // Física 1
    type: "DIRECTA",
  },
  {
    targetId: "ET0124",
    targetName: "Química",
    sourceIds: ["ET122"], // Química
    type: "DIRECTA",
  },

  // --- SEGUNDO AÑO ---
  {
    targetId: "ET0211",
    targetName: "Cálculo Multivariable",
    sourceIds: ["ET211"], // Cálculo 2
    type: "DIRECTA",
  },
  {
    targetId: "ET0212",
    targetName: "Física 2",
    sourceIds: ["ET221"], // Física 2
    type: "DIRECTA",
  },
  {
    targetId: "ET0213",
    targetName: "Probabilidad y Estadística",
    sourceIds: ["ET213"], // Probabilidad y Estadística 1
    type: "DIRECTA",
  },
  {
    targetId: "ET0214",
    targetName: "Inglés 1",
    sourceIds: ["ET365"], // Inglés 1
    type: "DIRECTA",
  },
  {
    targetId: "ET0215",
    targetName: "Automatismos 1",
    sourceIds: ["ET344"], // Computación (Otorga ET0215 y ET0312)
    type: "DIRECTA",
  },
  {
    targetId: "ET0221",
    targetName: "Informática",
    sourceIds: ["ET241"], // Informática
    type: "DIRECTA",
  },
  {
    targetId: "ET0222",
    targetName: "Matemática Aplicada",
    sourceIds: ["ET212"], // Matemática Aplicada
    type: "DIRECTA",
  },
  {
    targetId: "ET0223",
    targetName: "Materiales y Dispositivos Electrónicos",
    sourceIds: ["ET345"], // Dispositivos Electrónicos
    type: "DIRECTA",
  },
  {
    targetId: "ET0224",
    targetName: "Física 3",
    sourceIds: ["ET243"], // Física 3
    type: "DIRECTA",
  },
  {
    targetId: "ET0225",
    targetName: "Automatismos 2",
    sourceIds: ["ET545"], // Instrum. y Automatismos Ind. (Otorga ET0225 y ET0524)
    type: "DIRECTA",
  },

  // --- TERCER AÑO ---
  {
    targetId: "ET0311",
    targetName: "Señales y Sistemas",
    sourceIds: ["ET343"], // Señales y Sistemas
    type: "DIRECTA",
  },
  {
    targetId: "ET0312",
    targetName: "Computación",
    sourceIds: ["ET344"], // Computación
    type: "DIRECTA",
  },
  {
    targetId: "ET0313",
    targetName: "Instalaciones Eléctricas",
    sourceIds: ["ET339"], // Máquinas e Instalaciones Eléctricas (Otorga ET0313 y ET0415)
    type: "DIRECTA",
  },
  {
    targetId: "ET0314",
    targetName: "Electrónica Analógica 1",
    sourceIds: ["ET347"], // Electrónica Analógica (Otorga ET0314 y ET0323)
    type: "DIRECTA",
  },
  {
    targetId: "ET0321",
    targetName: "Higiene, Seguridad y Medio Ambiente",
    sourceIds: ["ET466"], // Higiene, Seguridad y Medio Ambiente
    type: "DIRECTA",
  },
  {
    targetId: "ET0322",
    targetName: "Análisis de Circuitos",
    sourceIds: ["ET342"], // Análisis de Circuitos
    type: "DIRECTA",
  },
  {
    targetId: "ET0323",
    targetName: "Electrónica Analógica 2",
    sourceIds: ["ET347"], // Electrónica Analógica
    type: "DIRECTA",
  },
  {
    targetId: "ET0324",
    targetName: "Propagación y Antenas",
    sourceIds: ["ET444"], // Propagación y Antenas
    type: "DIRECTA",
  },

  // --- CUARTO AÑO ---
  {
    targetId: "ET0411",
    targetName: "Economía y Organización de la Producción",
    sourceIds: ["ET458"], // Economía y Organización de la Producción
    type: "DIRECTA",
  },
  {
    targetId: "ET0412",
    targetName: "Comunicaciones 1",
    sourceIds: ["ET542"], // Comunicaciones 1
    type: "DIRECTA",
  },
  {
    targetId: "ET0413",
    targetName: "Sistemas Digitales",
    sourceIds: ["ET442"], // Técnicas Digitales 1
    type: "DIRECTA",
  },
  {
    targetId: "ET0414",
    targetName: "Organización Empresarial",
    sourceIds: ["ET468"], // Economía y Organización de la Producción (Ojo: Diferente código que ET0411)
    type: "DIRECTA",
  },
  {
    targetId: "ET0415",
    targetName: "Máquinas Eléctricas",
    sourceIds: ["ET339"], // Máquinas e Instalaciones Eléctricas
    type: "DIRECTA",
  },
  {
    targetId: "ET0421",
    targetName: "Sistemas Embebidos",
    sourceIds: ["ET446"], // Técnicas Digitales 2
    type: "DIRECTA",
  },
  {
    targetId: "ET0422",
    targetName: "Sistemas de Control 1",
    sourceIds: ["ET443"], // Sistemas de Control 1
    type: "DIRECTA",
  },
  {
    targetId: "ET0423",
    targetName: "Mediciones Electrónicas",
    sourceIds: ["ET441"], // Mediciones Electrónicas
    type: "DIRECTA",
  },
  {
    targetId: "ET0424",
    targetName: "Electrónica de Potencia",
    sourceIds: ["ET541"], // Electrónica de Potencia
    type: "DIRECTA",
  },

  // --- QUINTO AÑO ---
  {
    targetId: "ET0511",
    targetName: "Procesamiento Digital de Señales",
    sourceIds: ["ET543"], // Procesamiento de Señales
    type: "DIRECTA",
  },
  {
    targetId: "ET0512",
    targetName: "Sistemas de Control 2",
    sourceIds: ["ET445"], // Sistemas de Control 2
    type: "DIRECTA",
  },
  {
    targetId: "ET0513",
    targetName: "Gestión de Proyectos",
    sourceIds: ["ET546"], // Proyecto y Diseño Electrónico (Otorga ET0513 y ET0522)
    type: "DIRECTA",
  },
  {
    targetId: "ET0521",
    targetName: "Legislación y Ejercicio Profesional",
    sourceIds: ["ET462"], // Legislación y Ejercicio Profesional
    type: "DIRECTA",
  },
  {
    targetId: "ET0522",
    targetName: "Proyecto Integrador",
    sourceIds: ["ET546"], // Proyecto y Diseño Electrónico
    type: "DIRECTA",
  },
  {
    targetId: "ET0523",
    targetName: "Comunicaciones 2",
    sourceIds: ["ET544"], // Comunicaciones 2
    type: "DIRECTA",
  },
  {
    targetId: "ET0524",
    targetName: "Instrumentación y Automatismos Industriales",
    sourceIds: ["ET545"], // Instrumentación y Automatismos Industriales
    type: "DIRECTA",
  },

  // --- OPTATIVA Y PPS ---
  {
    targetId: "OP",
    targetName: "Optativa",
    sourceIds: ["ET161", "ET261"], // Ing. y Sociedad / Ing. e Industrias
    type: "DIRECTA",
    note: "Se reconocen estas asignaturas del Plan 2013 para satisfacer horas de Optativa.",
  },
  {
    targetId: "PPS",
    targetName: "Práctica Profesional Supervisada",
    sourceIds: ["PPS"], // PPS
    type: "DIRECTA",
  },
];
