import { memo, useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Tag } from "lucide-react";
import type { UnifiedEvent } from "../../hooks/useCalendarEvents";
import type { EventType } from "../../data/calendar/calendarConfig";

interface CalendarScheduleViewProps {
  events: UnifiedEvent[];
  onSelectDate: (date: Date) => void;
}

const TYPE_LABELS: Record<string, string> = {
  academic: "Académico",
  exam: "Examen",
  holiday: "Feriado",
  special: "Especial",
  personal: "Nota Personal",
};

const BORDER_COLORS: Record<EventType | "personal", string> = {
  academic: "border-blue-500",
  exam: "border-purple-500",
  holiday: "border-green-500",
  special: "border-orange-500",
  personal: "border-pink-500",
};

export const CalendarScheduleView = memo(
  ({ events, onSelectDate }: CalendarScheduleViewProps) => {
    const groupedEvents = useMemo(() => {
      const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

      const groups: Record<string, UnifiedEvent[]> = {};

      sorted.forEach((ev) => {
        const dateObj = new Date(ev.date + "T12:00:00"); // Safe parsing
        const monthKey = format(dateObj, "MMMM yyyy", { locale: es }); // "marzo 2025"

        if (!groups[monthKey]) {
          groups[monthKey] = [];
        }
        groups[monthKey].push(ev);
      });

      return groups;
    }, [events]);

    return (
      <div className="h-[400px] overflow-y-auto custom-scrollbar bg-white dark:bg-gray-800">
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 italic">
            No hay eventos para mostrar.
          </div>
        ) : (
          Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <div key={month} className="mb-0">
              <h3 className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-4 py-2 text-sm font-bold text-gray-800 dark:text-blue-300 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 shadow-sm z-10">
                {month}
              </h3>
              <div className="space-y-3 px-4 py-3">
                {monthEvents.map((ev, idx) => {
                  const dateObj = new Date(ev.date + "T12:00:00");
                  const dayNum = dateObj.getDate();
                  const dayName = format(dateObj, "EEEE", { locale: es }); // "lunes"

                  return (
                    <div
                      key={`${ev.date}-${idx}`}
                      onClick={() =>
                        onSelectDate(new Date(ev.date + "T12:00:00"))
                      }
                      className={`group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-l-4 ${
                        BORDER_COLORS[ev.type]
                      }`}
                    >
                      <div className="flex flex-col items-center min-w-[3rem]">
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {dayName.slice(0, 3)}
                        </span>
                        <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                          {dayNum}
                        </span>
                      </div>

                      <div className="flex-1">
                        <p className="text-gray-800 dark:text-gray-100 font-medium text-sm">
                          {ev.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center gap-1`}
                          >
                            <Tag size={10} />
                            {TYPE_LABELS[ev.type] || ev.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
);
