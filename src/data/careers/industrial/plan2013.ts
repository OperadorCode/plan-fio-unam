import type { StudyPlan } from '../../../types';

export const industrial2013: StudyPlan = {
  id: 'industrial-2013',
  careerId: 'industrial',
  name: 'Ingeniería Industrial',
  year: 2013,
  active: true,
  coursesData: {
    "1": [
      { id: "IN111", name: "Algebra y Geometría Analítica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IN112", name: "Cálculo 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IN121", name: "Física 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IN122", name: "Química", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IN131", name: "Sistemas de Representación Gráfica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IN161", name: "Ingeniería y Sociedad", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 }
    ],
    "2": [
      { id: "IN211", name: "Cálculo 2", regimen: "1º C.", hours: "-", cursarReg: ["IN111", "IN112"], cursarAprob: [], rendirAprob: ["IN111", "IN112"], criticality: 1 },
      { id: "IN213", name: "Probabilidad y Estadística 1", regimen: "1º C.", hours: "-", cursarReg: ["IN111", "IN112"], cursarAprob: [], rendirAprob: ["IN111", "IN112"], criticality: 1 },
      { id: "IN221", name: "Física 2", regimen: "1º C.", hours: "-", cursarReg: ["IN111", "IN112", "IN121"], cursarAprob: [], rendirAprob: ["IN111", "IN112", "IN121"], criticality: 1 },
      { id: "IN241", name: "Informática", regimen: "1º C.", hours: "-", cursarReg: ["IN111", "IN112"], cursarAprob: [], rendirAprob: ["IN111", "IN112"], criticality: 1 },
      { id: "IN212", name: "Matemática Aplicada", regimen: "2º C.", hours: "-", cursarReg: ["IN211", "IN221"], cursarAprob: ["IN111", "IN112"], rendirAprob: ["IN111", "IN112", "IN211", "IN221"], criticality: 1 },
      { id: "IN222", name: "Mecánica Racional", regimen: "2º C.", hours: "-", cursarReg: ["IN211"], cursarAprob: ["IN121"], rendirAprob: ["IN121", "IN211"], criticality: 1 },
      { id: "IN231", name: "Termodinámica", regimen: "2º C.", hours: "-", cursarReg: ["IN122", "IN211", "IN213"], cursarAprob: ["IN112", "IN121"], rendirAprob: ["IN112", "IN121", "IN122", "IN211", "IN213"], criticality: 1 },
      { id: "IN253", name: "Estática y Resistencia de Materiales", regimen: "2º C.", hours: "-", cursarReg: ["IN211"], cursarAprob: ["IN111", "IN112", "IN121", "IN131"], rendirAprob: ["IN111", "IN112", "IN121", "IN131", "IN211"], criticality: 1 },
      { id: "IN261", name: "Ingeniería e Industrias", regimen: "2º C.", hours: "-", cursarReg: ["IN131", "IN161"], cursarAprob: [], rendirAprob: ["IN131", "IN161"], criticality: 1 }
    ],
    "3": [
      { id: "IN332", name: "Mecánica de los Fluidos y Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["IN222", "IN231"], cursarAprob: [], rendirAprob: ["IN222", "IN231"], criticality: 1 },
      { id: "IN338", name: "Electrotecnia y Máquinas Eléctricas", regimen: "1º C.", hours: "-", cursarReg: ["IN212"], cursarAprob: [], rendirAprob: ["IN212"], criticality: 1 },
      { id: "IN341", name: "Electrónica", regimen: "1º C.", hours: "-", cursarReg: ["IN212"], cursarAprob: [], rendirAprob: ["IN212"], criticality: 1 },
      { id: "IN363", name: "Sistemas de Producción", regimen: "1º C.", hours: "-", cursarReg: ["IN211", "IN213", "IN261"], cursarAprob: [], rendirAprob: ["IN211", "IN213", "IN261"], criticality: 1 },
      { id: "IN362", name: "Probabilidad y Estadística 2", regimen: "2º C.", hours: "-", cursarReg: ["IN211", "IN213"], cursarAprob: [], rendirAprob: ["IN211", "IN213"], criticality: 1 },
      { id: "IN335", name: "Ciencia de los Materiales", regimen: "2º C.", hours: "-", cursarReg: ["IN253", "IN231"], cursarAprob: [], rendirAprob: ["IN253", "IN231"], criticality: 1 },
      { id: "IN361", name: "Ingeniería Económica", regimen: "2º C.", hours: "-", cursarReg: ["IN211", "IN213"], cursarAprob: [], rendirAprob: ["IN211", "IN213"], criticality: 1 },
      { id: "IN364", name: "Costos Industriales", regimen: "2º C.", hours: "-", cursarReg: ["IN211", "IN213"], cursarAprob: [], rendirAprob: ["IN211", "IN213"], criticality: 1 },
      { id: "IN365", name: "Inglés 1", regimen: "Anual", hours: "-", cursarReg: ["IN261"], cursarAprob: ["IN111", "IN112", "IN121", "IN122", "IN131", "IN161"], rendirAprob: ["IN261"], criticality: 1 }
    ],
    "4": [
      { id: "IN435", name: "Mecanismos y Elementos de Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["IN332", "IN335"], cursarAprob: ["IN253"], rendirAprob: ["IN332", "IN335"], criticality: 1 },
      { id: "IN439", name: "Procesos de Producción", regimen: "1º C.", hours: "-", cursarReg: ["IN332", "IN335", "IN364", "IN363"], cursarAprob: ["IN253", "IN231"], rendirAprob: ["IN332", "IN335", "IN364", "IN363"], criticality: 1 },
      { id: "IN461", name: "Investigación Operativa 1", regimen: "1º C.", hours: "-", cursarReg: ["IN363", "IN362", "IN361", "IN364"], cursarAprob: ["IN212"], rendirAprob: ["IN212", "IN363", "IN362", "IN361", "IN364"], criticality: 1 },
      { id: "IN462", name: "Legislación y Ejercicio Profesional", regimen: "1º C.", hours: "-", cursarReg: ["IN361", "IN363", "IN364"], cursarAprob: ["IN261"], rendirAprob: ["IN261", "IN361", "IN363", "IN364"], criticality: 1 },
      { id: "IN463", name: "Planificación y Control de la Producción 1", regimen: "2º C.", hours: "-", cursarReg: ["IN363", "IN362", "IN461", "IN439"], cursarAprob: [], rendirAprob: ["IN363", "IN362", "IN461", "IN439"], criticality: 1 },
      { id: "IN464", name: "Investigación Operativa 2", regimen: "2º C.", hours: "-", cursarReg: ["IN461", "IN439"], cursarAprob: [], rendirAprob: ["IN461", "IN439"], criticality: 1 },
      { id: "IN465", name: "Dirección de Empresas y Control de Gestión", regimen: "2º C.", hours: "-", cursarReg: ["IN363", "IN361", "IN364", "IN462", "IN461", "IN439"], cursarAprob: [], rendirAprob: ["IN363", "IN361", "IN364", "IN462", "IN461", "IN439"], criticality: 1 },
      { id: "IN466", name: "Higiene, Seguridad y Medio Ambiente", regimen: "2º C.", hours: "-", cursarReg: ["IN462"], cursarAprob: [], rendirAprob: ["IN462"], criticality: 1 },
      { id: "IN467", name: "Planes de Negocios y Marketing", regimen: "2º C.", hours: "-", cursarReg: ["IN361", "IN364", "IN461", "IN462"], cursarAprob: [], rendirAprob: ["IN361", "IN364", "IN461", "IN462"], criticality: 1 },
      { id: "IN469", name: "Inglés 2", regimen: "Anual", hours: "-", cursarReg: ["IN365"], cursarAprob: [], rendirAprob: ["IN365"], criticality: 1 }
    ],
    "5": [
      { id: "IN539", name: "Construcciones e Instalaciones Industriales", regimen: "1º C.", hours: "-", cursarReg: ["IN435", "IN439"], cursarAprob: ["IN365"], rendirAprob: ["IN365", "IN435", "IN439"], criticality: 1 },
      { id: "IN561", name: "Planificación y Control de la Producción 2", regimen: "1º C.", hours: "-", cursarReg: ["IN463", "IN464", "IN465"], cursarAprob: ["IN362", "IN365"], rendirAprob: ["IN365", "IN463", "IN464", "IN465"], criticality: 1 },
      { id: "IN562", name: "Ingeniería Industrial 1", regimen: "1º C.", hours: "-", cursarReg: ["IN463", "IN464", "IN465", "IN466"], cursarAprob: ["IN365"], rendirAprob: ["IN365", "IN463", "IN464", "IN465", "IN466"], criticality: 1 },
      { id: "IN563", name: "Gestión de la Calidad", regimen: "1º C.", hours: "-", cursarReg: ["IN467", "IN463", "IN465", "IN466"], cursarAprob: ["IN362", "IN365"], rendirAprob: ["IN365", "IN362", "IN467", "IN463", "IN465", "IN466"], criticality: 1 },
      { id: "IN564", name: "Gestión Ambiental", regimen: "1º C.", hours: "-", cursarReg: ["IN463", "IN465", "IN466"], cursarAprob: ["IN365"], rendirAprob: ["IN365", "IN463", "IN465", "IN466"], criticality: 1 },
      { id: "IN565", name: "Ingeniería de Calidad", regimen: "2º C.", hours: "-", cursarReg: ["IN563"], cursarAprob: [], rendirAprob: ["IN563"], criticality: 1 },
      { id: "IN566", name: "Sistemas Informáticos Industriales", regimen: "2º C.", hours: "-", cursarReg: ["IN561"], cursarAprob: [], rendirAprob: ["IN561"], criticality: 1 },
      { id: "IN567", name: "Desarrollo de Producto", regimen: "2º C.", hours: "-", cursarReg: ["IN563", "IN464", "IN467"], cursarAprob: [], rendirAprob: ["IN563", "IN464", "IN467"], criticality: 1 },
      { id: "IN568", name: "Ingeniería Industrial 2", regimen: "2º C.", hours: "-", cursarReg: ["IN562"], cursarAprob: [], rendirAprob: ["IN562"], criticality: 1 },
      { id: "IN569", name: "Proyecto Final de Ingeniería Industrial", regimen: "Anual", hours: "-", cursarReg: ["IN435", "IN439", "IN461", "IN462", "IN463", "IN464", "IN465", "IN466", "IN467", "IN469"], cursarAprob: [], rendirAprob: ["ALL"], criticality: 1 }
    ]
  }
};