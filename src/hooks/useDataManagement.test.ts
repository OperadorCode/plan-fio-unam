import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDataManagement } from "./useDataManagement";

// Mock de careersRegistry para controlar qué carreras son válidas
vi.mock("../data/careers", () => ({
  careersRegistry: {
    civil: { id: "civil", name: "Civil" },
  },
}));

// Mock del store
const mockLoadBackup = vi.fn();
vi.mock("../store/useAppStore", () => ({
  useAppStore: vi.fn(() => ({
    careerId: "civil",
    activePlanId: "civil-2025",
    courseStatus: {},
    selectedElectives: {},
    examPlan: {},
    notes: {},
    calendarEvents: {},
    loadBackup: mockLoadBackup,
  })),
}));

describe("useDataManagement Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.URL.createObjectURL = vi.fn();
    globalThis.URL.revokeObjectURL = vi.fn();
  });

  describe("importData", () => {
    it("debe importar correctamente un backup válido", async () => {
      const validBackup = {
        version: 1,
        timestamp: new Date().toISOString(),
        data: {
          careerId: "civil",
          courseStatus: { "fisica-1": "approved" },
          selectedElectives: {},
          examPlan: {},
          notes: {},
          calendarEvents: {},
        },
      };

      const file = new File([JSON.stringify(validBackup)], "backup.json", {
        type: "application/json",
      });

      const { result } = renderHook(() => useDataManagement());

      let response: { success: boolean; message: string } | undefined;
      await act(async () => {
        response = await result.current.importData(file);
      });

      expect(response).toEqual({
        success: true,
        message: "Datos restaurados correctamente.",
      });
      expect(mockLoadBackup).toHaveBeenCalledWith(
        expect.objectContaining({
          careerId: "civil",
          courseStatus: { "fisica-1": "approved" },
        })
      );
    });

    it("debe rechazar un archivo con careerId inválido", async () => {
      const invalidCareerBackup = {
        version: 1,
        data: {
          careerId: "ingenieria-nucleo-espacial", // No existe en el mock
          courseStatus: {},
        },
      };

      const file = new File(
        [JSON.stringify(invalidCareerBackup)],
        "backup.json",
        {
          type: "application/json",
        }
      );

      const { result } = renderHook(() => useDataManagement());

      let response: { success: boolean; message: string } | undefined;
      await act(async () => {
        response = await result.current.importData(file);
      });

      expect(response?.success).toBe(false);
      expect(result.current.importError).toContain("no existe en el sistema");
      expect(mockLoadBackup).not.toHaveBeenCalled();
    });

    it("debe rechazar un archivo con courseStatus inválido (Zod)", async () => {
      const invalidStatusBackup = {
        version: 1,
        data: {
          careerId: "civil",
          courseStatus: { "fisica-1": "super-aprobado" }, // Valor inválido
        },
      };

      const file = new File(
        [JSON.stringify(invalidStatusBackup)],
        "backup.json",
        {
          type: "application/json",
        }
      );

      const { result } = renderHook(() => useDataManagement());

      let response: { success: boolean; message: string } | undefined;
      await act(async () => {
        response = await result.current.importData(file);
      });

      expect(response?.success).toBe(false);
      expect(result.current.importError).toContain("Archivo inválido");
      expect(mockLoadBackup).not.toHaveBeenCalled();
    });

    it("debe rechazar un JSON malformado", async () => {
      const file = new File(["{ esto no es json }"], "backup.json", {
        type: "application/json",
      });

      const { result } = renderHook(() => useDataManagement());

      let response: { success: boolean; message: string } | undefined;
      await act(async () => {
        response = await result.current.importData(file);
      });

      expect(response?.success).toBe(false);
      expect(result.current.importError).toBe(
        "El archivo no es un JSON válido."
      );
    });
  });
});
