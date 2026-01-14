import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

export const useAppShortcuts = (
  setActiveTab: (
    tab: "table" | "map" | "transition" | "exams" | "calendar"
  ) => void
) => {
  useKeyboardShortcuts([
    { combo: "alt+1", handler: () => setActiveTab("table") },
    { combo: "alt+2", handler: () => setActiveTab("map") },
    {
      combo: "alt+3",
      handler: () => setActiveTab("transition"),
    },
    { combo: "alt+4", handler: () => setActiveTab("exams") },
    { combo: "alt+5", handler: () => setActiveTab("calendar") },
  ]);
};
