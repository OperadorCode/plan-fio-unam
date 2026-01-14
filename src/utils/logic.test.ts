import { describe, it, expect } from "vitest";
import {
  isApproved,
  isRegular,
  getMissingPrerequisites,
  buildUnlocksMap,
  calculateCriticality,
  getAllPrerequisites,
} from "./logic";
import type { Course, CourseStatusMap } from "../types";

describe("logic.ts - Lógica de Negocio Académica", () => {
  const mockStatus: CourseStatusMap = {
    A: "approved",
    B: "regular",
    C: "pending",
  };

  describe("isApproved / isRegular", () => {
    it("isApproved debe retornar true solo si el estado es approved", () => {
      expect(isApproved("A", mockStatus)).toBe(true);
      expect(isApproved("B", mockStatus)).toBe(false);
      expect(isApproved("C", mockStatus)).toBe(false);
      expect(isApproved("Z", mockStatus)).toBe(false);
    });

    it("isRegular debe retornar true para approved O regular", () => {
      expect(isRegular("A", mockStatus)).toBe(true);
      expect(isRegular("B", mockStatus)).toBe(true);
      expect(isRegular("C", mockStatus)).toBe(false);
    });
  });

  describe("getMissingPrerequisites", () => {
    const mockCourses: Record<string, Course> = {
      Target: {
        id: "Target",
        name: "Target Course",
        regimen: "Anual",
        hours: 0,
        requiredRegularToCourse: ["ReqA"],
        requiredApprovedToCourse: ["ReqB"],
        requiredApprovedToFinal: ["ReqC"],
      },
      ReqA: {
        id: "ReqA",
        name: "Requisito A",
        regimen: "Anual",
        hours: 0,
        requiredRegularToCourse: [],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
      ReqB: {
        id: "ReqB",
        name: "Requisito B",
        regimen: "Anual",
        hours: 0,
        requiredRegularToCourse: [],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
      ReqC: {
        id: "ReqC",
        name: "Requisito C",
        regimen: "Anual",
        hours: 0,
        requiredRegularToCourse: [],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
    };

    it("Debe identificar correlativas faltantes para cursar", () => {
      // Case 1: Nada aprobado
      const statusEmpty: CourseStatusMap = {};
      const missing1 = getMissingPrerequisites(
        mockCourses["Target"],
        true,
        statusEmpty,
        mockCourses
      );
      expect(missing1.regular).toContain("Requisito A");
      expect(missing1.approved).toContain("Requisito B");

      // Case 2: Solo ReqA regular (suficiente para requiredRegularToCourse)
      const statusPartial: CourseStatusMap = { ReqA: "regular" };
      const missing2 = getMissingPrerequisites(
        mockCourses["Target"],
        true,
        statusPartial,
        mockCourses
      );
      expect(missing2.regular).toHaveLength(0);
      expect(missing2.approved).toContain("Requisito B");

      // Case 3: Todo listo para cursar
      const statusFullCursada: CourseStatusMap = {
        ReqA: "regular",
        ReqB: "approved",
      };
      const missing3 = getMissingPrerequisites(
        mockCourses["Target"],
        true,
        statusFullCursada,
        mockCourses
      );
      expect(missing3.regular).toHaveLength(0);
      expect(missing3.approved).toHaveLength(0);
    });

    it("Debe identificar correlativas faltantes para final", () => {
      const statusEmpty: CourseStatusMap = {};
      const missing1 = getMissingPrerequisites(
        mockCourses["Target"],
        false,
        statusEmpty,
        mockCourses
      );
      expect(missing1.approved).toContain("Requisito C");

      const statusReady: CourseStatusMap = { ReqC: "approved" };
      const missing2 = getMissingPrerequisites(
        mockCourses["Target"],
        false,
        statusReady,
        mockCourses
      );
      expect(missing2.approved).toHaveLength(0);
    });
  });

  describe("calculateCriticality", () => {
    const planCourses: Course[] = [
      {
        id: "Base",
        name: "Base",
        regimen: "",
        hours: 0,
        requiredRegularToCourse: [],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
      {
        id: "Dep1",
        name: "Dep1",
        regimen: "",
        hours: 0,
        requiredRegularToCourse: ["Base"],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
      {
        id: "Dep2",
        name: "Dep2",
        regimen: "",
        hours: 0,
        requiredRegularToCourse: ["Base"],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
      {
        id: "Dep3",
        name: "Dep3",
        regimen: "",
        hours: 0,
        requiredRegularToCourse: [],
        requiredApprovedToCourse: ["Base"],
        requiredApprovedToFinal: [],
      },
      {
        id: "Indep",
        name: "Indep",
        regimen: "",
        hours: 0,
        requiredRegularToCourse: [],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
    ];

    it("Debe contar cuántas materias dependen DIRECTAMENTE de una materia", () => {
      const crit = calculateCriticality("Base", planCourses);
      expect(crit).toBe(3); // Dep1, Dep2, Dep3

      const critIndep = calculateCriticality("Indep", planCourses);
      expect(critIndep).toBe(0);
    });
  });

  describe("getAllPrerequisites & buildUnlocksMap", () => {
    const planCourses: Course[] = [
      {
        id: "A",
        name: "A",
        regimen: "",
        hours: 0,
        requiredRegularToCourse: [],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
      {
        id: "B",
        name: "B",
        regimen: "",
        hours: 0,
        requiredRegularToCourse: ["A"],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
      {
        id: "C",
        name: "C",
        regimen: "",
        hours: 0,
        requiredRegularToCourse: ["B"],
        requiredApprovedToCourse: [],
        requiredApprovedToFinal: [],
      },
    ];
    const coursesById = {
      A: planCourses[0],
      B: planCourses[1],
      C: planCourses[2],
    };

    it("getAllPrerequisites debe devolver correlativas recursivas", () => {
      const prereqsC = getAllPrerequisites("C", coursesById);
      expect(prereqsC.has("B")).toBe(true);
      expect(prereqsC.has("A")).toBe(true);
    });

    it("buildUnlocksMap debe mapear desbloqueos inversos", () => {
      const map = buildUnlocksMap(planCourses);
      // A desbloquea B (para regular)
      expect(map["A"]["B"].has("para Cursar (Regular)")).toBe(true);
    });
  });
});
