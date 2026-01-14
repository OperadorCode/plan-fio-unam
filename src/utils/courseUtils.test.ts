import { describe, it, expect } from "vitest";
import {
  getPeriodText,
  getRegimenOrderValue,
  isFirstSemester,
  isSecondSemester,
  isAnnual,
} from "./courseUtils";

describe("courseUtils.ts - Utilidades de Texto y Regimen", () => {
  describe("getPeriodText", () => {
    it("Debe formatear correctamente los regímenes conocidos", () => {
      expect(getPeriodText("1º C.")).toBe("1º Cuatrimestre");
      expect(getPeriodText("2º C.")).toBe("2º Cuatrimestre");
      expect(getPeriodText("Anual")).toBe("Anual");
    });

    it("Debe manejar variaciones de texto", () => {
      expect(getPeriodText("primer cuatrimestre")).toBe("1º Cuatrimestre");
      expect(getPeriodText("Segundo")).toBe("2º Cuatrimestre");
    });

    it("Debe devolver vacío si es undefined", () => {
      expect(getPeriodText(undefined)).toBe("");
    });
  });

  describe("getRegimenOrderValue", () => {
    it("Debe ordenar correctamente: Anual < 1C < 2C", () => {
      expect(getRegimenOrderValue("Anual")).toBe(0);
      expect(getRegimenOrderValue("1º C.")).toBe(1);
      expect(getRegimenOrderValue("2º C.")).toBe(2);
    });

    it("Debe devolver valor alto para desconocidos", () => {
      expect(getRegimenOrderValue("Otro")).toBe(3);
    });
  });

  describe("Helpers booleanos (isFirstSemester, etc)", () => {
    it("isFirstSemester", () => {
      expect(isFirstSemester("1º C.")).toBe(true);
      expect(isFirstSemester("2º C.")).toBe(false);
    });
    it("isSecondSemester", () => {
      expect(isSecondSemester("2º C.")).toBe(true);
      expect(isSecondSemester("1º C.")).toBe(false);
    });
    it("isAnnual", () => {
      expect(isAnnual("Anual")).toBe(true);
      expect(isAnnual("1º C.")).toBe(false);
    });
  });
});
