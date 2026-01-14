import { memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  LayoutGrid,
  List,
} from "lucide-react";

interface CalendarHeaderProps {
  monthName: string;
  year: number;
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToday: () => void;
}

export const CalendarHeader = memo(
  ({
    monthName,
    year,
    viewMode,
    onViewChange,
    onPrevMonth,
    onNextMonth,
    onGoToday,
  }: CalendarHeaderProps) => {
    return (
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-md">
            <CalendarIcon size={18} aria-hidden="true" />
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wide">
            {monthName} {year}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-700 p-0.5 rounded-lg">
            <button
              onClick={() => onViewChange("grid")}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              title="Vista Mensual"
              aria-label="Vista Mensual"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              title="Vista de Agenda"
              aria-label="Vista de Agenda"
            >
              <List size={14} />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

          <div className="flex gap-1">
            <button
              onClick={onPrevMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Mes anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={onGoToday}
              className="text-xs px-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Ir a hoy"
            >
              Hoy
            </button>
            <button
              onClick={onNextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Mes siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }
);
