import { useKeyboardShortcuts } from "./useKeyboardShortcuts";
import type { TabId } from "../types/navigation";

export const useAppShortcuts = (setActiveTab: (tab: TabId) => void) => {
  useKeyboardShortcuts([
    { combo: "alt+1", handler: () => setActiveTab("table") },
    { combo: "alt+2", handler: () => setActiveTab("map") },
    { combo: "alt+3", handler: () => setActiveTab("transition") },
    { combo: "alt+4", handler: () => setActiveTab("agenda") },
  ]);
};
