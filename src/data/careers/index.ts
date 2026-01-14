/**
 * Punto de entrada central para los datos de carreras y planes de estudio.
 *
 * Este archivo consolida las definiciones de los planes de estudio de las distintas
 * especialidades, exportándolas en un registro unificado para facilitar su gestión
 * y consumo dentro de la aplicación.
 */

import type { PlansDB, CareersRegistry, StudyPlan } from "../../types";
import { computacion2018 } from "./computacion/plan2018";
import { civil2013 } from "./civil/plan2013";
import { civil2025 } from "./civil/plan2025";
import { electromecanica2013 } from "./electromecanica/plan2013";
import { electromecanica2025 } from "./electromecanica/plan2025";
import { electronica2013 } from "./electronica/plan2013";
import { electronica2025 } from "./electronica/plan2025";
import { industrial2013 } from "./industrial/plan2013";
import { industrial2025 } from "./industrial/plan2025";
import { mecatronica2020 } from "./mecatronica/plan2020";
import { higiene2012 } from "./higiene_seguridad/plan2012";

export const careerPlans: Record<string, StudyPlan> = {
  computacion: computacion2018,
  civil: civil2013,
  electromecanica: electromecanica2013,
  electronica: electronica2013,
  industrial: industrial2013,
  mecatronica: mecatronica2020,
  higiene: higiene2012,
};

/**
 * --------------------------------------------------------------------------
 * REGISTRO DE CARRERAS
 * --------------------------------------------------------------------------
 * Define la identidad visual de cada carrera y apunta al ID del plan vigente.
 */
export const careersRegistry: CareersRegistry = {
  computacion: {
    id: "computacion",
    name: "Ingeniería en Computación",
    color: "cyan",
    icon: "Laptop",
    availablePlans: [computacion2018.id],
  },
  civil: {
    id: "civil",
    name: "Ingeniería Civil",
    color: "blue",
    icon: "HardHat",
    availablePlans: [civil2013.id, civil2025.id],
  },
  electromecanica: {
    id: "electromecanica",
    name: "Ingeniería Electromecánica",
    color: "orange",
    icon: "Zap",
    availablePlans: [electromecanica2013.id, electromecanica2025.id],
  },
  electronica: {
    id: "electronica",
    name: "Ingeniería Electrónica",
    color: "indigo",
    icon: "Cpu",
    availablePlans: [electronica2013.id, electronica2025.id],
  },
  industrial: {
    id: "industrial",
    name: "Ingeniería Industrial",
    color: "green",
    icon: "Factory",
    availablePlans: [industrial2013.id, industrial2025.id],
  },
  mecatronica: {
    id: "mecatronica",
    name: "Ingeniería Mecatrónica",
    color: "rose",
    icon: "Bot",
    availablePlans: [mecatronica2020.id],
  },
  higiene: {
    id: "higiene",
    name: "Lic. en Higiene y Seguridad",
    color: "yellow",
    icon: "ShieldCheck",
    availablePlans: [higiene2012.id],
  },
};

/**
 * --------------------------------------------------------------------------
 * BASE DE DATOS DE PLANES
 * --------------------------------------------------------------------------
 * Colección plana de todos los planes disponibles por su ID único.
 */
export const allPlans: PlansDB = {
  [computacion2018.id]: computacion2018,
  [civil2013.id]: civil2013,
  [civil2025.id]: civil2025,
  [electromecanica2013.id]: electromecanica2013,
  [electromecanica2025.id]: electromecanica2025,
  [electronica2013.id]: electronica2013,
  [electronica2025.id]: electronica2025,
  [industrial2013.id]: industrial2013,
  [industrial2025.id]: industrial2025,
  [mecatronica2020.id]: mecatronica2020,
  [higiene2012.id]: higiene2012,
};
