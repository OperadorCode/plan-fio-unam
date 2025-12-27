import type { StudyPlan } from '../../../types';

export const mecatronica2020: StudyPlan = {
  id: 'mecatronica-2020',
  careerId: 'mecatronica',
  name: 'Ingeniería Mecatrónica',
  year: 2020,
  active: true,
  coursesData: {
    "1": [
      { id: "IM101", name: "Algebra y Geometría Analítica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IM102", name: "Cálculo 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IM103", name: "Física 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IM104", name: "Ingeniería y Sociedad", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IM105", name: "Sistemas de Representación Gráfica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
      { id: "IM106", name: "Química", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 }
    ],
    "2": [
      { id: "IM201", name: "Cálculo II", regimen: "1º C.", hours: "-", cursarReg: ["IM101", "IM102"], cursarAprob: [], rendirAprob: ["IM101", "IM102"], criticality: 1 },
      { id: "IM202", name: "Estadística Técnica", regimen: "1º C.", hours: "-", cursarReg: ["IM101", "IM102"], cursarAprob: [], rendirAprob: ["IM101", "IM102"], criticality: 1 },
      { id: "IM203", name: "Física II", regimen: "1º C.", hours: "-", cursarReg: ["IM101", "IM102", "IM103"], cursarAprob: [], rendirAprob: ["IM101", "IM102", "IM103"], criticality: 1 },
      { id: "IM204", name: "Informática", regimen: "1º C.", hours: "-", cursarReg: ["IM101", "IM102"], cursarAprob: [], rendirAprob: ["IM101", "IM102"], criticality: 1 },
      { id: "IM205", name: "Introducción a la Tecnología Mecatrónica", regimen: "2º C.", hours: "-", cursarReg: ["IM102", "IM103", "IM203"], cursarAprob: [], rendirAprob: ["IM102", "IM103", "IM203"], criticality: 1 },
      { id: "IM206", name: "Matemática Aplicada", regimen: "2º C.", hours: "-", cursarReg: ["IM201", "IM203"], cursarAprob: ["IM101", "IM102", "IM103"], rendirAprob: ["IM101", "IM102", "IM103", "IM201", "IM203"], criticality: 1 },
      { id: "IM207", name: "Termodinámica", regimen: "2º C.", hours: "-", cursarReg: ["IM106", "IM201", "IM202"], cursarAprob: ["IM102", "IM103"], rendirAprob: ["IM102", "IM103", "IM106", "IM201", "IM202"], criticality: 1 },
      { id: "IM208", name: "Estática y Resistencia de Materiales", regimen: "2º C.", hours: "-", cursarReg: ["IM201"], cursarAprob: ["IM101", "IM102", "IM103", "IM105"], rendirAprob: ["IM101", "IM102", "IM103", "IM105", "IM201"], criticality: 1 }
    ],
    "3": [
      { id: "IM301", name: "Electrotecnia", regimen: "1º C.", hours: "-", cursarReg: ["IM203", "IM206"], cursarAprob: [], rendirAprob: ["IM203", "IM206"], criticality: 1 },
      { id: "IM302", name: "Mecánica de Fluidos y Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["IM206"], cursarAprob: ["IM201"], rendirAprob: ["IM201", "IM206"], criticality: 1 },
      { id: "IM303", name: "Diseño Aplicado", regimen: "1º C.", hours: "-", cursarReg: ["IM208", "IM201"], cursarAprob: ["IM204"], rendirAprob: ["IM201", "IM204", "IM208"], criticality: 1 },
      { id: "IM304", name: "Tecnología y Selección de Materiales", regimen: "1º C.", hours: "-", cursarReg: ["IM202", "IM208"], cursarAprob: [], rendirAprob: ["IM202", "IM208"], criticality: 1 },
      { id: "IM305", name: "Actuadores Electromecánicos", regimen: "2º C.", hours: "-", cursarReg: ["IM206", "IM301"], cursarAprob: ["IM203"], rendirAprob: ["IM203", "IM206", "IM301"], criticality: 1 },
      { id: "IM306", name: "Sistemas Digitales", regimen: "2º C.", hours: "-", cursarReg: ["IM204", "IM205"], cursarAprob: ["IM203"], rendirAprob: ["IM203", "IM204", "IM205"], criticality: 1 },
      { id: "IM307", name: "Electrónica Analógica", regimen: "2º C.", hours: "-", cursarReg: ["IM205", "IM301"], cursarAprob: ["IM203"], rendirAprob: ["IM203", "IM205", "IM301"], criticality: 1 },
      { id: "IM308", name: "Ingeniería e Industrias", regimen: "2º C.", hours: "-", cursarReg: ["IM205"], cursarAprob: [], rendirAprob: ["IM205"], criticality: 1 },
      { id: "IM309", name: "Mecánica Racional", regimen: "2º C.", hours: "-", cursarReg: ["IM201", "IM206"], cursarAprob: [], rendirAprob: ["IM206"], criticality: 1 }
    ],
    "4": [
      { id: "IM401", name: "Programación Avanzada", regimen: "1º C.", hours: "-", cursarReg: ["IM305", "IM306"], cursarAprob: [], rendirAprob: ["IM305", "IM306"], criticality: 1 },
      { id: "IM402", name: "Economía y Organización de la Producción", regimen: "1º C.", hours: "-", cursarReg: ["IM308"], cursarAprob: [], rendirAprob: ["IM308"], criticality: 1 },
      { id: "IM403", name: "Legislación y Ejercicio Profesional", regimen: "1º C.", hours: "-", cursarReg: ["IM308"], cursarAprob: [], rendirAprob: ["IM308"], criticality: 1 },
      { id: "IM404", name: "Análisis de Señales y Circuitos", regimen: "1º C.", hours: "-", cursarReg: ["IM301", "IM307"], cursarAprob: [], rendirAprob: ["IM301", "IM307"], criticality: 1 },
      { id: "IM405", name: "Mecanismos y Elementos de Máquinas", regimen: "2º C.", hours: "-", cursarReg: ["IM302", "IM309", "IM304"], cursarAprob: ["IM303"], rendirAprob: ["IM302", "IM309", "IM304", "IM303"], criticality: 1 },
      { id: "IM406", name: "Tecnología de los Procesos de Producción", regimen: "2º C.", hours: "-", cursarReg: ["IM304", "IM309"], cursarAprob: ["IM303"], rendirAprob: ["IM303", "IM304", "IM309"], criticality: 1 },
      { id: "IM407", name: "Control Automático", regimen: "2º C.", hours: "-", cursarReg: ["IM305", "IM306", "IM307", "IM401", "IM404"], cursarAprob: [], rendirAprob: ["IM305", "IM306", "IM307", "IM401", "IM404"], criticality: 1 },
      { id: "IM408", name: "Medición e Instrumentación Industrial", regimen: "2º C.", hours: "-", cursarReg: ["IM306", "IM307", "IM301"], cursarAprob: [], rendirAprob: ["IM306", "IM307", "IM301"], criticality: 1 },
      { id: "IM409", name: "Inglés 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: ["IM204", "IM205", "IM206", "IM207", "IM208"], rendirAprob: ["IM204", "IM205", "IM206", "IM207", "IM208"], criticality: 1 }
    ],
    "5": [
      { id: "IM501", name: "Sistemas de Control Inteligente", regimen: "1º C.", hours: "-", cursarReg: ["IM401", "IM404", "IM407"], cursarAprob: [], rendirAprob: ["IM401", "IM404", "IM407"], criticality: 1 },
      { id: "IM502", name: "Procesamiento de Señales", regimen: "1º C.", hours: "-", cursarReg: ["IM401", "IM404"], cursarAprob: [], rendirAprob: ["IM401", "IM404"], criticality: 1 },
      { id: "IM503", name: "Robótica Industrial", regimen: "1º C.", hours: "-", cursarReg: ["IM401", "IM404", "IM407", "IM408"], cursarAprob: ["IM305", "IM309"], rendirAprob: ["IM305", "IM309", "IM401", "IM404", "IM407", "IM408"], criticality: 1 },
      { id: "IM504", name: "Redes de Comunicación Industriales", regimen: "2º C.", hours: "-", cursarReg: ["IM404", "IM408"], cursarAprob: [], rendirAprob: ["IM404", "IM408"], criticality: 1 },
      { id: "IM505", name: "Instalaciones Hidráulicas y Neumáticas", regimen: "2º C.", hours: "-", cursarReg: ["IM405", "IM407"], cursarAprob: [], rendirAprob: ["IM405", "IM407"], criticality: 1 },
      { id: "IM506", name: "Higiene, Seguridad y Medio Ambiente", regimen: "2º C.", hours: "-", cursarReg: ["IM403"], cursarAprob: [], rendirAprob: ["IM403"], criticality: 1 },
      { id: "IM507", name: "Proyecto Mecatrónico", regimen: "Anual", hours: "-", cursarReg: ["IM405", "IM406", "IM407", "IM408"], cursarAprob: ["IM401", "IM402", "IM403", "IM404"], rendirAprob: ["ALL"], criticality: 1 }
    ]
  }
};