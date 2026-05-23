import type { EquivalenceRule } from "../../../types";

/**
 * Tabla de Equivalencias entre Plan 2013 (Res. C.S. N°076/12) y Plan 2025
 * Fuente: ANEXO RESOLUCIÓN CS Nº 070/2025 - TABLA 3
 */
export const civilEquivalencias: EquivalenceRule[] = [
  // --- PRIMER AÑO ---
  {
    targetId: "CI0111",
    targetName: "Álgebra 1",
    sourceIds: ["CI111"], // Álgebra y Geometría Analítica
    type: "DIRECTA",
  },
  {
    targetId: "CI0112",
    targetName: "Cálculo Diferencial",
    sourceIds: ["CI112"], // Cálculo 1
    type: "DIRECTA",
  },
  {
    targetId: "CI0113",
    targetName: "Sistemas de Representación Gráfica",
    sourceIds: ["CI131"], // Sistemas de Representación Gráfica
    type: "DIRECTA",
  },
  {
    targetId: "CI0114",
    targetName: "Introducción a la Ingeniería Civil",
    sourceIds: ["CI161"], // Ingeniería y Sociedad
    type: "PARCIAL",
  },
  {
    targetId: "CI0121",
    targetName: "Álgebra 2",
    sourceIds: ["CI111"], // Álgebra y Geometría Analítica
    type: "DIRECTA",
  },
  {
    targetId: "CI0122",
    targetName: "Cálculo Integral",
    sourceIds: ["CI112"], // Cálculo 1
    type: "DIRECTA",
  },
  {
    targetId: "CI0123",
    targetName: "Física 1",
    sourceIds: ["CI121"], // Física I
    type: "DIRECTA",
  },
  {
    targetId: "CI0124",
    targetName: "Química",
    sourceIds: ["CI122"], // Química
    type: "DIRECTA",
  },
  {
    targetId: "CI0125",
    targetName: "Ingeniería Civil y Producción",
    sourceIds: ["CI261"], // Ingeniería e Industrias
    type: "PARCIAL",
  },

  // --- SEGUNDO AÑO ---
  {
    targetId: "CI0211",
    targetName: "Cálculo Multivariable",
    sourceIds: ["CI211"], // Cálculo 2
    type: "DIRECTA",
  },
  {
    targetId: "CI0212",
    targetName: "Física 2",
    sourceIds: ["CI221"], // Física 2
    type: "DIRECTA",
  },
  {
    targetId: "CI0213",
    targetName: "Probabilidad y Estadística",
    sourceIds: ["CI213"], // Probabilidad y Estadística 1
    type: "DIRECTA",
  },
  {
    targetId: "CI0214",
    targetName: "Estática",
    sourceIds: ["CI251"], // Estática
    type: "DIRECTA",
  },
  {
    targetId: "CI0215",
    targetName: "Representación y Modelación en Ing. Civil",
    sourceIds: ["CI352"], // Topografía
    type: "PARCIAL",
  },
  {
    targetId: "CI0221",
    targetName: "Informática",
    sourceIds: ["CI241"], // Informática
    type: "DIRECTA",
  },
  {
    targetId: "CI0222",
    targetName: "Ingeniería Geológica y Geotécnica",
    sourceIds: ["CI351"], // Mecánica de los Suelos
    type: "PARCIAL",
  },
  {
    targetId: "CI0223",
    targetName: "Mecánica Aplicada",
    sourceIds: ["CI212", "CI222"], // Matemática Aplicada AND Mecánica Racional
    type: "DIRECTA",
    note: "Requiere ambas asignaturas del Plan 2013",
  },
  {
    targetId: "CI0224",
    targetName: "Resistencia de Materiales",
    sourceIds: ["CI252"], // Resistencia de Materiales
    type: "DIRECTA",
  },
  {
    targetId: "CI0225",
    targetName: "Tecnología de los Materiales",
    sourceIds: ["CI355"], // Ciencias de los Materiales
    type: "DIRECTA",
  },

  // --- TERCER AÑO ---
  {
    targetId: "CI0311",
    targetName: "Idioma",
    sourceIds: ["CI365"], // Inglés 1
    type: "DIRECTA",
  },
  {
    targetId: "CI0312",
    targetName: "Mecánica de los Fluidos y Máquinas",
    sourceIds: ["CI332"], // Mecánica de los Fluidos y Máquinas
    type: "DIRECTA",
  },
  {
    targetId: "CI0313",
    targetName: "Mecánica de Suelos y Rocas",
    sourceIds: ["CI351"], // Mecánica de los Suelos
    type: "DIRECTA",
  },
  {
    targetId: "CI0314",
    targetName: "Teoría de la Elasticidad",
    sourceIds: ["CI254"], // Teoría de la Elasticidad
    type: "DIRECTA",
  },
  {
    targetId: "CI0315",
    targetName: "Topografía",
    sourceIds: ["CI352"], // Topografía
    type: "DIRECTA",
  },
  {
    targetId: "CI0321",
    targetName: "Análisis Estructural",
    sourceIds: ["CI354"], // Estructuras
    type: "DIRECTA",
  },
  {
    targetId: "CI0322",
    targetName: "Caminos 1",
    sourceIds: ["CI353"], // Caminos 1
    type: "DIRECTA",
  },
  {
    targetId: "CI0323",
    targetName: "Hidrología",
    sourceIds: ["CI356"], // Hidrología
    type: "DIRECTA",
  },
  {
    targetId: "CI0324",
    targetName: "Instalaciones de Edificios",
    sourceIds: ["CI454"], // Instalaciones de Edificios
    type: "DIRECTA",
  },
  {
    targetId: "CI0325",
    targetName: "Tecnología del Hormigón y el Asfalto",
    sourceIds: ["CI355", "CI451"], // Ciencias de los Materiales AND Caminos 2
    type: "DIRECTA",
    note: "Requiere Ciencias de los Materiales y Caminos 2 (CI451)",
  },

  // --- CUARTO AÑO ---
  {
    targetId: "CI0411",
    targetName: "Caminos 2",
    sourceIds: ["CI451"], // Caminos 2
    type: "DIRECTA",
  },
  {
    targetId: "CI0412",
    targetName: "Construcciones Civiles",
    sourceIds: ["CI455"], // Construcciones de Edificios
    type: "PARCIAL",
  },
  {
    targetId: "CI0413",
    targetName: "Hidráulica Aplicada",
    sourceIds: ["CI453"], // Hidráulica Aplicada
    type: "DIRECTA",
  },
  {
    targetId: "CI0414",
    targetName: "Hormigón Armado",
    sourceIds: ["CI452"], // Hormigón Armado
    type: "DIRECTA",
  },
  {
    targetId: "CI0415",
    targetName: "Instalaciones Complementarias",
    sourceIds: ["CI458"], // Instalaciones Complementarias
    type: "DIRECTA",
  },
  {
    targetId: "CI0421",
    targetName: "Construcciones de Madera",
    sourceIds: ["CI552"], // Construcciones Metálicas y de Madera
    type: "DIRECTA",
  },
  {
    targetId: "CI0422",
    targetName: "Estructuras de Hormigón",
    sourceIds: ["CI456"], // Estructuras de Hormigón Armado y Pretensado
    type: "DIRECTA",
  },
  {
    targetId: "CI0423",
    targetName: "Fundaciones y Geotecnia Aplicada",
    sourceIds: ["CI555"], // Fundaciones
    type: "DIRECTA",
  },
  {
    targetId: "CI0424",
    targetName: "Ingeniería del Transporte",
    sourceIds: ["CI553"], // Ingeniería del Transporte (Corregido de C1353 que era caminos 1)
    type: "DIRECTA",
  },
  {
    targetId: "CI0425",
    targetName: "Obras Hidráulicas",
    sourceIds: ["CI457"], // Obras Hidráulicas
    type: "DIRECTA",
  },

  // --- QUINTO AÑO ---
  {
    targetId: "CI0511",
    targetName: "Legislación y Ejercicio Profesional",
    sourceIds: ["CI462"], // Legislación y Ejercicio Profesional
    type: "DIRECTA",
  },
  {
    targetId: "CI0512",
    targetName: "Organización Empresarial",
    sourceIds: ["CI465"], // Dirección de Empresas y Control de Gestión
    type: "DIRECTA",
  },
  {
    targetId: "CI0513",
    targetName: "Construcciones Metálicas",
    sourceIds: ["CI552"], // Construcciones Metálicas y de Madera
    type: "DIRECTA",
  },
  {
    targetId: "CI0514",
    targetName: "Diseño Arquitectónico y Estructural",
    sourceIds: ["CI554"], // Diseño Arquitectónico y Estructural
    type: "DIRECTA",
  },
  {
    targetId: "CI0515",
    targetName: "Ingeniería Sanitaria",
    sourceIds: ["CI556"], // Ingeniería Sanitaria
    type: "DIRECTA",
  },
  {
    targetId: "CI0521",
    targetName: "Higiene, Seguridad y Medio Ambiente",
    sourceIds: ["CI466"], // Higiene, Seguridad y Medio Ambiente
    type: "DIRECTA",
  },
  {
    targetId: "CI0522",
    targetName: "Organización de Obras",
    sourceIds: ["CI551"], // Organización de Obras
    type: "DIRECTA",
  },
  {
    targetId: "CI0523",
    targetName: "Planeamiento Territorial",
    sourceIds: ["CI557"], // Planeamiento Territorial
    type: "DIRECTA",
  },
  {
    targetId: "CI0524",
    targetName: "Proyecto de Ingeniería",
    sourceIds: ["CI558"], // Proyecto de Ingeniería
    type: "DIRECTA",
  },
  {
    targetId: "PPS001",
    targetName: "Práctica Profesional Supervisada",
    sourceIds: ["PPS"], // Práctica Profesional Supervisada (No existe en plan 2013 pero se deja como referencia)
    type: "DIRECTA",
  },
];
