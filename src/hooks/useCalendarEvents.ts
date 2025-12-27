
/**
 * Hook personalizado para la gestión y unificación de eventos del calendario.
 * 
 * Centraliza y normaliza datos provenientes de múltiples fuentes: eventos generales, 
 * fechas de exámenes y notas personales almacenadas en el estado global. 
 * Implementa validación de integridad mediante esquemas Zod y optimización 
 * de rendimiento a través de memoización.
 */



import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { generalEvents } from '../data/calendarConfig';
import type { EventType } from '../data/calendarConfig';
import { examDates } from '../data/examDates';

import { GeneralEventSchema, ExamDateSchema } from '../schemas/calendarSchemas';

export interface UnifiedEvent {
    date: string;
    description: string;
    type: EventType | 'personal';
    originalIndex?: number;
}


export const useCalendarEvents = () => {
    const { calendarEvents: personalEventsStore } = useAppStore();

    const unifiedEvents = useMemo(() => {
        const events: UnifiedEvent[] = [];

        if (generalEvents) {
            generalEvents.forEach(rawEv => {
                const result = GeneralEventSchema.safeParse(rawEv);
                if (result.success) {
                    events.push({
                        date: result.data.date,
                        description: result.data.description,
                        type: result.data.type
                    });
                } else {
                    console.warn(`[Calendar] Evento general inválido ignorado:`, rawEv, result.error);
                }
            });
        }

        if (examDates) {
            examDates.forEach((rawExam) => {
                const result = ExamDateSchema.safeParse(rawExam);
                if (result.success) {
                    const exam = result.data;
                    const start = new Date(exam.start + 'T12:00:00');
                    const end = new Date(exam.end + 'T12:00:00');

                    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                        events.push({
                            date: d.toISOString().split('T')[0],
                            description: exam.name,
                            type: 'exam'
                        });
                    }
                } else {
                    console.warn(`[Calendar] Fecha de examen inválida ignorada:`, rawExam, result.error);
                }
            });
        }

        if (personalEventsStore) {
            Object.entries(personalEventsStore).forEach(([dateKey, notes]) => {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return;

                if (Array.isArray(notes)) {
                    notes.forEach((note, index) => {
                        if (typeof note === 'string' && note.trim().length > 0) {
                            events.push({
                                date: dateKey,
                                description: note,
                                type: 'personal',
                                originalIndex: index
                            });
                        }
                    });
                }
            });
        }
        return events;
    }, [personalEventsStore]);

    return unifiedEvents;
};
