import type { StudyPlan } from '../../../types';

export const civil2013: StudyPlan = {
  id: 'civil-2013',
  careerId: 'civil',
  name: 'Ingeniería Civil',
  year: 2013,
  active: true,
  coursesData: {
    "1": [
      { id: "CI111", name: "Álgebra y Geometría Analítica", regimen: "Anual", hours: 160, cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 5 },
      { id: "CI112", name: "Cálculo 1", regimen: "Anual", hours: 165, cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 6 },
      { id: "CI121", name: "Física 1", regimen: "Anual", hours: 165, cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 4 },
      { id: "CI122", name: "Química", regimen: "Anual", hours: 90, cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "CI131", name: "Sistemas de Representación Gráfica", regimen: "Anual", hours: 75, cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 2 },
      { id: "CI161", name: "Ingeniería y Sociedad", regimen: "Anual", hours: 60, cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 }
    ],
    "2": [
      { id: "CI211", name: "Cálculo 2", regimen: "1º C.", hours: 120, cursarReg: ["CI111", "CI112", "CI121"], cursarAprob: [], rendirAprob: ["CI111", "CI112", "CI121"], criticality: 3 },
      { id: "CI221", name: "Física 2", regimen: "1º C.", hours: 120, cursarReg: ["CI111", "CI112", "CI121"], cursarAprob: [], rendirAprob: ["CI111", "CI112", "CI121"], criticality: 1 },
      { id: "CI251", name: "Estática", regimen: "1º C.", hours: 90, cursarReg: ["CI111", "CI112", "CI121"], cursarAprob: [], rendirAprob: ["CI111", "CI112", "CI121"], criticality: 1 },
      { id: "CI241", name: "Informática", regimen: "1º C.", hours: 75, cursarReg: ["CI111", "CI112"], cursarAprob: [], rendirAprob: ["CI111", "CI112"], criticality: 0 },
      { id: "CI212", name: "Matemática Aplicada", regimen: "2º C.", hours: 90, cursarReg: ["CI211", "CI221"], cursarAprob: ["CI111", "CI112"], rendirAprob: ["CI111", "CI112", "CI211", "CI221"], criticality: 1 },
      { id: "CI222", name: "Mecánica Racional", regimen: "2º C.", hours: 60, cursarReg: ["CI211"], cursarAprob: ["CI121"], rendirAprob: ["CI121", "CI211"], criticality: 0 },
      { id: "CI252", name: "Resistencia de Materiales", regimen: "2º C.", hours: 105, cursarReg: ["CI251"], cursarAprob: [], rendirAprob: ["CI251"], criticality: 5 },
      { id: "CI254", name: "Teoría de la Elasticidad", regimen: "2º C.", hours: 45, cursarReg: ["CI211"], cursarAprob: ["CI111", "CI112"], rendirAprob: ["CI211"], criticality: 1 },
      { id: "CI261", name: "Ingeniería e Industrias", regimen: "2º C.", hours: 60, cursarReg: ["CI131", "CI161"], cursarAprob: [], rendirAprob: ["CI131", "CI161"], criticality: 1 }
    ],
    "3": [
      { id: "CI213", name: "Probabilidad y Estadística 1", regimen: "1º C.", hours: 75, cursarReg: ["CI211"], cursarAprob: [], rendirAprob: ["CI211"], criticality: 1 },
      { id: "CI332", name: "Mecánica de los Fluidos y Máquinas", regimen: "1º C.", hours: 105, cursarReg: ["CI252"], cursarAprob: [], rendirAprob: ["CI252"], criticality: 2 },
      { id: "CI351", name: "Mecánica de los Suelos", regimen: "1º C.", hours: 105, cursarReg: ["CI252"], cursarAprob: [], rendirAprob: ["CI252"], criticality: 2 },
      { id: "CI352", name: "Topografía", regimen: "1º C.", hours: 90, cursarReg: ["CI252"], cursarAprob: [], rendirAprob: ["CI252"], criticality: 2 },
      { id: "CI353", name: "Caminos 1", regimen: "2º C.", hours: 75, cursarReg: ["CI351", "CI352"], cursarAprob: [], rendirAprob: ["CI351", "CI352"], criticality: 2 },
      { id: "CI354", name: "Estructuras", regimen: "2º C.", hours: 120, cursarReg: ["CI252", "CI254"], cursarAprob: [], rendirAprob: ["CI252", "CI254"], criticality: 1 },
      { id: "CI355", name: "Ciencia de los Materiales", regimen: "2º C.", hours: 105, cursarReg: ["CI252", "CI213"], cursarAprob: [], rendirAprob: ["CI252", "CI213"], criticality: 4 },
      { id: "CI356", name: "Hidrología", regimen: "2º C.", hours: 60, cursarReg: ["CI332", "CI351", "CI352"], cursarAprob: [], rendirAprob: ["CI332", "CI351", "CI352"], criticality: 2 },
      { id: "CI365", name: "Inglés 1", regimen: "Anual", hours: 90, cursarReg: ["CI261"], cursarAprob: ["CI111", "CI112", "CI121", "CI122", "CI131", "CI161"], rendirAprob: ["CI261"], criticality: 1 }
    ],
    "4": [
      { id: "CI451", name: "Caminos 2", regimen: "1º C.", hours: 75, cursarReg: ["CI351", "CI352", "CI353", "CI355"], cursarAprob: [], rendirAprob: ["CI351", "CI352", "CI353", "CI355"], criticality: 2 },
      { id: "CI452", name: "Hormigón Armado", regimen: "1º C.", hours: 120, cursarReg: ["CI354", "CI355"], cursarAprob: [], rendirAprob: ["CI354", "CI355"], criticality: 4 },
      { id: "CI453", name: "Hidráulica Aplicada", regimen: "1º C.", hours: 60, cursarReg: ["CI356"], cursarAprob: [], rendirAprob: ["CI356"], criticality: 1 },
      { id: "CI454", name: "Instalaciones de Edificios", regimen: "1º C.", hours: 90, cursarReg: ["CI332", "CI355"], cursarAprob: [], rendirAprob: ["CI332", "CI355"], criticality: 2 },
      { id: "CI462", name: "Legislación y Ejercicio Profesional", regimen: "1º C.", hours: 90, cursarReg: ["CI353", "CI356"], cursarAprob: [], rendirAprob: ["CI353", "CI356"], criticality: 1 },
      { id: "CI455", name: "Construcción de Edificios", regimen: "2º C.", hours: 90, cursarReg: ["CI355", "CI452", "CI454"], cursarAprob: [], rendirAprob: ["CI355", "CI452", "CI454"], criticality: 4 },
      { id: "CI456", name: "Estructuras de Hormigón Armado y Pretensado", regimen: "2º C.", hours: 90, cursarReg: ["CI452"], cursarAprob: [], rendirAprob: ["CI452"], criticality: 3 },
      { id: "CI457", name: "Obras Hidráulicas", regimen: "2º C.", hours: 60, cursarReg: ["CI452", "CI453"], cursarAprob: [], rendirAprob: ["CI452", "CI453"], criticality: 1 },
      { id: "CI458", name: "Instalaciones Complementarias", regimen: "2º C.", hours: 75, cursarReg: ["CI454"], cursarAprob: [], rendirAprob: ["CI454"], criticality: 0 },
      { id: "CI466", name: "Higiene, Seguridad y Medio Ambiente", regimen: "2º C.", hours: 90, cursarReg: ["CI462"], cursarAprob: [], rendirAprob: ["CI462"], criticality: 1 },
      { id: "CI469", name: "Inglés 2", regimen: "Anual", hours: 90, cursarReg: ["CI365"], cursarAprob: [], rendirAprob: ["CI365"], criticality: 0 }
    ],
    "5": [
      { id: "CI551", name: "Organización de Obras", regimen: "1º C.", hours: 90, cursarReg: ["CI451", "CI455"], cursarAprob: [], rendirAprob: ["CI451", "CI455"], criticality: 1 },
      { id: "CI552", name: "Construcciones Metálicas y de Madera", regimen: "1º C.", hours: 105, cursarReg: ["CI455"], cursarAprob: [], rendirAprob: ["CI455"], criticality: 1 },
      { id: "CI553", name: "Ingeniería del Transporte", regimen: "1º C.", hours: 75, cursarReg: ["CI451", "CI456"], cursarAprob: [], rendirAprob: ["CI451", "CI456"], criticality: 1 },
      { id: "CI554", name: "Diseño Arquitectónico y Estructural", regimen: "1º C.", hours: 120, cursarReg: ["CI455", "CI456"], cursarAprob: [], rendirAprob: ["CI455", "CI456"], criticality: 1 },
      { id: "CI555", name: "Fundaciones", regimen: "2º C.", hours: 90, cursarReg: ["CI452", "CI455"], cursarAprob: [], rendirAprob: ["CI452", "CI455"], criticality: 0 },
      { id: "CI556", name: "Ingeniería Sanitaria", regimen: "2º C.", hours: 105, cursarReg: ["CI456", "CI457"], cursarAprob: [], rendirAprob: ["CI456", "CI457"], criticality: 0 },
      { id: "CI557", name: "Planeamiento Territorial", regimen: "2º C.", hours: 90, cursarReg: ["CI551", "CI553", "CI554"], cursarAprob: [], rendirAprob: ["CI551", "CI553", "CI554"], criticality: 0 },
      { id: "CI465", name: "Dirección de Empresas y Control de Gestión", regimen: "2º C.", hours: 90, cursarReg: ["CI466"], cursarAprob: [], rendirAprob: ["CI466"], criticality: 0 },
      { id: "CI558", name: "Proyecto de Ingeniería", regimen: "2º C.", hours: 60, cursarReg: ["CI551", "CI552", "CI553", "CI554"], cursarAprob: [], rendirAprob: ["ALL"], criticality: 0 }
    ]
  }
};