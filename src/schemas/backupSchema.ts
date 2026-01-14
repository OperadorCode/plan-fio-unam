/**
 * Esquema de validación para los archivos de backup (restore).
 * Asegura que el JSON importado tenga la estructura correcta y datos seguros
 * antes de ser procesado por el store.
 */

import { z } from "zod";

const CourseStatusEnum = z.enum(["approved", "regular", "pending"]);

export const BackupContentSchema = z.object({
  careerId: z.string().min(1, "El ID de la carrera es obligatorio"),

  courseStatus: z.record(z.string(), CourseStatusEnum),
  selectedElectives: z.record(z.string(), z.string()).optional(),
  examPlan: z.record(z.string(), z.array(z.string())).optional(),
  notes: z.record(z.string(), z.string()).optional(),
  calendarEvents: z.record(z.string(), z.array(z.string())).optional(),
  activePlanId: z.string().optional(),
});

export const BackupFileSchema = z.object({
  version: z.number().int().min(1),
  timestamp: z
    .string()
    .datetime({ message: "Timestamp inválido ISO 8601" })
    .optional(),
  data: BackupContentSchema,
});

export type BackupFileDTO = z.infer<typeof BackupFileSchema>;
