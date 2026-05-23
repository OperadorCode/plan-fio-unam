/**
 * Esquema de validación para los archivos de backup (restore).
 * Asegura que el JSON importado tenga la estructura correcta y datos seguros
 * antes de ser procesado por el store.
 */

import { z } from "zod";

const CourseStatusEnum = z.enum(["approved", "regular", "pending"]);

const MAX_COURSE_ENTRIES = 500;
const MAX_NOTE_LENGTH = 10000;
const MAX_EVENTS_PER_DATE = 50;

const safeRecordKey = z.string().refine(
  (key) => !["__proto__", "constructor", "prototype"].includes(key),
  { message: "Key de record no permitida" }
);

export const BackupContentSchema = z.object({
  careerId: z.string().min(1, "El ID de la carrera es obligatorio"),

  courseStatus: z
    .record(safeRecordKey, CourseStatusEnum)
    .refine(
      (obj) => Object.keys(obj).length <= MAX_COURSE_ENTRIES,
      { message: `El backup no puede tener más de ${MAX_COURSE_ENTRIES} materias` }
    ),
  selectedElectives: z.record(safeRecordKey, z.string()).optional(),
  examPlan: z.record(safeRecordKey, z.array(z.string())).optional(),
  notes: z
    .record(safeRecordKey, z.string().max(MAX_NOTE_LENGTH))
    .optional(),
  calendarEvents: z
    .record(
      safeRecordKey,
      z.array(z.string()).max(MAX_EVENTS_PER_DATE)
    )
    .optional(),
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

