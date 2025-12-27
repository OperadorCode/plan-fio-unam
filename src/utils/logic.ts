
/**
 * Módulo de utilidades para la evaluación de lógica de negocio académica.
 * Provee funciones para la determinación de estados de cursada y validación de requisitos.
 */

import type { Course, CourseStatusMap } from '../types';

// ================== ESTADO DE CURSADA ==================

// Retorna true si la materia está aprobada según el statusMap.
export const isApproved = (courseId: string, statusMap: CourseStatusMap): boolean => {
  return statusMap[courseId] === 'approved';
};

// Retorna true si la materia está regular o aprobada (apto para cursar correlativas).
export const isRegular = (courseId: string, statusMap: CourseStatusMap): boolean => {
  const status = statusMap[courseId];
  return status === 'regular' || status === 'approved';
};

// ================== CHEQUEO DE CORRELATIVAS ==================

/*
  Verifica si se cumplen los requisitos de una materia:
  - Si el primer prereq es 'ALL', exige que todas las demás materias estén aprobadas/regularizadas según checkFn.
  - Si la lista está vacía, no hay requisitos.
  - Si es una lista de ids, exige que todas estén aprobadas/regularizadas según checkFn.
*/
export const checkPrerequisites = (
  prereqs: string[],
  checkFn: (id: string, map: CourseStatusMap) => boolean,
  statusMap: CourseStatusMap,
  currentCourseId: string,
  allCourses: Course[]
): boolean => {
  if (!prereqs || prereqs.length === 0) return true;

  if (prereqs[0] === 'ALL') {
    const allOtherCourses = allCourses.filter((c) => c.id !== currentCourseId);
    return allOtherCourses.every((c) => checkFn(c.id, statusMap));
  }

  return prereqs.every((prereqId) => checkFn(prereqId, statusMap));
};

// ================== REQUISITOS FALTANTES ==================

/*
  Devuelve un objeto con los nombres de las materias faltantes para cursar o rendir una materia.
  - Si forCursar=true, chequea regularidad y aprobaciones para cursar.
  - Si forCursar=false, chequea solo aprobaciones para rendir.
  - Si la materia requiere 'ALL', devuelve mensaje especial.
*/
export const getMissingPrerequisites = (
  course: Course,
  forCursar: boolean,
  statusMap: CourseStatusMap,
  allCoursesById: Record<string, Course>
): { regular: string[]; approved: string[] } => {
  const missing = { regular: [] as string[], approved: [] as string[] };

  const checkApprovedFunc = (id: string, map: CourseStatusMap) => isApproved(id, map);
  const checkRegularFunc = (id: string, map: CourseStatusMap) => isRegular(id, map);
  const getName = (id: string) => allCoursesById[id]?.name || id;

  if (forCursar) {
    course.cursarReg.forEach((id) => {
      if (!checkRegularFunc(id, statusMap)) {
        missing.regular.push(getName(id));
      }
    });
    course.cursarAprob.forEach((id) => {
      if (!checkApprovedFunc(id, statusMap)) {
        missing.approved.push(getName(id));
      }
    });
  } else {
    if (course.rendirAprob.includes('ALL')) {
      const allApproved = checkPrerequisites(
        ['ALL'],
        checkApprovedFunc,
        statusMap,
        course.id,
        Object.values(allCoursesById)
      );

      if (!allApproved) {
        missing.approved.push("Todas las materias de la carrera (Plan Completo)");
      }
    } else {
      course.rendirAprob.forEach((id) => {
        if (!checkApprovedFunc(id, statusMap)) {
          missing.approved.push(getName(id));
        }
      });
    }
  }

  return missing;
};

// ================== MAPA DE DESBLOQUEOS ==================

/*
  Construye un mapa que indica qué materias desbloquea cada materia y bajo qué condición (regular/aprobada).
  Ejemplo: unlocksMap["Álgebra"] = { "Análisis I": Set("para Cursar (Regular)") }
*/
export const buildUnlocksMap = (allCourses: Course[]) => {
  const unlocksMap: Record<string, Record<string, Set<string>>> = {};

  allCourses.forEach((course) => {
    const addUnlock = (prereqId: string, type: string) => {
      if (!unlocksMap[prereqId]) unlocksMap[prereqId] = {};
      if (!unlocksMap[prereqId][course.name]) unlocksMap[prereqId][course.name] = new Set();
      unlocksMap[prereqId][course.name].add(type);
    };

    course.cursarReg.forEach((id) => addUnlock(id, 'para Cursar (Regular)'));
    course.cursarAprob.forEach((id) => addUnlock(id, 'para Cursar (Aprobada)'));

    if (course.rendirAprob && course.rendirAprob[0] !== 'ALL') {
      course.rendirAprob.forEach((id) => addUnlock(id, 'para Rendir'));
    }
  });

  return unlocksMap;
};

// ================== RECORRIDO DE CORRELATIVAS ==================

/*
  Devuelve el conjunto de todas las correlativas (directas e indirectas) de una materia.
  No incluye la materia original ni repite ids.
*/
export const getAllPrerequisites = (
  courseId: string,
  allCoursesById: Record<string, Course>
): Set<string> => {
  const prereqs = new Set<string>();
  const visited = new Set<string>();

  const traverse = (currentId: string) => {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const course = allCoursesById[currentId];
    if (!course) return;

    const directPrereqs = [
      ...(course.cursarReg || []),
      ...(course.cursarAprob || []),
      ...(course.rendirAprob && course.rendirAprob[0] !== 'ALL' ? course.rendirAprob : [])
    ];

    directPrereqs.forEach(id => {
      prereqs.add(id);
      traverse(id);
    });
  };

  traverse(courseId);
  return prereqs;
};

// ================== CRITICIDAD ==================

/*
  Devuelve la cantidad de materias que dependen DIRECTAMENTE de la materia dada como correlativa.
  No cuenta dependencias indirectas para evitar sobrevalorar materias introductorias.
*/
export const calculateCriticality = (courseId: string, allCourses: Course[]): number => {
  let directUnlockCount = 0;

  allCourses.forEach(c => {
    // Verifica si 'courseId' es correlativa directa de 'c'
    const isDirectPrereq =
      (c.cursarReg && c.cursarReg.includes(courseId)) ||
      (c.cursarAprob && c.cursarAprob.includes(courseId)) ||
      (c.rendirAprob && c.rendirAprob.includes(courseId) && c.rendirAprob[0] !== 'ALL');

    if (isDirectPrereq) {
      directUnlockCount++;
    }
  });

  return directUnlockCount;
};