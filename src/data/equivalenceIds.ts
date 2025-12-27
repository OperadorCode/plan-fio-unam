/**
 * DICCIONARIO CENTRAL DE EQUIVALENCIAS (Namespaces)
 * -------------------------------------------------
 * Este archivo define los códigos únicos para conectar materias entre
 * distintos planes y carreras (Civil, Electro, Computación, Industrial).
 * * ESTRATEGIA: [ÁREA]_[MATERIA]_[NIVEL]
 * Agrupamos por Departamento Académico, no por Carrera.
 */

export const EQUIVALENCE_IDS = {

  // --- CIENCIAS BÁSICAS (Comunes a casi todas las ingenierías) ---
  BASICAS: {
    // Matemática
    ALGEBRA: 'BAS_ALGEBRA_GEOMETRIA', // Algebra y Geometría Analítica
    CALCULO_1: 'BAS_CALCULO_1',       // Análisis Matemático I / Cálculo 1
    CALCULO_2: 'BAS_CALCULO_2',       // Análisis Matemático II / Cálculo 2
    MATEMATICA_APLICADA: 'BAS_MATEMATICA_APLICADA', // Matemática Aplicada
    PROBABILIDAD: 'BAS_PROBABILIDAD', // Probabilidad y Estadística
    ANALISIS_NUMERICO: 'BAS_ANALISIS_NUMERICO',

    // Física
    FISICA_1: 'BAS_FISICA_1',         // Mecánica Clásica / Física I
    FISICA_2: 'BAS_FISICA_2',         // Electromagnetismo / Física II 

    // Química
    QUIMICA_GRAL: 'BAS_QUIMICA_GENERAL',

    // Representación
    SIST_REP: 'BAS_SIST_REPRESENTACION', // Sistemas de Rep. / Dibujo Técnico
  },

  // --- MATERIAS GENERALES / HUMANIDADES ---
  GENERALES: {
    ING_SOCIEDAD: 'GEN_ING_SOCIEDAD',     // Ingeniería y Sociedad
    INGLES_1: 'GEN_INGLES_1',
    INGLES_2: 'GEN_INGLES_2',
    ECONOMIA: 'GEN_ECONOMIA',             // Economía General
    LEGISLACION: 'GEN_LEGISLACION',       // Legislación / Derecho
    HIGIENE_SEGURIDAD: 'GEN_HIGIENE_SEGURIDAD',
  },

  // --- CIENCIAS TECNOLÓGICAS BÁSICAS (Intersección Civil/Electro/Mecánica) ---
  ESTRUCTURAS: {
    MECANICA_RACIONAL: 'EST_MECANICA_RACIONAL', // Mecánica Racional 
    ESTATICA: 'EST_ESTATICA',                   // Estabilidad I
    RESISTENCIA: 'EST_RESISTENCIA_MAT',         // Estabilidad II / Resistencia
    FLUIDOS: 'EST_MECANICA_FLUIDOS',            // Mecánica de los Fluidos
    CIENCIA_MATERIALES: 'EST_CIENCIA_MATERIALES',
  },

  // --- TERMODINÁMICA Y MÁQUINAS (Común Electro/Industrial) ---
  TERMODINAMICA: {
    TERMODINAMICA: 'TERM_TERMODINAMICA',
    MAQUINAS_TERMICAS: 'TERM_MAQUINAS_TERMICAS',
  },

  // --- ESPECÍFICAS DE INGENIERÍA CIVIL ---
  CIVIL: {
    TOPOGRAFIA: 'CIV_TOPOGRAFIA',
    MATERIALES_CONSTRUCCION: 'CIV_MATERIALES_CONST',
    VIAS_COM_1: 'CIV_VIAS_COM_1',
    VIAS_COM_2: 'CIV_VIAS_COM_2',
    HORMIGON_1: 'CIV_HORMIGON_1',
    HORMIGON_2: 'CIV_HORMIGON_2',
    HIDRAULICA: 'CIV_HIDRAULICA_GRAL',
    GEOTECNIA: 'CIV_GEOTECNIA',
    METALICAS: 'CIV_ESTRUCTURAS_METALICAS',
    SANITARIA: 'CIV_ING_SANITARIA',
    CONSTRUCCION_EDIFICIOS: 'CIV_CONST_EDIFICIOS',
  },

  // --- ESPECÍFICAS DE ELECTROMECÁNICA ---
  ELECTRO: {
    ELECTROTECNIA_1: 'ELE_ELECTROTECNIA_1',
    ELECTROTECNIA_2: 'ELE_ELECTROTECNIA_2',
    MAQUINAS_ELEC: 'ELE_MAQUINAS_ELECTRICAS',
    INSTALACIONES: 'ELE_INSTALACIONES',
    ELECTRONICA: 'ELE_ELECTRONICA_IND',
  },

  // --- ESPECÍFICAS DE COMPUTACIÓN / INFORMÁTICA ---
  COMPUTACION: {
    PROGRAMACION_1: 'COM_PROGRAMACION_1', // Algoritmos y Estructuras de Datos
    PROGRAMACION_2: 'COM_PROGRAMACION_2', // Paradigmas / Sintaxis
    SISTEMAS_OPERATIVOS: 'COM_SISTEMAS_OPERATIVOS',
    BASES_DE_DATOS: 'COM_BASES_DATOS',
    ARQUITECTURA: 'COM_ARQUITECTURA',
    REDES: 'COM_REDES_DATOS',
    ING_SOFTWARE: 'COM_ING_SOFTWARE',
  },

  // --- ESPECÍFICAS DE INDUSTRIAL ---
  INDUSTRIAL: {
    ESTUDIO_TRABAJO: 'IND_ESTUDIO_TRABAJO',
    INVESTIGACION_OPERATIVA: 'IND_INVESTIGACION_OP',
    COSTOS: 'IND_COSTOS_PRESUPUESTOS',
    CALIDAD: 'IND_GESTION_CALIDAD',
    PROCESOS: 'IND_PROCESOS_INDUSTRIALES',
  }
} as const;