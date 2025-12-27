

/**
 * Definición de esquemas de validación y tipos para la estructura de carreras y materias.
 * Utiliza la librería Zod para asegurar la integridad de los datos y la validación de tipos en tiempo de ejecución.
 */

import { z } from 'zod';

const CourseIdSchema = z.string().min(1, "El ID de la materia no puede estar vacío");
const HoursSchema = z.union([
    z.string().min(1),
    z.number().positive()
]);

export const CourseSchema = z.object({
    id: CourseIdSchema,
    name: z.string().min(2, "El nombre de la materia es muy corto"),
    regimen: z.string().min(1, "El régimen es obligatorio (ej: '1º C.')"),
    hours: HoursSchema,

    cursarReg: z.array(z.string()),
    cursarAprob: z.array(z.string()),
    rendirAprob: z.array(z.string()),
    criticality: z.number().optional(),
    equivalenceId: z.string().optional(),

    isElectiveSlot: z.boolean().optional(),
    electiveGroup: z.string().optional()
}).refine(data => {
    if (data.isElectiveSlot && !data.electiveGroup) {
        return false;
    }
    return true;
}, {
    message: "Si la materia es un slot electivo, debe tener definido un 'electiveGroup'",
    path: ['electiveGroup']
});

export const StudyPlanSchema = z.object({
    id: z.string().min(1),
    careerId: z.string().min(1),
    name: z.string().min(1),
    year: z.number().int().min(1900),
    active: z.boolean(),

    coursesData: z.record(z.string(), z.array(CourseSchema)),
    electivesData: z.record(z.string(), z.array(CourseSchema)).optional()
});

export type CourseDTO = z.infer<typeof CourseSchema>;
export type StudyPlanDTO = z.infer<typeof StudyPlanSchema>;
