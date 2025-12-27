import type { StudyPlan } from '../../../types';

export const electromecanica2013: StudyPlan = {
  id: 'electromecanica-2013',
  careerId: 'electromecanica',
  name: 'Ingeniería Electromecánica',
  year: 2013,
  active: true,
  coursesData: {
    "1": [
      { id: "EM111", name: "Algebra y Geometría Analítica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "EM112", name: "Cálculo 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "EM121", name: "Física 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "EM122", name: "Química", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "EM131", name: "Sistemas de Representación Gráfica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "EM161", name: "Ingeniería y Sociedad", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 }
    ],
    "2": [
      { id: "EM211", name: "Cálculo 2", regimen: "1º C.", hours: "-", cursarReg: ["EM111", "EM112", "EM121"], cursarAprob: [], rendirAprob: ["EM111", "EM112", "EM121"], criticality: 1 },
      { id: "EM213", name: "Probabilidad y Estadística 1", regimen: "1º C.", hours: "-", cursarReg: ["EM111", "EM112"], cursarAprob: [], rendirAprob: ["EM111", "EM112"], criticality: 1 },
      { id: "EM221", name: "Física 2", regimen: "1º C.", hours: "-", cursarReg: ["EM111", "EM112", "EM121"], cursarAprob: [], rendirAprob: ["EM111", "EM112", "EM121"], criticality: 1 },
      { id: "EM241", name: "Informática", regimen: "1º C.", hours: "-", cursarReg: ["EM111", "EM112"], cursarAprob: [], rendirAprob: ["EM111", "EM112"], criticality: 1 },
      { id: "EM212", name: "Matemática Aplicada", regimen: "2º C.", hours: "-", cursarReg: ["EM211", "EM221"], cursarAprob: ["EM111", "EM112"], rendirAprob: ["EM111", "EM112", "EM211", "EM221"], criticality: 1 },
      { id: "EM222", name: "Mecánica Racional", regimen: "2º C.", hours: "-", cursarReg: ["EM211"], cursarAprob: ["EM121"], rendirAprob: ["EM121", "EM211"], criticality: 1 },
      { id: "EM231", name: "Termodinámica", regimen: "2º C.", hours: "-", cursarReg: ["EM122", "EM211", "EM213"], cursarAprob: ["EM112", "EM121"], rendirAprob: ["EM112", "EM121", "EM122", "EM211", "EM213"], criticality: 1 },
      { id: "EM253", name: "Estática y Resistencia de Materiales", regimen: "2º C.", hours: "-", cursarReg: ["EM211"], cursarAprob: ["EM111", "EM112", "EM121", "EM131"], rendirAprob: ["EM111", "EM112", "EM121", "EM131", "EM211"], criticality: 1 },
      { id: "EM261", name: "Ingeniería e Industrias", regimen: "2º C.", hours: "-", cursarReg: ["EM131", "EM161"], cursarAprob: [], rendirAprob: ["EM131", "EM161"], criticality: 1 }
    ],
    "3": [
      { id: "EM331", name: "Electrotecnia", regimen: "1º C.", hours: "-", cursarReg: ["EM212", "EM221"], cursarAprob: [], rendirAprob: ["EM212", "EM221"], criticality: 1 },
      { id: "EM332", name: "Mecánica de los Fluidos y Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["EM212", "EM222"], cursarAprob: ["EM211"], rendirAprob: ["EM212", "EM222", "EM211"], criticality: 1 },
      { id: "EM333", name: "Diseño Aplicado", regimen: "1º C.", hours: "-", cursarReg: ["EM222", "EM253", "EM261"], cursarAprob: ["EM241"], rendirAprob: ["EM222", "EM253", "EM261", "EM241"], criticality: 1 },
      { id: "EM334", name: "Máquinas e Instalaciones Térmicas 1", regimen: "1º C.", hours: "-", cursarReg: ["EM231"], cursarAprob: ["EM211"], rendirAprob: ["EM231", "EM211"], criticality: 1 },
      { id: "EM341", name: "Electrónica", regimen: "1º C.", hours: "-", cursarReg: ["EM212"], cursarAprob: ["EM221"], rendirAprob: ["EM212", "EM221"], criticality: 1 },
      { id: "EM335", name: "Ciencia de los Materiales", regimen: "2º C.", hours: "-", cursarReg: ["EM212", "EM231", "EM253"], cursarAprob: ["EM211"], rendirAprob: ["EM211", "EM212", "EM231", "EM253"], criticality: 1 },
      { id: "EM336", name: "Mediciones y Metrología", regimen: "2º C.", hours: "-", cursarReg: ["EM331", "EM341"], cursarAprob: ["EM213", "EM221"], rendirAprob: ["EM213", "EM221", "EM331", "EM341"], criticality: 1 },
      { id: "EM337", name: "Máquinas Eléctricas", regimen: "2º C.", hours: "-", cursarReg: ["EM331", "EM341"], cursarAprob: ["EM221"], rendirAprob: ["EM221", "EM331", "EM341"], criticality: 1 },
      { id: "EM466", name: "Higiene, Seguridad y Medio Ambiente", regimen: "2º C.", hours: "-", cursarReg: ["EM231", "EM331"], cursarAprob: ["EM221", "EM261"], rendirAprob: ["EM221", "EM261", "EM231", "EM331"], criticality: 1 }
    ],
    "4": [
      { id: "EM431", name: "Elementos de Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["EM332", "EM335", "EM333"], cursarAprob: ["EM212", "EM253"], rendirAprob: ["EM212", "EM332", "EM335", "EM333", "EM253"], criticality: 1 },
      { id: "EM432", name: "Máquinas e Instalaciones Térmicas 2", regimen: "1º C.", hours: "-", cursarReg: ["EM332", "EM334"], cursarAprob: ["EM231", "EM212"], rendirAprob: ["EM231", "EM212", "EM332", "EM334"], criticality: 1 },
      { id: "EM468", name: "Economía y Organización de la Producción", regimen: "1º C.", hours: "-", cursarReg: ["EM466"], cursarAprob: ["EM261"], rendirAprob: ["EM261", "EM466"], criticality: 1 },
      { id: "EM462", name: "Legislación y Ejercicio Profesional", regimen: "1º C.", hours: "-", cursarReg: ["EM466"], cursarAprob: ["EM261"], rendirAprob: ["EM261", "EM466"], criticality: 1 },
      { id: "EM434", name: "Mecanismos y Elementos de Máquinas", regimen: "2º C.", hours: "-", cursarReg: ["EM431"], cursarAprob: ["EM332", "EM333"], rendirAprob: ["EM332", "EM333", "EM431"], criticality: 1 },
      { id: "EM436", name: "Climatización y Frío Industrial", regimen: "2º C.", hours: "-", cursarReg: ["EM337", "EM432"], cursarAprob: ["EM331", "EM341"], rendirAprob: ["EM331", "EM341", "EM337", "EM432"], criticality: 1 },
      { id: "EM437", name: "Tecnología de los Procesos de Producción", regimen: "2º C.", hours: "-", cursarReg: ["EM431"], cursarAprob: ["EM333"], rendirAprob: ["EM333", "EM431"], criticality: 1 },
      { id: "EM438", name: "Centrales de Energía", regimen: "2º C.", hours: "-", cursarReg: ["EM332", "EM337", "EM432"], cursarAprob: ["EM331", "EM341"], rendirAprob: ["EM331", "EM332", "EM337", "EM341", "EM432"], criticality: 1 },
      { id: "EM365", name: "Inglés 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: ["EM211", "EM213", "EM221", "EM241", "EM212", "EM222", "EM231", "EM253", "EM261"], rendirAprob: ["EM211", "EM213", "EM221", "EM241", "EM212", "EM222", "EM231", "EM253", "EM261"], criticality: 1 },
      { id: "EM433", name: "Proyecto Electromecánico 1", regimen: "Anual", hours: "-", cursarReg: ["EM335", "EM336", "EM466"], cursarAprob: ["EM253", "EM333"], rendirAprob: ["EM253", "EM333", "EM335", "EM336", "EM466"], criticality: 1 }
    ],
    "5": [
      { id: "EM531", name: "Mantenimiento", regimen: "1º C.", hours: "-", cursarReg: ["EM434", "EM436", "EM462", "EM438", "EM468"], cursarAprob: ["EM337", "EM466", "EM336"], rendirAprob: ["EM337", "EM466", "EM336", "EM434", "EM436", "EM462", "EM438", "EM468"], criticality: 1 },
      { id: "EM532", name: "Equipamiento Eléctrico de Centrales", regimen: "1º C.", hours: "-", cursarReg: ["EM434", "EM468", "EM438"], cursarAprob: ["EM336", "EM337", "EM466"], rendirAprob: ["EM336", "EM337", "EM434", "EM466", "EM468", "EM438"], criticality: 1 },
      { id: "EM534", name: "Instalaciones Eléctricas", regimen: "1º C.", hours: "-", cursarReg: ["EM436"], cursarAprob: ["EM336", "EM337", "EM466"], rendirAprob: ["EM336", "EM337", "EM466", "EM436"], criticality: 1 },
      { id: "EM535", name: "Sistemas de Control", regimen: "2º C.", hours: "-", cursarReg: ["EM534", "EM436"], cursarAprob: ["EM432"], rendirAprob: ["EM432", "EM534", "EM436"], criticality: 1 },
      { id: "EM536", name: "Instalaciones Hidráulicas y Neumáticas", regimen: "2º C.", hours: "-", cursarReg: ["EM436"], cursarAprob: ["EM431"], rendirAprob: ["EM431", "EM436"], criticality: 1 },
      { id: "EM537", name: "Transmisión y Distribución de Energía Eléctrica", regimen: "2º C.", hours: "-", cursarReg: ["EM532"], cursarAprob: [], rendirAprob: ["EM532"], criticality: 1 },
      { id: "EM538", name: "Sistemas Eléctricos de Potencia", regimen: "2º C.", hours: "-", cursarReg: ["EM532", "EM534"], cursarAprob: [], rendirAprob: ["EM532", "EM534"], criticality: 1 },
      { id: "EM469", name: "Inglés 2", regimen: "Anual", hours: "-", cursarReg: ["EM365"], cursarAprob: [], rendirAprob: ["EM365"], criticality: 1 },
      { id: "EM533", name: "Proyecto Electromecánico 2", regimen: "Anual", hours: "-", cursarReg: ["EM433", "EM434", "EM436", "EM462", "EM468", "EM437"], cursarAprob: [], rendirAprob: ["ALL"], criticality: 1 }
    ]
  }
};