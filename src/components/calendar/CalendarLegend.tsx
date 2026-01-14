import { memo } from "react";
import type { EventType } from "../../data/calendar/calendarConfig";

interface CalendarLegendProps {
  visibleTypes: Record<string, boolean>;
  onToggleType: (type: string) => void;
}

const LEGEND_COLORS: Record<EventType | "personal", string> = {
  academic: "bg-blue-500",
  exam: "bg-purple-500",
  holiday: "bg-green-500",
  special: "bg-orange-500",
  personal: "bg-pink-500",
};

const LEGEND_LABELS: Record<EventType | "personal", string> = {
  academic: "Académico",
  exam: "Exámenes",
  holiday: "Feriados",
  special: "Especial",
  personal: "Personal",
};

export const CalendarLegend = memo(
  ({ visibleTypes, onToggleType }: CalendarLegendProps) => {
    return (
      <div className="px-4 pb-4 flex flex-wrap justify-center gap-2 sm:gap-3 border-b border-gray-100 dark:border-gray-700">
        {Object.keys(LEGEND_COLORS).map((key) => {
          const k = key as EventType | "personal";
          const isVisible = visibleTypes[key];
          return (
            <button
              key={k}
              onClick={() => onToggleType(key)}
              aria-pressed={isVisible}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300 ${
                isVisible
                  ? "bg-gray-100 dark:bg-gray-700 opacity-100"
                  : "opacity-50 grayscale"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${LEGEND_COLORS[k]}`}
              ></span>
              <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">
                {LEGEND_LABELS[k]}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);
