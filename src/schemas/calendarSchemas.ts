
/**
 * Esquemas de validación Zod para la gestión de eventos y calendarios.
 * Define las reglas de integridad para tipos de eventos, formatos de fecha y 
 * configuraciones globales de la aplicación.
 */

import { z } from 'zod';

export const EventTypeSchema = z.enum(['holiday', 'academic', 'special', 'exam', 'personal']);

export const GeneralEventSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Formato de fecha inválido. Debe ser YYYY-MM-DD" }),
    description: z.string().min(1, { message: "La descripción es obligatoria" }),
    type: EventTypeSchema
});

export const ExamDateSchema = z.object({
    id: z.string(),
    name: z.string(),
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Fecha de inicio inválida" }),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Fecha de fin inválida" }),
    displayDates: z.string()
}).refine((data) => new Date(data.start) <= new Date(data.end), {
    message: "La fecha de inicio debe ser anterior o igual a la fecha de fin",
    path: ['end']
});

export type GeneralEvent = z.infer<typeof GeneralEventSchema>;
export type ExamDate = z.infer<typeof ExamDateSchema>;
