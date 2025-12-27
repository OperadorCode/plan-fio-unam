import type { StudyPlan } from '../../../types';

export const electronica2013: StudyPlan = {
  id: 'electronica-2013',
  careerId: 'electronica',
  name: 'Ingeniería Electrónica',
  year: 2013,
  active: true,
  coursesData: {
    "1": [
      { id: "ET111", name: "Algebra y Geometría Analítica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "ET112", name: "Cálculo 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "ET121", name: "Física 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "ET122", name: "Química", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "ET131", name: "Sistemas de Representación Gráfica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "ET161", name: "Ingeniería y Sociedad", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 }
    ],
    "2": [
      { id: "ET211", name: "Cálculo 2", regimen: "1º C.", hours: "-", cursarReg: ["ET111", "ET112", "ET121"], cursarAprob: [], rendirAprob: ["ET111", "ET112", "ET121"], criticality: 1 },
      { id: "ET213", name: "Probabilidad y Estadística 1", regimen: "1º C.", hours: "-", cursarReg: ["ET111", "ET112"], cursarAprob: [], rendirAprob: ["ET111", "ET112"], criticality: 1 },
      { id: "ET221", name: "Física 2", regimen: "1º C.", hours: "-", cursarReg: ["ET111", "ET112", "ET121"], cursarAprob: [], rendirAprob: ["ET111", "ET112", "ET121"], criticality: 1 },
      { id: "ET241", name: "Informática", regimen: "1º C.", hours: "-", cursarReg: ["ET111", "ET112"], cursarAprob: [], rendirAprob: ["ET111", "ET112"], criticality: 1 },
      { id: "ET212", name: "Matemática Aplicada", regimen: "2º C.", hours: "-", cursarReg: ["ET211", "ET221"], cursarAprob: ["ET111", "ET112"], rendirAprob: ["ET211", "ET221"], criticality: 1 },
      { id: "ET242", name: "Tecnología Electrónica", regimen: "2º C.", hours: "-", cursarReg: ["ET221"], cursarAprob: ["ET121"], rendirAprob: ["ET221"], criticality: 1 },
      { id: "ET243", name: "Física 3", regimen: "2º C.", hours: "-", cursarReg: ["ET122", "ET211", "ET213", "ET221"], cursarAprob: ["ET121"], rendirAprob: ["ET122", "ET211", "ET213", "ET221"], criticality: 1 },
      { id: "ET261", name: "Ingeniería e Industrias", regimen: "2º C.", hours: "-", cursarReg: ["ET131", "ET161"], cursarAprob: [], rendirAprob: ["ET131", "ET161"], criticality: 1 }
    ],
    "3": [
      { id: "ET342", name: "Análisis de Circuitos", regimen: "1º C.", hours: "-", cursarReg: ["ET212"], cursarAprob: [], rendirAprob: ["ET212"], criticality: 1 },
      { id: "ET343", name: "Señales y Sistemas", regimen: "1º C.", hours: "-", cursarReg: ["ET212"], cursarAprob: [], rendirAprob: ["ET212"], criticality: 1 },
      { id: "ET344", name: "Computación", regimen: "1º C.", hours: "-", cursarReg: ["ET211"], cursarAprob: ["ET241"], rendirAprob: ["ET212", "ET241"], criticality: 1 },
      { id: "ET345", name: "Dispositivos Electrónicos", regimen: "1º C.", hours: "-", cursarReg: ["ET242", "ET243"], cursarAprob: [], rendirAprob: ["ET242", "ET243"], criticality: 1 },
      { id: "ET339", name: "Máquinas e Instalaciones Eléctricas", regimen: "2º C.", hours: "-", cursarReg: ["ET342"], cursarAprob: ["ET221"], rendirAprob: ["ET342"], criticality: 1 },
      { id: "ET346", name: "Electromagnetismo", regimen: "2º C.", hours: "-", cursarReg: ["ET212", "ET243"], cursarAprob: ["ET221"], rendirAprob: ["ET212", "ET243"], criticality: 1 },
      { id: "ET347", name: "Electrónica Analógica", regimen: "2º C.", hours: "-", cursarReg: ["ET342", "ET343", "ET345"], cursarAprob: ["ET221"], rendirAprob: ["ET342", "ET343", "ET345"], criticality: 1 },
      { id: "ET365", name: "Inglés 1", regimen: "Anual", hours: "-", cursarReg: ["ET261"], cursarAprob: [], rendirAprob: ["ET261"], criticality: 1 }
    ],
    "4": [
      { id: "ET441", name: "Mediciones Electrónicas", regimen: "1º C.", hours: "-", cursarReg: ["ET347"], cursarAprob: [], rendirAprob: ["ET347"], criticality: 1 },
      { id: "ET442", name: "Técnicas Digitales 1", regimen: "1º C.", hours: "-", cursarReg: ["ET347"], cursarAprob: [], rendirAprob: ["ET347"], criticality: 1 },
      { id: "ET443", name: "Sistemas de Control 1", regimen: "1º C.", hours: "-", cursarReg: ["ET347"], cursarAprob: [], rendirAprob: ["ET347"], criticality: 1 },
      { id: "ET468", name: "Economía y Organización de la Producción", regimen: "1º C.", hours: "-", cursarReg: [], cursarAprob: ["ET261"], rendirAprob: ["ET261"], criticality: 1 },
      { id: "ET444", name: "Propagación y Antenas", regimen: "2º C.", hours: "-", cursarReg: ["ET346"], cursarAprob: [], rendirAprob: ["ET346"], criticality: 1 },
      { id: "ET445", name: "Sistemas de Control 2", regimen: "2º C.", hours: "-", cursarReg: ["ET443"], cursarAprob: ["ET343"], rendirAprob: ["ET343", "ET443"], criticality: 1 },
      { id: "ET446", name: "Técnicas Digitales 2", regimen: "2º C.", hours: "-", cursarReg: ["ET344", "ET442"], cursarAprob: [], rendirAprob: ["ET344", "ET442"], criticality: 1 },
      { id: "ET469", name: "Inglés 2", regimen: "Anual", hours: "-", cursarReg: ["ET365"], cursarAprob: [], rendirAprob: ["ET365"], criticality: 1 }
    ],
    "5": [
      { id: "ET541", name: "Electrónica de Potencia", regimen: "1º C.", hours: "-", cursarReg: ["ET441", "ET445"], cursarAprob: ["ET339"], rendirAprob: ["ET339", "ET441", "ET445"], criticality: 1 },
      { id: "ET542", name: "Comunicaciones 1", regimen: "1º C.", hours: "-", cursarReg: ["ET441", "ET442"], cursarAprob: [], rendirAprob: ["ET441", "ET442"], criticality: 1 },
      { id: "ET462", name: "Legislación y Ejercicio Profesional", regimen: "1º C.", hours: "-", cursarReg: ["ET468"], cursarAprob: [], rendirAprob: ["ET468"], criticality: 1 },
      { id: "ET466", name: "Higiene, Seguridad y Medio Ambiente", regimen: "2º C.", hours: "-", cursarReg: ["ET462"], cursarAprob: [], rendirAprob: ["ET462"], criticality: 1 },
      { id: "ET543", name: "Procesamiento de Señales", regimen: "2º C.", hours: "-", cursarReg: ["ET446"], cursarAprob: [], rendirAprob: ["ET446"], criticality: 1 },
      { id: "ET544", name: "Comunicaciones 2", regimen: "2º C.", hours: "-", cursarReg: ["ET542"], cursarAprob: [], rendirAprob: ["ET542"], criticality: 1 },
      { id: "ET545", name: "Instrumentación y Automatismos Industriales", regimen: "2º C.", hours: "-", cursarReg: ["ET441", "ET445", "ET446", "ET542"], cursarAprob: [], rendirAprob: ["ET441", "ET445", "ET446", "ET542"], criticality: 1 },
      { id: "ET546", name: "Proyecto y Diseño Electrónico", regimen: "Anual", hours: "-", cursarReg: ["ET444", "ET445", "ET446"], cursarAprob: ["ET441", "ET442", "ET443", "ET468"], rendirAprob: ["ALL"], criticality: 1 }
    ]
  }
};