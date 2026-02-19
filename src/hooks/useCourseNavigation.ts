import { useEffect } from "react";
import type { TabId } from "../types/navigation";

export const useCourseNavigation = (setActiveTab: (tab: TabId) => void) => {
  useEffect(() => {
    let mounted = true;
    let outerTimeout: ReturnType<typeof setTimeout>;
    let innerTimeout: ReturnType<typeof setTimeout>;

    const handleNavigation = (e: CustomEvent) => {
      const { courseId } = e.detail;
      setActiveTab("table");
      outerTimeout = setTimeout(() => {
        if (!mounted) return;
        const element = document.getElementById(`course-${courseId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("ring-4", "ring-blue-500/50", "z-20");
          innerTimeout = setTimeout(() => {
            if (!mounted) return;
            element.classList.remove("ring-4", "ring-blue-500/50", "z-20");
          }, 2000);
        }
      }, 100);
    };
    window.addEventListener(
      "navigate-to-course",
      handleNavigation as EventListener
    );
    return () => {
      mounted = false;
      clearTimeout(outerTimeout);
      clearTimeout(innerTimeout);
      window.removeEventListener(
        "navigate-to-course",
        handleNavigation as EventListener
      );
    };
  }, [setActiveTab]);
};
