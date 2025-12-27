import type { StudyPlan } from '../../../types';

export const computacion2018: StudyPlan = {
  id: 'computacion-2018',
  careerId: 'computacion',
  name: 'Ingeniería en Computación',
  year: 2018,
  active: true,
  coursesData: {
    "1": [
      { id: "IC101", name: "Matemática I", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IC102", name: "Algebra", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IC103", name: "Algoritmos y Estructura de Datos", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IC111", name: "Fundamentos de Informática", regimen: "1º C.", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IC112", name: "Inglés Técnico I", regimen: "1º C.", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IC121", name: "Sistemas de Representación", regimen: "2º C.", hours: "-", cursarReg: ["IC111"], cursarAprob: [], rendirAprob: ["IC111"], criticality: 1 },
      { id: "IC122", name: "Química", regimen: "2º C.", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 }
    ],
    "2": [
      { id: "IC211", name: "Matemática II", regimen: "1º C.", hours: "-", cursarReg: ["IC101", "IC102"], cursarAprob: [], rendirAprob: ["IC101", "IC102"], criticality: 1 },
      { id: "IC212", name: "Física Mecánica", regimen: "1º C.", hours: "-", cursarReg: ["IC101", "IC102"], cursarAprob: [], rendirAprob: ["IC101", "IC102"], criticality: 1 },
      { id: "IC213", name: "Fundamentos de Computación I", regimen: "1º C.", hours: "-", cursarReg: ["IC111"], cursarAprob: [], rendirAprob: ["IC111"], criticality: 1 },
      { id: "IC221", name: "Arquitectura de Computadoras", regimen: "2º C.", hours: "-", cursarReg: ["IC111"], cursarAprob: [], rendirAprob: ["IC111"], criticality: 1 },
      { id: "IC222", name: "Matemática III", regimen: "2º C.", hours: "-", cursarReg: ["IC211"], cursarAprob: [], rendirAprob: ["IC211"], criticality: 1 },
      { id: "IC223", name: "Electricidad y Electromagnetismo", regimen: "2º C.", hours: "-", cursarReg: ["IC211", "IC212"], cursarAprob: [], rendirAprob: ["IC211", "IC212"], criticality: 1 },
      { id: "IC224", name: "Programación", regimen: "2º C.", hours: "-", cursarReg: ["IC103", "IC213"], cursarAprob: [], rendirAprob: ["IC103", "IC213"], criticality: 1 }
    ],
    "3": [
      { id: "IC311", name: "Probabilidad y Estadística", regimen: "1º C.", hours: "-", cursarReg: ["IC211"], cursarAprob: ["IC101", "IC102"], rendirAprob: ["IC211"], criticality: 1 },
      { id: "IC312", name: "Circuitos Eléctricos", regimen: "1º C.", hours: "-", cursarReg: ["IC223"], cursarAprob: ["IC101", "IC102"], rendirAprob: ["IC223"], criticality: 1 },
      { id: "IC313", name: "Materiales y Dispositivos Electrónicos", regimen: "1º C.", hours: "-", cursarReg: ["IC122", "IC223"], cursarAprob: ["IC101", "IC102"], rendirAprob: ["IC122", "IC223"], criticality: 1 },
      { id: "IC314", name: "Organización Empresarial", regimen: "1º C.", hours: "-", cursarReg: ["IC211"], cursarAprob: ["IC111"], rendirAprob: ["IC111"], criticality: 1 },
      { id: "IC315", name: "Sistemas Operativos", regimen: "1º C.", hours: "-", cursarReg: ["IC103", "IC221"], cursarAprob: ["IC111"], rendirAprob: ["IC103", "IC221"], criticality: 1 },
      { id: "IC321", name: "Electrónica Analógica", regimen: "2º C.", hours: "-", cursarReg: ["IC313"], cursarAprob: [], rendirAprob: ["IC313"], criticality: 1 },
      { id: "IC322", name: "Fundamentos de Computación II", regimen: "2º C.", hours: "-", cursarReg: ["IC213"], cursarAprob: ["IC103", "IC111"], rendirAprob: ["IC103", "IC213"], criticality: 1 },
      { id: "IC323", name: "Comunicación de Datos", regimen: "2º C.", hours: "-", cursarReg: ["IC222", "IC223"], cursarAprob: ["IC101", "IC102"], rendirAprob: ["IC222", "IC223"], criticality: 1 },
      { id: "IC324", name: "Señales y Sistemas", regimen: "2º C.", hours: "-", cursarReg: ["IC222"], cursarAprob: ["IC101", "IC102"], rendirAprob: ["IC222"], criticality: 1 }
    ],
    "4": [
      { id: "IC411", name: "Sistemas Digitales", regimen: "1º C.", hours: "-", cursarReg: ["IC321"], cursarAprob: ["IC211", "IC212", "IC213"], rendirAprob: ["IC211", "IC212", "IC213", "IC321"], criticality: 1 },
      { id: "IC412", name: "Redes I", regimen: "1º C.", hours: "-", cursarReg: ["IC221", "IC323"], cursarAprob: ["IC211", "IC212", "IC213"], rendirAprob: ["IC213", "IC221", "IC323"], criticality: 1 },
      { id: "IC413", name: "Ingeniería de Software I", regimen: "1º C.", hours: "-", cursarReg: ["IC224", "IC311", "IC314"], cursarAprob: ["IC211", "IC212", "IC213"], rendirAprob: ["IC211", "IC212", "IC224", "IC311", "IC314"], criticality: 1 },
      { id: "IC414", name: "Base de Datos", regimen: "1º C.", hours: "-", cursarReg: ["IC224"], cursarAprob: ["IC211", "IC212", "IC213"], rendirAprob: ["IC211", "IC212", "IC224"], criticality: 1 },
      { id: "IC415", name: "Inteligencia Computacional", regimen: "1º C.", hours: "-", cursarReg: ["IC224", "IC322", "IC411"], cursarAprob: [], rendirAprob: ["IC224", "IC322", "IC411"], criticality: 1 },
      { id: "IC421", name: "Redes II", regimen: "2º C.", hours: "-", cursarReg: ["IC412"], cursarAprob: ["IC221", "IC224", "IC323"], rendirAprob: ["IC224", "IC412"], criticality: 1 },
      { id: "IC422", name: "Sistemas Embebidos", regimen: "2º C.", hours: "-", cursarReg: ["IC323", "IC411"], cursarAprob: ["IC221", "IC222", "IC223", "IC224"], rendirAprob: ["IC224", "IC411"], criticality: 1 },
      { id: "IC423", name: "Ingeniería de Software II", regimen: "2º C.", hours: "-", cursarReg: ["IC413"], cursarAprob: ["IC221", "IC222", "IC223", "IC224"], rendirAprob: ["IC221", "IC222", "IC223", "IC413"], criticality: 1 },
      { id: "IC424", name: "Sistemas de Control y Automatización", regimen: "2º C.", hours: "-", cursarReg: ["IC324", "IC411"], cursarAprob: ["IC221", "IC222", "IC223", "IC224"], rendirAprob: ["IC224", "IC324", "IC411"], criticality: 1 }
    ],
    "5": [
      { id: "IC511", name: "Internet de las Cosas, Sensores y Redes", regimen: "1º C.", hours: "-", cursarReg: ["IC421", "IC422"], cursarAprob: ["IC311", "IC312", "IC313", "IC314", "IC315", "IC411", "IC412"], rendirAprob: ["IC311", "IC312", "IC313", "IC314", "IC315", "IC421", "IC422"], criticality: 1 },
      { id: "IC512", name: "Procesamiento Digital de Señales", regimen: "1º C.", hours: "-", cursarReg: ["IC324", "IC422"], cursarAprob: ["IC311", "IC312", "IC313", "IC314", "IC315"], rendirAprob: ["IC311", "IC312", "IC313", "IC314", "IC315", "IC324", "IC422"], criticality: 1 },
      { id: "IC513", name: "Economía", regimen: "1º C.", hours: "-", cursarReg: [], cursarAprob: ["IC311", "IC312", "IC313", "IC314", "IC315"], rendirAprob: ["IC311", "IC312", "IC313", "IC314", "IC315"], criticality: 1 },
      { id: "IC514", name: "Higiene, Seguridad y Medio Ambiente", regimen: "1º C.", hours: "-", cursarReg: [], cursarAprob: ["IC311", "IC312", "IC313", "IC314", "IC315"], rendirAprob: ["IC311", "IC312", "IC313", "IC314", "IC315"], criticality: 1 },
      { id: "IC515", name: "Gestión de Proyectos", regimen: "1º C.", hours: "-", cursarReg: ["IC413"], cursarAprob: ["IC311", "IC312", "IC313", "IC314", "IC315"], rendirAprob: ["IC312", "IC313", "IC315", "IC413"], criticality: 1 },
      { id: "IC521", name: "Legislación", regimen: "2º C.", hours: "-", cursarReg: [], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: ["IC321", "IC322", "IC323", "IC324"], criticality: 1 },
      { id: "IC522", name: "Proyecto Final Integrador", regimen: "2º C.", hours: "-", cursarReg: ["IC422", "IC515"], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: ["IC321", "IC322", "IC323", "IC324", "IC422", "IC515"], criticality: 1 },
      { id: "ICO51", name: "Optativa I", regimen: "2º C.", hours: "-", cursarReg: ["IC321", "IC322", "IC323", "IC324"], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: [], criticality: 1, isElectiveSlot: true, electiveGroup: 'OPTATIVAS_IC' },
      { id: "ICO52", name: "Optativa II", regimen: "2º C.", hours: "-", cursarReg: ["IC321", "IC322", "IC323", "IC324"], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: [], criticality: 1, isElectiveSlot: true, electiveGroup: 'OPTATIVAS_IC' }
    ]
  },
  electivesData: {
    'OPTATIVAS_IC': [
      { id: "ICO523", name: "Seguridad en Sistemas", regimen: "2°C", hours: "-", cursarReg: ["IC414", "IC423", "IC511"], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: ["IC423", "IC414", "IC511"], criticality: 0 },
      { id: "ICO524", name: "Modelos y Simulación", regimen: "2°C", hours: "-", cursarReg: [], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: ["IC321", "IC322", "IC323", "IC324"], criticality: 0 },
      { id: "ICO525", name: "Sistemas de Control Industriales", regimen: "2°C", hours: "-", cursarReg: ["IC421", "IC424"], cursarAprob: ["IC321", "IC322", "IC324"], rendirAprob: ["IC322", "IC421", "IC424"], criticality: 0 },
      { id: "ICO526", name: "Diseño de Sistemas Embebidos", regimen: "2°C", hours: "-", cursarReg: ["IC422"], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: ["IC321", "IC322", "IC324", "IC422"], criticality: 0 },
      { id: "ICO527", name: "Fundamentos del Procesamiento Digital de Imágenes", regimen: "2°C", hours: "-", cursarReg: ["IC512"], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: ["IC321", "IC322", "IC512"], criticality: 0 },
      { id: "ICO528", name: "Inglés Técnico II", regimen: "2°C", hours: "-", cursarReg: [], cursarAprob: ["IC321", "IC322", "IC323", "IC324"], rendirAprob: ["IC321", "IC322", "IC323", "IC324"], criticality: 0 }
    ]
  }
};