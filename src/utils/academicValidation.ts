
/**
 * Valida y propaga cambios de estado en las materias basándose en las correlativas del plan.
 * 
 * Reglas:
 * 1. Para estar REGULAR/CURSANDO:
 *    - Todas las correlativas de 'cursarReg' tienen que estar REGULAR o APROBADA.
 *    - Todas las correlativas de 'cursarAprob' tienen que estar APROBADA.
 * 2. Para estar APROBADO (Final):
 *    - Se debe cumplir lo anterior (implícito si ya llegaste a aprobarla, pero chequeamos igual).
 *    - Todas las correlativas de 'rendirAprob' (finales previos) tienen que estar APROBADA.
 * 
 * @param initialStatus Estado actual de las materias
 * @param plan Plan de estudios con la info de materias y correlativas
 * @param selectedElectives Mapa de elecciones de optativas (slotId -> optionId)
 * @param currentExamPlan Plan actual de exámenes (para limpiar si aprobás una materia)
 * @returns Nuevo estado validado y plan de exámenes actualizado
 */


import type { CourseStatusMap, StudyPlan, Course } from '../types';

export const validateCourseStatus = (
    initialStatus: CourseStatusMap,
    plan: StudyPlan,
    selectedElectives: Record<string, string>,
    currentExamPlan: Record<string, string[]>
): { courseStatus: CourseStatusMap; examPlan: Record<string, string[]> } => {
    // Copia del estado para mutar internamente durante la cascada
    const updatedStatus = { ...initialStatus };
    const allCoursesRaw = Object.values(plan.coursesData).flat();

    let hasChanges = true;
    let iterations = 0;

    // Bucle de validación en cascada (propaga cambios hacia adelante)
    while (hasChanges && iterations < 10) {
        hasChanges = false;
        iterations++;

        allCoursesRaw.forEach(course => {
            // --- RESOLUCIÓN DE MATERIA EFECTIVA (SLOT vs OPCIÓN) ---
            let effectiveCourse = resolveEffectiveCourse(course, selectedElectives, plan);

            // Solo validamos materias que tienen algún estado (Regular o Aprobado)
            const currentS = updatedStatus[effectiveCourse.id];
            if (!currentS || currentS === 'pending') return;

            // --- VALIDACIÓN DE CORRELATIVAS (ESPECÍFICAS) ---

            // 1. Verificar correlativas para REGULARIZAR/CURSAR
            const reqsRegularOk = effectiveCourse.cursarReg.every(reqId => {
                const s = updatedStatus[reqId];
                return s === 'regular' || s === 'approved';
            });

            // 2. Verificar finales requeridos para CURSAR
            const reqsFinalForCursadaOk = effectiveCourse.cursarAprob.every(reqId => updatedStatus[reqId] === 'approved');

            // --- VALIDACIÓN DE REGLAS GLOBALES (POR AÑO/BLOQUE) ---
            // Y si cumple los requisitos específicos (si ya falló lo específico, no tiene sentido chequear global)
            let globalRulesOk = true;

            if (reqsRegularOk && reqsFinalForCursadaOk && plan.careerId !== 'higiene_seguridad') {
                globalRulesOk = checkGlobalRules(effectiveCourse, updatedStatus, plan);
            }

            // Si fallan los requisitos de cursada (específicos o globales) -> Perdemos el estado
            if (!reqsRegularOk || !reqsFinalForCursadaOk || !globalRulesOk) {
                delete updatedStatus[effectiveCourse.id];
                hasChanges = true;
                return;
            }

            // 3. Verificar correlativas para FINAL (Solo si está 'approved')
            if (currentS === 'approved') {
                // Se requiere 'rendirAprob' (finales para rendir este final)
                const reqsFinalOk = effectiveCourse.rendirAprob.every(reqId => updatedStatus[reqId] === 'approved');

                // Si fallan requisitos de final -> Bajamos a Regular
                if (!reqsFinalOk) {
                    updatedStatus[effectiveCourse.id] = 'regular';
                    hasChanges = true;
                }
            }
        });
    }

    // 3. Limpiar Exámenes Planificados si la materia se aprueba
    const updatedExamPlan = { ...currentExamPlan };

    Object.keys(updatedStatus).forEach(courseId => {
        if (updatedStatus[courseId] === 'approved') {
            Object.keys(updatedExamPlan).forEach((period) => {
                const exams = updatedExamPlan[period];
                if (exams.includes(courseId)) {
                    updatedExamPlan[period] = exams.filter((id) => id !== courseId);
                }
            });
        }
    });

    return {
        courseStatus: updatedStatus,
        examPlan: updatedExamPlan
    };
};

