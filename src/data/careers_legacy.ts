import type { CareersDB } from '../types';

export const careerPlans: CareersDB = {
  'civil': {
                name: 'Ingeniería Civil',
                planYear: '2013',
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
            },
            'industrial': {
                name: 'Ingeniería Industrial',
                planYear: '2013',
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
            },
            'higiene': {
                name: 'Lic. en Higiene y Seguridad en el Trabajo',
                planYear: '2012',
                coursesData: {
                    "1": [
                        { id: "HST111", name: "Algebra y Geometría Analítica", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
                        { id: "HST112", name: "Cálculo 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
                        { id: "HST113", name: "Física 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
                        { id: "HST213", name: "Química", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 },
                        { id: "HST011", name: "Taller de Inglés 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: [], rendirAprob: [], criticality: 1 }
                    ],
                    "2": [
                        { id: "HST700", name: "HST I-Introducción", regimen: "1º C.", hours: "-", cursarReg: ["HST111","HST112","HST113","HST213","HST011"], cursarAprob: [], rendirAprob: ["HST111","HST112","HST113","HST213","HST011"], criticality: 1 },
                        { id: "HST701", name: "HST II-Derecho del Trabajo", regimen: "1º C.", hours: "-", cursarReg: ["HST111","HST112","HST113","HST213","HST011"], cursarAprob: [], rendirAprob: ["HST111","HST112","HST113","HST213","HST011"], criticality: 1 },
                        { id: "HST702", name: "HST III-Medicina del Trabajo", regimen: "1º C.", hours: "-", cursarReg: ["HST111","HST112","HST113","HST213","HST011"], cursarAprob: [], rendirAprob: ["HST111","HST112","HST113","HST213","HST011"], criticality: 1 },
                        { id: "HST703", name: "HST IV-Establecimientos", regimen: "1º C.", hours: "-", cursarReg: ["HST111","HST112","HST113","HST213","HST011"], cursarAprob: [], rendirAprob: ["HST111","HST112","HST113","HST213","HST011"], criticality: 1 },
                        { id: "HST704", name: "HST V-Carga Térmica", regimen: "1º C.", hours: "-", cursarReg: ["HST111","HST112","HST113","HST213","HST011"], cursarAprob: [], rendirAprob: ["HST111","HST112","HST113","HST213","HST011"], criticality: 1 },
                        { id: "HST705", name: "HST VI-Contaminación Química", regimen: "2º C.", hours: "-", cursarReg: ["HST700","HST701","HST702","HST703","HST704"], cursarAprob: ["HST213","HST113"], rendirAprob: ["HST700","HST701","HST702","HST703","HST704"], criticality: 1 },
                        { id: "HST706", name: "HST VII-Radiaciones", regimen: "2º C.", hours: "-", cursarReg: ["HST700","HST701","HST702","HST703","HST704"], cursarAprob: ["HST213","HST113"], rendirAprob: ["HST700","HST701","HST702","HST703","HST704"], criticality: 1 },
                        { id: "HST707", name: "HST VIII-Soldadura", regimen: "2º C.", hours: "-", cursarReg: ["HST700","HST701","HST702","HST703","HST704"], cursarAprob: ["HST213","HST113"], rendirAprob: ["HST700","HST701","HST702","HST703","HST704"], criticality: 1 },
                        { id: "HST708", name: "HST IX-Iluminación y Color", regimen: "2º C.", hours: "-", cursarReg: ["HST700","HST701","HST702","HST703","HST704"], cursarAprob: ["HST213","HST113"], rendirAprob: ["HST700","HST701","HST702","HST703","HST704"], criticality: 1 },
                        { id: "HST709", name: "HST X-Ruido", regimen: "2º C.", hours: "-", cursarReg: ["HST700","HST701","HST702","HST703","HST704"], cursarAprob: ["HST213","HST113"], rendirAprob: ["HST700","HST701","HST702","HST703","HST704"], criticality: 1 },
                        { id: "HST710", name: "HST XI-Electricidad", regimen: "2º C.", hours: "-", cursarReg: ["HST700","HST701","HST702","HST703","HST704"], cursarAprob: ["HST213","HST113"], rendirAprob: ["HST700","HST701","HST702","HST703","HST704"], criticality: 1 },
                        { id: "HST711", name: "HST XII-Máquinas y Herramientas", regimen: "2º C.", hours: "-", cursarReg: ["HST700","HST701","HST702","HST703","HST704"], cursarAprob: ["HST213","HST113"], rendirAprob: ["HST700","HST701","HST702","HST703","HST704"], criticality: 1 }
                    ],
                    "3": [
                        { id: "HST712", name: "HST XIII-Fuego", regimen: "1º C.", hours: "-", cursarReg: ["HST706","HST707","HST708","HST709","HST710","HST711"], cursarAprob: ["HST700","HST701","HST702","HST703","HST704","HST705"], rendirAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], criticality: 1 },
                        { id: "HST713", name: "HST XIV-Elementos de Protección Personal", regimen: "1º C.", hours: "-", cursarReg: ["HST706","HST707","HST708","HST709","HST710","HST711"], cursarAprob: ["HST700","HST701","HST702","HST703","HST704","HST705"], rendirAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], criticality: 1 },
                        { id: "HST714", name: "HST XV-Selección y Capacitación de Personal", regimen: "1º C.", hours: "-", cursarReg: ["HST706","HST707","HST708","HST709","HST710","HST711"], cursarAprob: ["HST700","HST701","HST702","HST703","HST704","HST705"], rendirAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], criticality: 1 },
                        { id: "HST715", name: "HST XVI-Costos e Indicadores", regimen: "1º C.", hours: "-", cursarReg: ["HST706","HST707","HST708","HST709","HST710","HST711"], cursarAprob: ["HST700","HST701","HST702","HST703","HST704","HST705"], rendirAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], criticality: 1 },
                        { id: "HST716", name: "HST XVII-Ergonomía", regimen: "1º C.", hours: "-", cursarReg: ["HST706","HST707","HST708","HST709","HST710","HST711"], cursarAprob: ["HST700","HST701","HST702","HST703","HST704","HST705"], rendirAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], criticality: 1 },
                        { id: "HST717", name: "HST XVIII-Trabajos Rurales", regimen: "1º C.", hours: "-", cursarReg: ["HST706","HST707","HST708","HST709","HST710","HST711"], cursarAprob: ["HST700","HST701","HST702","HST703","HST704","HST705"], rendirAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], criticality: 1 },
                        { id: "HST718", name: "Metodología de la Investigación", regimen: "2º C.", hours: "-", cursarReg: ["HST712","HST713","HST714","HST715","HST716","HST717"], cursarAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], rendirAprob: ["HST712","HST713","HST714","HST715","HST716","HST717"], criticality: 1 },
                        { id: "HST222", name: "Termodinámica y Máquinas", regimen: "2º C.", hours: "-", cursarReg: ["HST712","HST713","HST714","HST715","HST716","HST717"], cursarAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], rendirAprob: ["HST712","HST713","HST714","HST715","HST716","HST717"], criticality: 1 },
                        { id: "HST451", name: "Economía y Organización de la Producción", regimen: "2º C.", hours: "-", cursarReg: ["HST712","HST713","HST714","HST715","HST716","HST717"], cursarAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], rendirAprob: ["HST712","HST713","HST714","HST715","HST716","HST717"], criticality: 1 },
                        { id: "HST219", name: "Probabilidad y Estadística", regimen: "2º C.", hours: "-", cursarReg: ["HST712","HST713","HST714","HST715","HST716","HST717"], cursarAprob: ["HST706","HST707","HST708","HST709","HST710","HST711"], rendirAprob: ["HST712","HST713","HST714","HST715","HST716","HST717"], criticality: 1 }
                    ],
                    "4": [
                        { id: "HST321", name: "Electrotecnia", regimen: "1º C.", hours: "-", cursarReg: ["HST718","HST222","HST451","HST219"], cursarAprob: ["HST712","HST713","HST714","HST715","HST716","HST717"], rendirAprob: ["HST718","HST222","HST451","HST219"], criticality: 1 },
                        { id: "HST322", name: "Mecánica de los Fluidos y Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["HST718","HST222","HST451","HST219"], cursarAprob: ["HST712","HST713","HST714","HST715","HST716","HST717"], rendirAprob: ["HST718","HST222","HST451","HST219"], criticality: 1 },
                        { id: "HST719", name: "Taller de Tesis", regimen: "1º C.", hours: "-", cursarReg: ["HST718","HST222","HST451","HST219"], cursarAprob: ["HST712","HST713","HST714","HST715","HST716","HST717"], rendirAprob: ["HST718","HST222","HST451","HST219"], criticality: 1 },
                        { id: "HST012", name: "Taller de Inglés 2", regimen: "Anual", hours: "-", cursarReg: ["HST718","HST222","HST451","HST219"], cursarAprob: ["HST712","HST713","HST714","HST715","HST716","HST717"], rendirAprob: ["HST718","HST222","HST451","HST219"], criticality: 1 },
                        { id: "HST720", name: "Tesis", regimen: "2º C.", hours: "-", cursarReg: ["HST712", "HST713", "HST714", "HST715", "HST716", "HST717"], cursarAprob: [], rendirAprob: ["ALL"], criticality: 1 }
                    ]
                }
            },
            'electronica': {
                name: 'Ingeniería Electrónica',
                planYear: '2013',
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
                        { id: "ET211", name: "Cálculo 2", regimen: "1º C.", hours: "-", cursarReg: ["ET111","ET112","ET121"], cursarAprob: [], rendirAprob: ["ET111","ET112","ET121"], criticality: 1 },
                        { id: "ET213", name: "Probabilidad y Estadística 1", regimen: "1º C.", hours: "-", cursarReg: ["ET111","ET112"], cursarAprob: [], rendirAprob: ["ET111","ET112"], criticality: 1 },
                        { id: "ET221", name: "Física 2", regimen: "1º C.", hours: "-", cursarReg: ["ET111","ET112","ET121"], cursarAprob: [], rendirAprob: ["ET111","ET112","ET121"], criticality: 1 },
                        { id: "ET241", name: "Informática", regimen: "1º C.", hours: "-", cursarReg: ["ET111","ET112"], cursarAprob: [], rendirAprob: ["ET111","ET112"], criticality: 1 },
                        { id: "ET212", name: "Matemática Aplicada", regimen: "2º C.", hours: "-", cursarReg: ["ET211","ET221"], cursarAprob: ["ET111","ET112"], rendirAprob: ["ET211","ET221"], criticality: 1 },
                        { id: "ET242", name: "Tecnología Electrónica", regimen: "2º C.", hours: "-", cursarReg: ["ET221"], cursarAprob: ["ET121"], rendirAprob: ["ET221"], criticality: 1 },
                        { id: "ET243", name: "Física 3", regimen: "2º C.", hours: "-", cursarReg: ["ET122","ET211","ET213","ET221"], cursarAprob: ["ET121"], rendirAprob: ["ET122","ET211","ET213","ET221"], criticality: 1 },
                        { id: "ET261", name: "Ingeniería e Industrias", regimen: "2º C.", hours: "-", cursarReg: ["ET131","ET161"], cursarAprob: [], rendirAprob: ["ET131","ET161"], criticality: 1 }
                    ],
                    "3": [
                        { id: "ET342", name: "Análisis de Circuitos", regimen: "1º C.", hours: "-", cursarReg: ["ET212"], cursarAprob: [], rendirAprob: ["ET212"], criticality: 1 },
                        { id: "ET343", name: "Señales y Sistemas", regimen: "1º C.", hours: "-", cursarReg: ["ET212"], cursarAprob: [], rendirAprob: ["ET212"], criticality: 1 },
                        { id: "ET344", name: "Computación", regimen: "1º C.", hours: "-", cursarReg: ["ET211"], cursarAprob: ["ET241"], rendirAprob: ["ET212","ET241"], criticality: 1 },
                        { id: "ET345", name: "Dispositivos Electrónicos", regimen: "1º C.", hours: "-", cursarReg: ["ET242","ET243"], cursarAprob: [], rendirAprob: ["ET242","ET243"], criticality: 1 },
                        { id: "ET339", name: "Máquinas e Instalaciones Eléctricas", regimen: "2º C.", hours: "-", cursarReg: ["ET342"], cursarAprob: ["ET221"], rendirAprob: ["ET342"], criticality: 1 },
                        { id: "ET346", name: "Electromagnetismo", regimen: "2º C.", hours: "-", cursarReg: ["ET212","ET243"], cursarAprob: ["ET221"], rendirAprob: ["ET212","ET243"], criticality: 1 },
                        { id: "ET347", name: "Electrónica Analógica", regimen: "2º C.", hours: "-", cursarReg: ["ET342","ET343","ET345"], cursarAprob: ["ET221"], rendirAprob: ["ET342","ET343","ET345"], criticality: 1 },
                        { id: "ET365", name: "Inglés 1", regimen: "Anual", hours: "-", cursarReg: ["ET261"], cursarAprob: [], rendirAprob: ["ET261"], criticality: 1 }
                    ],
                    "4": [
                        { id: "ET441", name: "Mediciones Electrónicas", regimen: "1º C.", hours: "-", cursarReg: ["ET347"], cursarAprob: [], rendirAprob: ["ET347"], criticality: 1 },
                        { id: "ET442", name: "Técnicas Digitales 1", regimen: "1º C.", hours: "-", cursarReg: ["ET347"], cursarAprob: [], rendirAprob: ["ET347"], criticality: 1 },
                        { id: "ET443", name: "Sistemas de Control 1", regimen: "1º C.", hours: "-", cursarReg: ["ET347"], cursarAprob: [], rendirAprob: ["ET347"], criticality: 1 },
                        { id: "ET468", name: "Economía y Organización de la Producción", regimen: "1º C.", hours: "-", cursarReg: [], cursarAprob: ["ET261"], rendirAprob: ["ET261"], criticality: 1 },
                        { id: "ET444", name: "Propagación y Antenas", regimen: "2º C.", hours: "-", cursarReg: ["ET346"], cursarAprob: [], rendirAprob: ["ET346"], criticality: 1 },
                        { id: "ET445", name: "Sistemas de Control 2", regimen: "2º C.", hours: "-", cursarReg: ["ET443"], cursarAprob: ["ET343"], rendirAprob: ["ET343","ET443"], criticality: 1 },
                        { id: "ET446", name: "Técnicas Digitales 2", regimen: "2º C.", hours: "-", cursarReg: ["ET344","ET442"], cursarAprob: [], rendirAprob: ["ET344","ET442"], criticality: 1 },
                        { id: "ET469", name: "Inglés 2", regimen: "Anual", hours: "-", cursarReg: ["ET365"], cursarAprob: [], rendirAprob: ["ET365"], criticality: 1 }
                    ],
                    "5": [
                        { id: "ET541", name: "Electrónica de Potencia", regimen: "1º C.", hours: "-", cursarReg: ["ET441","ET445"], cursarAprob: ["ET339"], rendirAprob: ["ET339","ET441","ET445"], criticality: 1 },
                        { id: "ET542", name: "Comunicaciones 1", regimen: "1º C.", hours: "-", cursarReg: ["ET441","ET442"], cursarAprob: [], rendirAprob: ["ET441","ET442"], criticality: 1 },
                        { id: "ET462", name: "Legislación y Ejercicio Profesional", regimen: "1º C.", hours: "-", cursarReg: ["ET468"], cursarAprob: [], rendirAprob: ["ET468"], criticality: 1 },
                        { id: "ET466", name: "Higiene, Seguridad y Medio Ambiente", regimen: "2º C.", hours: "-", cursarReg: ["ET462"], cursarAprob: [], rendirAprob: ["ET462"], criticality: 1 },
                        { id: "ET543", name: "Procesamiento de Señales", regimen: "2º C.", hours: "-", cursarReg: ["ET446"], cursarAprob: [], rendirAprob: ["ET446"], criticality: 1 },
                        { id: "ET544", name: "Comunicaciones 2", regimen: "2º C.", hours: "-", cursarReg: ["ET542"], cursarAprob: [], rendirAprob: ["ET542"], criticality: 1 },
                        { id: "ET545", name: "Instrumentación y Automatismos Industriales", regimen: "2º C.", hours: "-", cursarReg: ["ET441","ET445","ET446","ET542"], cursarAprob: [], rendirAprob: ["ET441","ET445","ET446","ET542"], criticality: 1 },
                        { id: "ET546", name: "Proyecto y Diseño Electrónico", regimen: "Anual", hours: "-", cursarReg: ["ET444","ET445","ET446"], cursarAprob: ["ET441","ET442","ET443","ET468"], rendirAprob: ["ALL"], criticality: 1 }
                    ]
                }
            },
            'electromecanica': {
                name: 'Ingeniería Electromecánica',
                planYear: '2013',
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
                        { id: "EM211", name: "Cálculo 2", regimen: "1º C.", hours: "-", cursarReg: ["EM111","EM112","EM121"], cursarAprob: [], rendirAprob: ["EM111","EM112","EM121"], criticality: 1 },
                        { id: "EM213", name: "Probabilidad y Estadística 1", regimen: "1º C.", hours: "-", cursarReg: ["EM111","EM112"], cursarAprob: [], rendirAprob: ["EM111","EM112"], criticality: 1 },
                        { id: "EM221", name: "Física 2", regimen: "1º C.", hours: "-", cursarReg: ["EM111","EM112","EM121"], cursarAprob: [], rendirAprob: ["EM111","EM112","EM121"], criticality: 1 },
                        { id: "EM241", name: "Informática", regimen: "1º C.", hours: "-", cursarReg: ["EM111","EM112"], cursarAprob: [], rendirAprob: ["EM111","EM112"], criticality: 1 },
                        { id: "EM212", name: "Matemática Aplicada", regimen: "2º C.", hours: "-", cursarReg: ["EM211","EM221"], cursarAprob: ["EM111","EM112"], rendirAprob: ["EM111","EM112","EM211","EM221"], criticality: 1 },
                        { id: "EM222", name: "Mecánica Racional", regimen: "2º C.", hours: "-", cursarReg: ["EM211"], cursarAprob: ["EM121"], rendirAprob: ["EM121","EM211"], criticality: 1 },
                        { id: "EM231", name: "Termodinámica", regimen: "2º C.", hours: "-", cursarReg: ["EM122","EM211","EM213"], cursarAprob: ["EM112","EM121"], rendirAprob: ["EM112","EM121","EM122","EM211","EM213"], criticality: 1 },
                        { id: "EM253", name: "Estática y Resistencia de Materiales", regimen: "2º C.", hours: "-", cursarReg: ["EM211"], cursarAprob: ["EM111","EM112","EM121","EM131"], rendirAprob: ["EM111","EM112","EM121","EM131","EM211"], criticality: 1 },
                        { id: "EM261", name: "Ingeniería e Industrias", regimen: "2º C.", hours: "-", cursarReg: ["EM131","EM161"], cursarAprob: [], rendirAprob: ["EM131","EM161"], criticality: 1 }
                    ],
                    "3": [
                        { id: "EM331", name: "Electrotecnia", regimen: "1º C.", hours: "-", cursarReg: ["EM212","EM221"], cursarAprob: [], rendirAprob: ["EM212","EM221"], criticality: 1 },
                        { id: "EM332", name: "Mecánica de los Fluidos y Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["EM212","EM222"], cursarAprob: ["EM211"], rendirAprob: ["EM212","EM222","EM211"], criticality: 1 },
                        { id: "EM333", name: "Diseño Aplicado", regimen: "1º C.", hours: "-", cursarReg: ["EM222","EM253","EM261"], cursarAprob: ["EM241"], rendirAprob: ["EM222","EM253","EM261","EM241"], criticality: 1 },
                        { id: "EM334", name: "Máquinas e Instalaciones Térmicas 1", regimen: "1º C.", hours: "-", cursarReg: ["EM231"], cursarAprob: ["EM211"], rendirAprob: ["EM231","EM211"], criticality: 1 },
                        { id: "EM341", name: "Electrónica", regimen: "1º C.", hours: "-", cursarReg: ["EM212"], cursarAprob: ["EM221"], rendirAprob: ["EM212","EM221"], criticality: 1 },
                        { id: "EM335", name: "Ciencia de los Materiales", regimen: "2º C.", hours: "-", cursarReg: ["EM212","EM231","EM253"], cursarAprob: ["EM211"], rendirAprob: ["EM211","EM212","EM231","EM253"], criticality: 1 },
                        { id: "EM336", name: "Mediciones y Metrología", regimen: "2º C.", hours: "-", cursarReg: ["EM331","EM341"], cursarAprob: ["EM213","EM221"], rendirAprob: ["EM213","EM221","EM331","EM341"], criticality: 1 },
                        { id: "EM337", name: "Máquinas Eléctricas", regimen: "2º C.", hours: "-", cursarReg: ["EM331","EM341"], cursarAprob: ["EM221"], rendirAprob: ["EM221","EM331","EM341"], criticality: 1 },
                        { id: "EM466", name: "Higiene, Seguridad y Medio Ambiente", regimen: "2º C.", hours: "-", cursarReg: ["EM231","EM331"], cursarAprob: ["EM221","EM261"], rendirAprob: ["EM221","EM261","EM231","EM331"], criticality: 1 }
                    ],
                    "4": [
                        { id: "EM431", name: "Elementos de Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["EM332","EM335","EM333"], cursarAprob: ["EM212","EM253"], rendirAprob: ["EM212","EM332","EM335","EM333","EM253"], criticality: 1 },
                        { id: "EM432", name: "Máquinas e Instalaciones Térmicas 2", regimen: "1º C.", hours: "-", cursarReg: ["EM332","EM334"], cursarAprob: ["EM231","EM212"], rendirAprob: ["EM231","EM212","EM332","EM334"], criticality: 1 },
                        { id: "EM468", name: "Economía y Organización de la Producción", regimen: "1º C.", hours: "-", cursarReg: ["EM466"], cursarAprob: ["EM261"], rendirAprob: ["EM261","EM466"], criticality: 1 },
                        { id: "EM462", name: "Legislación y Ejercicio Profesional", regimen: "1º C.", hours: "-", cursarReg: ["EM466"], cursarAprob: ["EM261"], rendirAprob: ["EM261","EM466"], criticality: 1 },
                        { id: "EM434", name: "Mecanismos y Elementos de Máquinas", regimen: "2º C.", hours: "-", cursarReg: ["EM431"], cursarAprob: ["EM332","EM333"], rendirAprob: ["EM332","EM333","EM431"], criticality: 1 },
                        { id: "EM436", name: "Climatización y Frío Industrial", regimen: "2º C.", hours: "-", cursarReg: ["EM337","EM432"], cursarAprob: ["EM331","EM341"], rendirAprob: ["EM331","EM341","EM337","EM432"], criticality: 1 },
                        { id: "EM437", name: "Tecnología de los Procesos de Producción", regimen: "2º C.", hours: "-", cursarReg: ["EM431"], cursarAprob: ["EM333"], rendirAprob: ["EM333","EM431"], criticality: 1 },
                        { id: "EM438", name: "Centrales de Energía", regimen: "2º C.", hours: "-", cursarReg: ["EM332","EM337","EM432"], cursarAprob: ["EM331","EM341"], rendirAprob: ["EM331","EM332","EM337","EM341","EM432"], criticality: 1 },
                        { id: "EM365", name: "Inglés 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: ["EM211","EM213","EM221","EM241","EM212","EM222","EM231","EM253","EM261"], rendirAprob: ["EM211","EM213","EM221","EM241","EM212","EM222","EM231","EM253","EM261"], criticality: 1 },
                        { id: "EM433", name: "Proyecto Electromecánico 1", regimen: "Anual", hours: "-", cursarReg: ["EM335","EM336","EM466"], cursarAprob: ["EM253","EM333"], rendirAprob: ["EM253","EM333","EM335","EM336","EM466"], criticality: 1 }
                    ],
                    "5": [
                        { id: "EM531", name: "Mantenimiento", regimen: "1º C.", hours: "-", cursarReg: ["EM434","EM436","EM462","EM438","EM468"], cursarAprob: ["EM337","EM466","EM336"], rendirAprob: ["EM337","EM466","EM336","EM434","EM436","EM462","EM438","EM468"], criticality: 1 },
                        { id: "EM532", name: "Equipamiento Eléctrico de Centrales", regimen: "1º C.", hours: "-", cursarReg: ["EM434","EM468","EM438"], cursarAprob: ["EM336","EM337","EM466"], rendirAprob: ["EM336","EM337","EM434","EM466","EM468","EM438"], criticality: 1 },
                        { id: "EM534", name: "Instalaciones Eléctricas", regimen: "1º C.", hours: "-", cursarReg: ["EM436"], cursarAprob: ["EM336","EM337","EM466"], rendirAprob: ["EM336","EM337","EM466","EM436"], criticality: 1 },
                        { id: "EM535", name: "Sistemas de Control", regimen: "2º C.", hours: "-", cursarReg: ["EM534","EM436"], cursarAprob: ["EM432"], rendirAprob: ["EM432","EM534","EM436"], criticality: 1 },
                        { id: "EM536", name: "Instalaciones Hidráulicas y Neumáticas", regimen: "2º C.", hours: "-", cursarReg: ["EM436"], cursarAprob: ["EM431"], rendirAprob: ["EM431","EM436"], criticality: 1 },
                        { id: "EM537", name: "Transmisión y Distribución de Energía Eléctrica", regimen: "2º C.", hours: "-", cursarReg: ["EM532"], cursarAprob: [], rendirAprob: ["EM532"], criticality: 1 },
                        { id: "EM538", name: "Sistemas Eléctricos de Potencia", regimen: "2º C.", hours: "-", cursarReg: ["EM532","EM534"], cursarAprob: [], rendirAprob: ["EM532","EM534"], criticality: 1 },
                        { id: "EM469", name: "Inglés 2", regimen: "Anual", hours: "-", cursarReg: ["EM365"], cursarAprob: [], rendirAprob: ["EM365"], criticality: 1 },
                        { id: "EM533", name: "Proyecto Electromecánico 2", regimen: "Anual", hours: "-", cursarReg: ["EM433","EM434","EM436","EM462","EM468","EM437"], cursarAprob: [], rendirAprob: ["ALL"], criticality: 1 }
                    ]
                }
            },
            'computacion': {
                name: 'Ingeniería en Computación',
                planYear: '2018',
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
                        { id: "IC211", name: "Matemática II", regimen: "1º C.", hours: "-", cursarReg: ["IC101","IC102"], cursarAprob: [], rendirAprob: ["IC101","IC102"], criticality: 1 },
                        { id: "IC212", name: "Física Mecánica", regimen: "1º C.", hours: "-", cursarReg: ["IC101","IC102"], cursarAprob: [], rendirAprob: ["IC101","IC102"], criticality: 1 },
                        { id: "IC213", name: "Fundamentos de Computación I", regimen: "1º C.", hours: "-", cursarReg: ["IC111"], cursarAprob: [], rendirAprob: ["IC111"], criticality: 1 },
                        { id: "IC221", name: "Arquitectura de Computadoras", regimen: "2º C.", hours: "-", cursarReg: ["IC111"], cursarAprob: [], rendirAprob: ["IC111"], criticality: 1 },
                        { id: "IC222", name: "Matemática III", regimen: "2º C.", hours: "-", cursarReg: ["IC211"], cursarAprob: [], rendirAprob: ["IC211"], criticality: 1 },
                        { id: "IC223", name: "Electricidad y Electromagnetismo", regimen: "2º C.", hours: "-", cursarReg: ["IC211","IC212"], cursarAprob: [], rendirAprob: ["IC211","IC212"], criticality: 1 },
                        { id: "IC224", name: "Programación", regimen: "2º C.", hours: "-", cursarReg: ["IC103","IC213"], cursarAprob: [], rendirAprob: ["IC103","IC213"], criticality: 1 }
                    ],
                    "3": [
                        { id: "IC311", name: "Probabilidad y Estadística", regimen: "1º C.", hours: "-", cursarReg: ["IC211"], cursarAprob: ["IC101","IC102"], rendirAprob: ["IC211"], criticality: 1 },
                        { id: "IC312", name: "Circuitos Eléctricos", regimen: "1º C.", hours: "-", cursarReg: ["IC223"], cursarAprob: ["IC101","IC102"], rendirAprob: ["IC223"], criticality: 1 },
                        { id: "IC313", name: "Materiales y Dispositivos Electrónicos", regimen: "1º C.", hours: "-", cursarReg: ["IC122","IC223"], cursarAprob: ["IC101","IC102"], rendirAprob: ["IC122","IC223"], criticality: 1 },
                        { id: "IC314", name: "Organización Empresarial", regimen: "1º C.", hours: "-", cursarReg: ["IC211"], cursarAprob: ["IC111"], rendirAprob: ["IC111"], criticality: 1 },
                        { id: "IC315", name: "Sistemas Operativos", regimen: "1º C.", hours: "-", cursarReg: ["IC103","IC221"], cursarAprob: ["IC111"], rendirAprob: ["IC103","IC221"], criticality: 1 },
                        { id: "IC321", name: "Electrónica Analógica", regimen: "2º C.", hours: "-", cursarReg: ["IC313"], cursarAprob: [], rendirAprob: ["IC313"], criticality: 1 },
                        { id: "IC322", name: "Fundamentos de Computación II", regimen: "2º C.", hours: "-", cursarReg: ["IC213"], cursarAprob: ["IC103","IC111"], rendirAprob: ["IC103","IC213"], criticality: 1 },
                        { id: "IC323", name: "Comunicación de Datos", regimen: "2º C.", hours: "-", cursarReg: ["IC222","IC223"], cursarAprob: ["IC101","IC102"], rendirAprob: ["IC222","IC223"], criticality: 1 },
                        { id: "IC324", name: "Señales y Sistemas", regimen: "2º C.", hours: "-", cursarReg: ["IC222"], cursarAprob: ["IC101","IC102"], rendirAprob: ["IC222"], criticality: 1 }
                    ],
                    "4": [
                        { id: "IC411", name: "Sistemas Digitales", regimen: "1º C.", hours: "-", cursarReg: ["IC321"], cursarAprob: ["IC211","IC212","IC213"], rendirAprob: ["IC211","IC212","IC213","IC321"], criticality: 1 },
                        { id: "IC412", name: "Redes I", regimen: "1º C.", hours: "-", cursarReg: ["IC221","IC323"], cursarAprob: ["IC211","IC212","IC213"], rendirAprob: ["IC213","IC221","IC323"], criticality: 1 },
                        { id: "IC413", name: "Ingeniería de Software I", regimen: "1º C.", hours: "-", cursarReg: ["IC224","IC311","IC314"], cursarAprob: ["IC211","IC212","IC213"], rendirAprob: ["IC211","IC212","IC224","IC311","IC314"], criticality: 1 },
                        { id: "IC414", name: "Base de Datos", regimen: "1º C.", hours: "-", cursarReg: ["IC224"], cursarAprob: ["IC211","IC212","IC213"], rendirAprob: ["IC211","IC212","IC224"], criticality: 1 },
                        { id: "IC415", name: "Inteligencia Computacional", regimen: "1º C.", hours: "-", cursarReg: ["IC224","IC322","IC411"], cursarAprob: [], rendirAprob: ["IC224","IC322","IC411"], criticality: 1 },
                        { id: "IC421", name: "Redes II", regimen: "2º C.", hours: "-", cursarReg: ["IC412"], cursarAprob: ["IC221","IC224","IC323"], rendirAprob: ["IC224","IC412"], criticality: 1 },
                        { id: "IC422", name: "Sistemas Embebidos", regimen: "2º C.", hours: "-", cursarReg: ["IC323","IC411"], cursarAprob: ["IC221","IC222","IC223","IC224"], rendirAprob: ["IC224","IC411"], criticality: 1 },
                        { id: "IC423", name: "Ingeniería de Software II", regimen: "2º C.", hours: "-", cursarReg: ["IC413"], cursarAprob: ["IC221","IC222","IC223","IC224"], rendirAprob: ["IC221","IC222","IC223","IC413"], criticality: 1 },
                        { id: "IC424", name: "Sistemas de Control y Automatización", regimen: "2º C.", hours: "-", cursarReg: ["IC324","IC411"], cursarAprob: ["IC221","IC222","IC223","IC224"], rendirAprob: ["IC224","IC324","IC411"], criticality: 1 }
                    ],
                    "5": [
                        { id: "IC511", name: "Internet de las Cosas, Sensores y Redes", regimen: "1º C.", hours: "-", cursarReg: ["IC421","IC422"], cursarAprob: ["IC311","IC312","IC313","IC314","IC315","IC411","IC412"], rendirAprob: ["IC311","IC312","IC313","IC314","IC315","IC421","IC422"], criticality: 1 },
                        { id: "IC512", name: "Procesamiento Digital de Señales", regimen: "1º C.", hours: "-", cursarReg: ["IC324","IC422"], cursarAprob: ["IC311","IC312","IC313","IC314","IC315"], rendirAprob: ["IC311","IC312","IC313","IC314","IC315","IC324","IC422"], criticality: 1 },
                        { id: "IC513", name: "Economía", regimen: "1º C.", hours: "-", cursarReg: [], cursarAprob: ["IC311","IC312","IC313","IC314","IC315"], rendirAprob: ["IC311","IC312","IC313","IC314","IC315"], criticality: 1 },
                        { id: "IC514", name: "Higiene, Seguridad y Medio Ambiente", regimen: "1º C.", hours: "-", cursarReg: [], cursarAprob: ["IC311","IC312","IC313","IC314","IC315"], rendirAprob: ["IC311","IC312","IC313","IC314","IC315"], criticality: 1 },
                        { id: "IC515", name: "Gestión de Proyectos", regimen: "1º C.", hours: "-", cursarReg: ["IC413"], cursarAprob: ["IC311","IC312","IC313","IC314","IC315"], rendirAprob: ["IC312","IC313","IC315","IC413"], criticality: 1 },
                        { id: "IC521", name: "Legislación", regimen: "2º C.", hours: "-", cursarReg: [], cursarAprob: ["IC321","IC322","IC323","IC324"], rendirAprob: ["IC321","IC322","IC323","IC324"], criticality: 1 },
                        { id: "IC522", name: "Proyecto Final Integrador", regimen: "2º C.", hours: "-", cursarReg: ["IC422","IC515"], cursarAprob: ["IC321","IC322","IC323","IC324"], rendirAprob: ["IC321","IC322","IC323","IC324","IC422","IC515"], criticality: 1 },
                        { id: "ICO51", name: "Optativa I", regimen: "2º C.", hours: "-", cursarReg: ["IC321","IC322","IC323","IC324"], cursarAprob: ["IC321","IC322","IC323","IC324"], rendirAprob: [""], criticality: 1 },
                        { id: "ICO52", name: "Optativa II", regimen: "2º C.", hours: "-", cursarReg: ["IC321","IC322","IC323","IC324"], cursarAprob: ["IC321","IC322","IC323","IC324"], rendirAprob: [""], criticality: 1 }
                    ]
                }
            },
            'mecatronica': {
                name: 'Ingeniería Mecatrónica',
                planYear: '2020',
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
                        { id: "IM201", name: "Cálculo II", regimen: "1º C.", hours: "-", cursarReg: ["IM101","IM102"], cursarAprob: [], rendirAprob: ["IM101","IM102"], criticality: 1 },
                        { id: "IM202", name: "Estadística Técnica", regimen: "1º C.", hours: "-", cursarReg: ["IM101","IM102"], cursarAprob: [], rendirAprob: ["IM101","IM102"], criticality: 1 },
                        { id: "IM203", name: "Física II", regimen: "1º C.", hours: "-", cursarReg: ["IM101","IM102","IM103"], cursarAprob: [], rendirAprob: ["IM101","IM102","IM103"], criticality: 1 },
                        { id: "IM204", name: "Informática", regimen: "1º C.", hours: "-", cursarReg: ["IM101","IM102"], cursarAprob: [], rendirAprob: ["IM101","IM102"], criticality: 1 },
                        { id: "IM205", name: "Introducción a la Tecnología Mecatrónica", regimen: "2º C.", hours: "-", cursarReg: ["IM102","IM103","IM203"], cursarAprob: [], rendirAprob: ["IM102","IM103","IM203"], criticality: 1 },
                        { id: "IM206", name: "Matemática Aplicada", regimen: "2º C.", hours: "-", cursarReg: ["IM201","IM203"], cursarAprob: ["IM101","IM102","IM103"], rendirAprob: ["IM101","IM102","IM103","IM201","IM203"], criticality: 1 },
                        { id: "IM207", name: "Termodinámica", regimen: "2º C.", hours: "-", cursarReg: ["IM106","IM201","IM202"], cursarAprob: ["IM102","IM103"], rendirAprob: ["IM102","IM103","IM106","IM201","IM202"], criticality: 1 },
                        { id: "IM208", name: "Estática y Resistencia de Materiales", regimen: "2º C.", hours: "-", cursarReg: ["IM201"], cursarAprob: ["IM101","IM102","IM103","IM105"], rendirAprob: ["IM101","IM102","IM103","IM105","IM201"], criticality: 1 }
                    ],
                    "3": [
                        { id: "IM301", name: "Electrotecnia", regimen: "1º C.", hours: "-", cursarReg: ["IM203","IM206"], cursarAprob: [], rendirAprob: ["IM203","IM206"], criticality: 1 },
                        { id: "IM302", name: "Mecánica de Fluidos y Máquinas", regimen: "1º C.", hours: "-", cursarReg: ["IM206"], cursarAprob: ["IM201"], rendirAprob: ["IM201","IM206"], criticality: 1 },
                        { id: "IM303", name: "Diseño Aplicado", regimen: "1º C.", hours: "-", cursarReg: ["IM208","IM201"], cursarAprob: ["IM204"], rendirAprob: ["IM201","IM204","IM208"], criticality: 1 },
                        { id: "IM304", name: "Tecnología y Selección de Materiales", regimen: "1º C.", hours: "-", cursarReg: ["IM202","IM208"], cursarAprob: [], rendirAprob: ["IM202","IM208"], criticality: 1 },
                        { id: "IM305", name: "Actuadores Electromecánicos", regimen: "2º C.", hours: "-", cursarReg: ["IM206","IM301"], cursarAprob: ["IM203"], rendirAprob: ["IM203","IM206","IM301"], criticality: 1 },
                        { id: "IM306", name: "Sistemas Digitales", regimen: "2º C.", hours: "-", cursarReg: ["IM204","IM205"], cursarAprob: ["IM203"], rendirAprob: ["IM203","IM204","IM205"], criticality: 1 },
                        { id: "IM307", name: "Electrónica Analógica", regimen: "2º C.", hours: "-", cursarReg: ["IM205","IM301"], cursarAprob: ["IM203"], rendirAprob: ["IM203","IM205","IM301"], criticality: 1 },
                        { id: "IM308", name: "Ingeniería e Industrias", regimen: "2º C.", hours: "-", cursarReg: ["IM205"], cursarAprob: [], rendirAprob: ["IM205"], criticality: 1 },
                        { id: "IM309", name: "Mecánica Racional", regimen: "2º C.", hours: "-", cursarReg: ["IM201","IM206"], cursarAprob: [], rendirAprob: ["IM206"], criticality: 1 }
                    ],
                    "4": [
                        { id: "IM401", name: "Programación Avanzada", regimen: "1º C.", hours: "-", cursarReg: ["IM305","IM306"], cursarAprob: [], rendirAprob: ["IM305","IM306"], criticality: 1 },
                        { id: "IM402", name: "Economía y Organización de la Producción", regimen: "1º C.", hours: "-", cursarReg: ["IM308"], cursarAprob: [], rendirAprob: ["IM308"], criticality: 1 },
                        { id: "IM403", name: "Legislación y Ejercicio Profesional", regimen: "1º C.", hours: "-", cursarReg: ["IM308"], cursarAprob: [], rendirAprob: ["IM308"], criticality: 1 },
                        { id: "IM404", name: "Análisis de Señales y Circuitos", regimen: "1º C.", hours: "-", cursarReg: ["IM301","IM307"], cursarAprob: [], rendirAprob: ["IM301","IM307"], criticality: 1 },
                        { id: "IM405", name: "Mecanismos y Elementos de Máquinas", regimen: "2º C.", hours: "-", cursarReg: ["IM302","IM309","IM304"], cursarAprob: ["IM303"], rendirAprob: ["IM302","IM309","IM304","IM303"], criticality: 1 },
                        { id: "IM406", name: "Tecnología de los Procesos de Producción", regimen: "2º C.", hours: "-", cursarReg: ["IM304","IM309"], cursarAprob: ["IM303"], rendirAprob: ["IM303","IM304","IM309"], criticality: 1 },
                        { id: "IM407", name: "Control Automático", regimen: "2º C.", hours: "-", cursarReg: ["IM305","IM306","IM307","IM401","IM404"], cursarAprob: [], rendirAprob: ["IM305","IM306","IM307","IM401","IM404"], criticality: 1 },
                        { id: "IM408", name: "Medición e Instrumentación Industrial", regimen: "2º C.", hours: "-", cursarReg: ["IM306","IM307","IM301"], cursarAprob: [], rendirAprob: ["IM306","IM307","IM301"], criticality: 1 },
                        { id: "IM409", name: "Inglés 1", regimen: "Anual", hours: "-", cursarReg: [], cursarAprob: ["IM204", "IM205", "IM206", "IM207", "IM208"], rendirAprob: ["IM204", "IM205", "IM206", "IM207", "IM208"], criticality: 1 }
                    ],
                    "5": [
                        { id: "IM501", name: "Sistemas de Control Inteligente", regimen: "1º C.", hours: "-", cursarReg: ["IM401","IM404","IM407"], cursarAprob: [], rendirAprob: ["IM401","IM404","IM407"], criticality: 1 },
                        { id: "IM502", name: "Procesamiento de Señales", regimen: "1º C.", hours: "-", cursarReg: ["IM401","IM404"], cursarAprob: [], rendirAprob: ["IM401","IM404"], criticality: 1 },
                        { id: "IM503", name: "Robótica Industrial", regimen: "1º C.", hours: "-", cursarReg: ["IM401","IM404","IM407","IM408"], cursarAprob: ["IM305","IM309"], rendirAprob: ["IM305","IM309","IM401","IM404","IM407","IM408"], criticality: 1 },
                        { id: "IM504", name: "Redes de Comunicación Industriales", regimen: "2º C.", hours: "-", cursarReg: ["IM404","IM408"], cursarAprob: [], rendirAprob: ["IM404","IM408"], criticality: 1 },
                        { id: "IM505", name: "Instalaciones Hidráulicas y Neumáticas", regimen: "2º C.", hours: "-", cursarReg: ["IM405","IM407"], cursarAprob: [], rendirAprob: ["IM405","IM407"], criticality: 1 },
                        { id: "IM506", name: "Higiene, Seguridad y Medio Ambiente", regimen: "2º C.", hours: "-", cursarReg: ["IM403"], cursarAprob: [], rendirAprob: ["IM403"], criticality: 1 },
                        { id: "IM507", name: "Proyecto Mecatrónico", regimen: "Anual", hours: "-", cursarReg: ["IM405","IM406","IM407","IM408"], cursarAprob: ["IM401","IM402","IM403","IM404"], rendirAprob: ["ALL"], criticality: 1 }
                    ]
                }
            }
        };