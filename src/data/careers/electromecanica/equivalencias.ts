import type { EquivalenceRule } from "../../../types";

/**
 * Tabla de Equivalencias entre Plan 2013 (Res. C.S. N°073/12) y Plan 2025
 * Fuente: ANEXO RESOLUCIÓN CS Nº 079/2025 - TABLA 3
 */
export const electromecanicaEquivalencias: EquivalenceRule[] = [
  // --- PRIMER AÑO ---
  {
    targetId: "EM0111",
    targetName: "Álgebra 1",
    sourceIds: ["EM111"], // Álgebra y Geometría Analítica
    type: "DIRECTA",
  },
  {
    targetId: "EM0112",
    targetName: "Cálculo Diferencial",
    sourceIds: ["EM112"], // Cálculo 1
    type: "DIRECTA",
  },
  {
    targetId: "EM0113",
    targetName: "Inglés 1",
    sourceIds: ["EM363"], // Inglés 1
    type: "DIRECTA",
  },
  {
    targetId: "EM0114",
    targetName: "Introducción a la Ingeniería",
    sourceIds: ["EM161", "EM261"], // Ingeniería y Sociedad / Ingeniería e Industrias
    type: "DIRECTA",
  },
  {
    targetId: "EM0121",
    targetName: "Álgebra 2",
    sourceIds: ["EM111"], // Álgebra y Geometría Analítica
    type: "DIRECTA",
  },
  {
    targetId: "EM0122",
    targetName: "Cálculo Integral",
    sourceIds: ["EM112"], // Cálculo 1
    type: "DIRECTA",
  },
  {
    targetId: "EM0123",
    targetName: "Física 1",
    sourceIds: ["EM121"], // Física 1
    type: "DIRECTA",
  },
  {
    targetId: "EM0124",
    targetName: "Sistemas de Representación Gráfica",
    sourceIds: ["EM131"], // Sistemas de Representación Gráfica
    type: "DIRECTA",
  },

  // --- SEGUNDO AÑO ---
  {
    targetId: "EM0211",
    targetName: "Cálculo Multivariable",
    sourceIds: ["EM211"], // Cálculo 2
    type: "DIRECTA",
  },
  {
    targetId: "EM0212",
    targetName: "Física 2",
    sourceIds: ["EM221"], // Física 2
    type: "DIRECTA",
  },
  {
    targetId: "EM0213",
    targetName: "Probabilidad y Estadística",
    sourceIds: ["EM213"], // Probabilidad y Estadística 1
    type: "DIRECTA",
  },
  {
    targetId: "EM0214",
    targetName: "Química",
    sourceIds: ["EM122"], // Química
    type: "DIRECTA",
  },
  {
    targetId: "EM0221",
    targetName: "Estática y Resistencia de Materiales",
    sourceIds: ["EM253"], // Estática y Resistencia de Materiales
    type: "DIRECTA",
  },
  {
    targetId: "EM0222",
    targetName: "Inglés 2",
    sourceIds: ["EM469"], // Inglés 2
    type: "DIRECTA",
  },
  {
    targetId: "EM0223",
    targetName: "Matemática Aplicada",
    sourceIds: ["EM212"], // Matemática Aplicada
    type: "DIRECTA",
  },
  {
    targetId: "EM0224",
    targetName: "Termodinámica",
    sourceIds: ["EM231"], // Termodinámica
    type: "DIRECTA",
  },
  {
    targetId: "EM0225",
    targetName: "Mecánica Racional",
    sourceIds: ["EM222"], // Mecánica Racional
    type: "DIRECTA",
  },

  // --- TERCER AÑO ---
  {
    targetId: "EM0311",
    targetName: "Diseño Aplicado",
    sourceIds: ["EM333"], // Diseño Aplicado
    type: "DIRECTA",
  },
  {
    targetId: "EM0312",
    targetName: "Electrónica y Control",
    sourceIds: ["EM341"], // Electrónica
    type: "PARCIAL", // Indicado explícitamente como PARCIAL en la tabla
  },
  {
    targetId: "EM0313",
    targetName: "Informática",
    sourceIds: ["EM241"], // Informática
    type: "DIRECTA",
  },
  {
    targetId: "EM0314",
    targetName: "Mecánica de los Fluidos y Máquinas",
    sourceIds: ["EM332"], // Mecánica de Fluidos y Máquinas
    type: "DIRECTA",
  },
  {
    targetId: "EM0315",
    targetName: "Electrotecnia",
    sourceIds: ["EM331"], // Electrotecnia
    type: "DIRECTA",
  },
  {
    targetId: "EM0321",
    targetName: "Ciencia de los Materiales",
    sourceIds: ["EM335"], // Ciencia de los Materiales A
    type: "DIRECTA",
  },
  {
    targetId: "EM0322",
    targetName: "Higiene, Seguridad y Medio Ambiente",
    sourceIds: ["EM466"], // Higiene, Seguridad y Medio Ambiente
    type: "DIRECTA",
  },
  {
    targetId: "EM0323",
    targetName: "Máquinas Eléctricas",
    sourceIds: ["EM337"], // Máquinas Eléctricas
    type: "DIRECTA",
  },
  {
    targetId: "EM0324",
    targetName: "Mediciones y Metrología",
    sourceIds: ["EM336"], // Mediciones y Metrología
    type: "DIRECTA",
  },

  // --- CUARTO AÑO ---
  {
    targetId: "EM0411",
    targetName: "Economía y Organización de la Producción",
    sourceIds: ["EM468"], // Economía y Organización de la Producción
    type: "DIRECTA",
  },
  {
    targetId: "EM0412",
    targetName: "Instalaciones Eléctricas",
    sourceIds: ["EM534"], // Instalaciones Eléctricas
    type: "DIRECTA",
  },
  {
    targetId: "EM0413",
    targetName: "Instalaciones Hidráulicas y Neumáticas",
    sourceIds: ["EM536"], // Instalaciones Hidráulicas y Neumáticas
    type: "DIRECTA",
  },
  {
    targetId: "EM0414",
    targetName: "Máquinas e Instalaciones Térmicas 1",
    sourceIds: ["EM334"], // Máquinas e Instalaciones Térmicas 1
    type: "DIRECTA",
  },
  {
    targetId: "EM0415",
    targetName: "Tecnología de los Procesos de Producción 1",
    sourceIds: ["EM433"], // Tecnología de los Procesos de Producción
    type: "DIRECTA",
  },
  {
    targetId: "EM0421",
    targetName: "Centrales de Energía",
    sourceIds: ["EM438"], // Centrales de Energía
    type: "DIRECTA",
  },
  {
    targetId: "EM0422",
    targetName: "Elementos de Máquinas",
    sourceIds: ["EM431"], // Elementos de Máquinas
    type: "DIRECTA",
  },
  {
    targetId: "EM0423",
    targetName: "Sistemas de Control",
    sourceIds: ["EM525"], // Sistemas de Control
    type: "DIRECTA",
  },
  {
    targetId: "EM0424",
    targetName: "Tecnología de los Procesos de Producción 2",
    sourceIds: ["EM437"], // Tecnología de los Procesos de Producción
    type: "DIRECTA",
  },
  {
    targetId: "EM0425",
    targetName: "Transmisión y Distribución de la Energía Eléctrica",
    sourceIds: ["EM537"], // Transmisión y Distribución de la Energía Eléctrica
    type: "DIRECTA",
  },

  // --- QUINTO AÑO ---
  {
    targetId: "EM0511",
    targetName: "Legislación y Ejercicio Profesional",
    sourceIds: ["EM462"], // Legislación y Ejercicio Profesional
    type: "DIRECTA",
  },
  {
    targetId: "EM0512",
    targetName: "Equipamiento Eléctrico de Centrales",
    sourceIds: ["EM532"], // Equipamiento Eléctrico de Centrales
    type: "DIRECTA",
  },
  {
    targetId: "EM0513",
    targetName: "Máquinas e Instalaciones Térmicas 2",
    sourceIds: ["EM432"], // Máquinas e Instalaciones Térmicas 2
    type: "DIRECTA",
  },
  {
    targetId: "EM0514",
    targetName: "Mecanismos y Elementos de Máquinas",
    sourceIds: ["EM434"], // Mecanismos y Elementos de Máquinas
    type: "DIRECTA",
  },
  {
    targetId: "EM0515",
    targetName: "Proyecto Integrador",
    sourceIds: ["EM439", "EM533"], // Proyecto Electromecánico 1 y 2
    type: "DIRECTA",
  },
  {
    targetId: "EM0521",
    targetName: "Mantenimiento",
    sourceIds: ["EM531"], // Mantenimiento
    type: "DIRECTA",
  },
  {
    targetId: "EM0522",
    targetName: "Máquinas e Instalaciones Térmicas 3",
    sourceIds: ["EM436"], // Climatización y Frío Industrial
    type: "DIRECTA",
  },
  {
    targetId: "EM0523",
    targetName: "Sistemas Eléctricos de Potencia",
    sourceIds: ["EM535"], // Sistemas Eléctricos de Potencia
    type: "DIRECTA",
  },

  // --- OPTATIVA Y PPS ---
  {
    targetId: "OP",
    targetName: "Optativa",
    sourceIds: [], // Sin equivalencia directa en la tabla
    type: "PARCIAL",
    note: "Sin equivalencia directa establecida en tabla. Se reconocerán créditos por transición.",
  },
  {
    targetId: "PPS",
    targetName: "Práctica Profesional Supervisada",
    sourceIds: ["PPS"], // Práctica Profesional Supervisada
    type: "DIRECTA",
  },
];