/**
 * Verifica las reglas globales de avance por bloques (años completos).
 * Devuelve true si CUMPLE las reglas (o no aplican), false si falla.
 */
const checkGlobalRules = (course: Course, status: CourseStatusMap, plan: StudyPlan): boolean => {
    // Escaneamos el plan para encontrar el AÑO y REGIMEN de la materia
    let year: number | null = null;
    let regimen: string = "";

    // Buscamos la materia en el plan para saber su ubicación temporal
    for (const [yStr, courses] of Object.entries(plan.coursesData)) {
        const found = courses.find(c => c.id === course.id);
        if (found) {
            year = parseInt(yStr);
            regimen = found.regimen; // Ej: "1º C.", "2º C.", "Anual"
            break;
        }
    }

    // Caso especial para optativas 
    // Si la materia es un SLOT optativo o una OPCIÓN optativa:
    if (course.isElectiveSlot || course.electiveGroup) {
        // Regla: Aprobadas todas las asignaturas del 2º cuatrimestre de 3º año (y anteriores implícitamente).
        // Interpretación: "Tener 1º, 2º y 3º año COMPLETOS APROBADOS".
        return checkYearApproved(1, plan, status) &&
            checkYearApproved(2, plan, status) &&
            checkYearApproved(3, plan, status);
    }

    if (!year) return true; // Si no tiene año, no aplicamos regla

    // ---------------- LÓGICA DE BLOQUES ----------------

    // 3º AÑO
    if (year === 3) {
        if (!checkYearApproved(1, plan, status)) return false;
    }

    // 4º AÑO
    if (year === 4) {
        // 1º Cuatrimestre -> Requiere 2º Año 1º C. APROBADO
        if (regimen.includes("1º C.") || regimen === "Anual") {
            if (!checkSemesterApproved(2, "1º C.", plan, status)) return false;
        }
        // 2º Cuatrimestre -> Requiere 2º Año 2º C. APROBADO
        if (regimen.includes("2º C.")) {
            if (!checkSemesterApproved(2, "2º C.", plan, status)) return false;
        }
    }

    // 5º AÑO
    if (year === 5) {
        // 1º Cuatrimestre -> Requiere 3º Año 1º C. APROBADO
        if (regimen.includes("1º C.") || regimen === "Anual") {
            if (!checkSemesterApproved(3, "1º C.", plan, status)) return false;
        }
        // 2º Cuatrimestre -> Requiere 3º Año 2º C. APROBADO
        if (regimen.includes("2º C.")) {
            if (!checkSemesterApproved(3, "2º C.", plan, status)) return false;
        }
    }

    return true;
};

/**
 * Verifica si TODAS las materias de un año completo están APROBADAS.
 */
const checkYearApproved = (year: number, plan: StudyPlan, status: CourseStatusMap): boolean => {
    const courses = plan.coursesData[year.toString()];
    if (!courses) return true;
    return courses.every(c => status[c.id] === 'approved');
};

/**
 * Verifica si TODAS las materias de un Cuatrimestre específico de un año están APROBADAS.
 */
const checkSemesterApproved = (year: number, semesterSignature: string, plan: StudyPlan, status: CourseStatusMap): boolean => {
    const courses = plan.coursesData[year.toString()];
    if (!courses) return true;

    return courses
        .filter(c => c.regimen.includes(semesterSignature) || c.regimen === "Anual")
        .every(c => status[c.id] === 'approved');
};

/**
 * Helper para resolver si usamos el slot o la opción elegida
 */
const resolveEffectiveCourse = (course: Course, selectedElectives: Record<string, string>, plan: StudyPlan): Course => {
    if (course.isElectiveSlot) {
        const selectedOptionId = selectedElectives[course.id];
        if (selectedOptionId) {
            const optionData = plan.electivesData?.[course.electiveGroup!]?.find(o => o.id === selectedOptionId);
            if (optionData) {
                // Retornamos la data de la opción pero con el ID del slot para mantener consistencia en el mapa de estados
                return { ...optionData, id: course.id };
            }
        }
    }
    return course;
};
