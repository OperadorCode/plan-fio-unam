import React, { useState, useEffect, useMemo } from "react";
import { Search, GraduationCap } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useHoverContext } from "../../context/HoverContext";
import { getPlanForCareer } from "../../data/careers";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import CommandPaletteErrorBoundary from "./CommandPaletteErrorBoundary";

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const careerId = useAppStore((state) => state.careerId);
  const { setHoveredCourseId } = useHoverContext();

  useKeyboardShortcuts([
    {
      combo: "ctrl+k",
      handler: () => setIsOpen((prev) => !prev),
    },
    {
      combo: "meta+k",
      handler: () => setIsOpen((prev) => !prev),
    },
    {
      combo: "escape",
      handler: () => setIsOpen(false),
      preventDefault: false,
    },
  ]);

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleOpenEvent);
    return () =>
      window.removeEventListener("open-command-palette", handleOpenEvent);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setQuery(""), 0);
      setHoveredCourseId(null);
    }
  }, [isOpen, setHoveredCourseId]);

  if (!isOpen) return null;

  return (
    <CommandPaletteErrorBoundary onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 z-[1100] flex items-start justify-center pt-[20vh] px-4">
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in flex flex-col max-h-[60vh]">
          <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <Search className="text-gray-400 mr-3" size={20} />
            <input
              autoFocus
              type="text"
              placeholder="Buscar materia..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
              ESC
            </kbd>
          </div>

          <div className="overflow-y-auto p-2">
            <CourseList
              query={query}
              careerId={careerId}
              close={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </CommandPaletteErrorBoundary>
  );
};

const CourseList: React.FC<{
  query: string;
  careerId: string;
  close: () => void;
}> = ({ query, careerId, close }) => {
  const { setHoveredCourseId } = useHoverContext();

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return [];

    const plan = getPlanForCareer(careerId);
    if (!plan) return [];

    const courses = Object.values(plan.coursesData).flat();
    const normalize = (text: string) =>
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const normalizedQuery = normalize(query);

    return courses
      .filter((c) => {
        const normalizedName = normalize(c.name);
        const normalizedId = c.id.toLowerCase();
        return (
          normalizedName.includes(normalizedQuery) ||
          normalizedId.includes(normalizedQuery)
        );
      })
      .slice(0, 10); // Limite de 10 resultados
  }, [query, careerId]);

  const handleSelect = (courseId: string) => {
    setHoveredCourseId(courseId);
    window.dispatchEvent(
      new CustomEvent("navigate-to-course", { detail: { courseId } })
    );
    close();
  };

  if (query && filteredCourses.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        No se encontraron materias.
      </div>
    );
  }

  if (!query) {
    return (
      <div className="p-4 text-center text-gray-400 text-xs">
        Escribe para buscar...
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {filteredCourses.map((course) => (
        <button
          key={course.id}
          onClick={() => handleSelect(course.id)}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-center justify-between group transition-colors focus:bg-gray-100 dark:focus:bg-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md">
              <GraduationCap size={16} />
            </div>
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {course.name}
              </div>
              <div className="text-xs text-gray-400">
                {course.id} • {course.regimen}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
