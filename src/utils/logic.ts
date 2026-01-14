/**
 * Módulo de utilidades para la evaluación de lógica de negocio académica.
 * Provee funciones para la determinación de estados de cursada y validación de requisitos.
 */

import type { Course, CourseStatusMap } from "../types";

export const isApproved = (
  courseId: string,
  statusMap: CourseStatusMap
): boolean => {
  return statusMap[courseId] === "approved";
};

export const isRegular = (
  courseId: string,
  statusMap: CourseStatusMap
): boolean => {
  const status = statusMap[courseId];
  return status === "regular" || status === "approved";
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

  if (prereqs[0] === "ALL") {
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

  const checkApprovedFunc = (id: string, map: CourseStatusMap) =>
    isApproved(id, map);
  const checkRegularFunc = (id: string, map: CourseStatusMap) =>
    isRegular(id, map);
  const getName = (id: string) => allCoursesById[id]?.name || id;

  if (forCursar) {
    course.requiredRegularToCourse.forEach((id) => {
      if (!checkRegularFunc(id, statusMap)) {
        missing.regular.push(getName(id));
      }
    });
    course.requiredApprovedToCourse.forEach((id) => {
      if (!checkApprovedFunc(id, statusMap)) {
        missing.approved.push(getName(id));
      }
    });
  } else {
    if (course.requiredApprovedToFinal.includes("ALL")) {
      const allApproved = checkPrerequisites(
        ["ALL"],
        checkApprovedFunc,
        statusMap,
        course.id,
        Object.values(allCoursesById)
      );

      if (!allApproved) {
        missing.approved.push(
          "Todas las materias de la carrera (Plan Completo)"
        );
      }
    } else {
      course.requiredApprovedToFinal.forEach((id) => {
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
      if (!unlocksMap[prereqId][course.name])
        unlocksMap[prereqId][course.name] = new Set();
      unlocksMap[prereqId][course.name].add(type);
    };

    course.requiredRegularToCourse.forEach((id) =>
      addUnlock(id, "para Cursar (Regular)")
    );
    course.requiredApprovedToCourse.forEach((id) =>
      addUnlock(id, "para Cursar (Aprobada)")
    );

    if (
      course.requiredApprovedToFinal &&
      course.requiredApprovedToFinal[0] !== "ALL"
    ) {
      course.requiredApprovedToFinal.forEach((id) =>
        addUnlock(id, "para Rendir")
      );
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
      ...(course.requiredRegularToCourse || []),
      ...(course.requiredApprovedToCourse || []),
      ...(course.requiredApprovedToFinal &&
      course.requiredApprovedToFinal[0] !== "ALL"
        ? course.requiredApprovedToFinal
        : []),
    ];

    directPrereqs.forEach((id) => {
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

export const calculateCriticality = (
  courseId: string,
  allCourses: Course[]
): number => {
  let directUnlockCount = 0;

  allCourses.forEach((c) => {
    const isDirectPrereq =
      (c.requiredRegularToCourse &&
        c.requiredRegularToCourse.includes(courseId)) ||
      (c.requiredApprovedToCourse &&
        c.requiredApprovedToCourse.includes(courseId)) ||
      (c.requiredApprovedToFinal &&
        c.requiredApprovedToFinal.includes(courseId) &&
        c.requiredApprovedToFinal[0] !== "ALL");

    if (isDirectPrereq) {
      directUnlockCount++;
    }
  });

  return directUnlockCount;
};
