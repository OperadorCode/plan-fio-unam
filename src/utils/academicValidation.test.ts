
/**
 * Suite de pruebas unitarias para la lógica de validación de estados académicos.
 * 
 * Evalúa la función `validateCourseStatus` verificando:
 * - Cumplimiento de correlatividades (cursar regular, cursar aprobado, rendir aprobado).
 * - Integridad referencial del estado académico (cascade delete) ante la falta de requisitos.
 * - Manejo de planes de estudio y estados de cursada/examen.
 * 
 * @tooling Vitest
 */


import { describe, it, expect } from 'vitest';
import { validateCourseStatus } from './academicValidation';
import type { StudyPlan, Course, CourseStatusMap } from '../types';


const createCourse = (id: string, cursarReg: string[] = [], cursarAprob: string[] = [], rendirAprob: string[] = []): Course => ({
    id,
    name: `Course ${id}`,
    regimen: 'Anual',
    hours: 60,
    cursarReg,
    cursarAprob,
    rendirAprob,
});

describe('academicValidation Logic', () => {

    const mockPlan: StudyPlan = {
        id: 'test-plan',
        careerId: 'test-career',
        name: 'Test Plan',
        year: 2024,
        active: true,
        coursesData: {
            "1": [
                createCourse('A'), // Sin previas
                createCourse('B', ['A']), // Requiere A regular
                createCourse('C', [], ['A']), // Requiere A aprobado (para cursar)
                createCourse('D', [], [], ['A']), // Requiere A aprobado (para rendir final, pero no para cursar)
            ]
        },
        electivesData: {}
    };

    const emptyElectives = {};
    const emptyExamPlan = {};

    it('debería permitir aprobar una materia sin correlativas (A)', () => {
        const initialStatus = { 'A': 'approved' as const };
        const result = validateCourseStatus(initialStatus, mockPlan, emptyElectives, emptyExamPlan);

        expect(result.courseStatus['A']).toBe('approved');
    });

    it('debería permitir regularizar B si A está regular', () => {
        const initialStatus = {
            'A': 'regular' as const,
            'B': 'regular' as const
        };
        const result = validateCourseStatus(initialStatus, mockPlan, emptyElectives, emptyExamPlan);

        expect(result.courseStatus['B']).toBe('regular');
    });

    it('NO debería permitir regularizar B si A NO está regular (cascade delete)', () => {
        const initialStatus = {
            // A no tiene estado
            'B': 'regular' as const
        };
        const result = validateCourseStatus(initialStatus, mockPlan, emptyElectives, emptyExamPlan);

        expect(result.courseStatus['B']).toBeUndefined(); // Se debió borrar
    });

    it('debería permitir cursar C solo si A está APROBADA', () => {
        // Caso 1: A regular -> C no debería poder cursarse
        const status1 = {
            'A': 'regular' as const,
            'C': 'regular' as const
        };
        const result1 = validateCourseStatus(status1, mockPlan, emptyElectives, emptyExamPlan);
        expect(result1.courseStatus['C']).toBeUndefined();

        // Caso 2: A approved -> C puede cursarse
        const status2 = {
            'A': 'approved' as const,
            'C': 'regular' as const
        };
        const result2 = validateCourseStatus(status2, mockPlan, emptyElectives, emptyExamPlan);
        expect(result2.courseStatus['C']).toBe('regular');
    });

    it('Cascada: Desaprobar A debería eliminar B y C', () => {
        // Si borramos A...
        // A estaba Approved.
        // B necesita A regular (se borra porque A no existe).
        // C necesita A approved (se borra porque A no existe).

        const statusWithoutA = {
            'B': 'regular' as const,
            'C': 'approved' as const
        };

        const result = validateCourseStatus(statusWithoutA, mockPlan, emptyElectives, emptyExamPlan);

        expect(result.courseStatus['A']).toBeUndefined();
        expect(result.courseStatus['B']).toBeUndefined();
        expect(result.courseStatus['C']).toBeUndefined();
    });

    it('Finales: Requiere correlativas ("rendirAprob") aprobadas para aprobar final', () => {
        // 'D' requiere 'A' aprobado SOLO para el final (rendirAprob).
        // Si 'A' está Regular, 'D' puede estar Regular (Step 2 pasa).
        // Pero 'D' NO puede estar Approved (Step 3 falla).

        const status = {
            'A': 'regular' as const,
            'D': 'approved' as const // Intentamos aprobar D
        };

        const result = validateCourseStatus(status, mockPlan, emptyElectives, emptyExamPlan);

        // Se espera que D baje a 'regular' porque A no está aprobada
        expect(result.courseStatus['D']).toBe('regular');
        expect(result.courseStatus['A']).toBe('regular');
    });

    it('Debería limpiar exámenes si la materia se aprueba', () => {
        const initialStatus: CourseStatusMap = { 'A': 'pending' };
        initialStatus['A'] = 'approved';

        const initialExamPlan = {
            'period-1': ['A', 'B']
        };

        const result = validateCourseStatus(initialStatus, mockPlan, emptyElectives, initialExamPlan);

        expect(result.courseStatus['A']).toBe('approved');
        expect(result.examPlan['period-1']).not.toContain('A');
        expect(result.examPlan['period-1']).toContain('B');
    });

});
