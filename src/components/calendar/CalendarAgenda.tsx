import { memo, useState } from "react";
import { Clock, Trash2, Tag, Plus } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { UnifiedEvent } from "../../hooks/useCalendarEvents";
import type { EventType } from "../../data/calendar/calendarConfig";

interface CalendarAgendaProps {
  selectedDate: Date;
  events: UnifiedEvent[];
  onAddEvent: (dateKey: string, text: string) => void;
  onDeleteEvent: (dateKey: string, index: number) => void;
}

const BORDER_COLORS: Record<EventType | "personal", string> = {
  academic: "border-blue-500",
  exam: "border-purple-500",
  holiday: "border-green-500",
  special: "border-orange-500",
  personal: "border-pink-500",
};

export const CalendarAgenda = memo(
  ({
    selectedDate,
    events,
    onAddEvent,
    onDeleteEvent,
  }: CalendarAgendaProps) => {
    const [newEventText, setNewEventText] = useState("");

    const dateKey = selectedDate.toISOString().split("T")[0];

    const eventsForDay = events.filter((e) => e.date === dateKey);

    const handleAdd = () => {
      if (!newEventText.trim()) return;
      onAddEvent(dateKey, newEventText.trim());
      setNewEventText("");
    };

    const handleDelete = (date: string, index?: number) => {
      if (typeof index === "number") {
        onDeleteEvent(date, index);
      }
    };

    return (
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            Agenda del {format(selectedDate, "d 'de' MMMM", { locale: es })}
          </h4>
          <span className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
            {eventsForDay.length} eventos
          </span>
        </div>

        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {eventsForDay.length > 0 ? (
            eventsForDay.map((ev, idx) => (
              <div
                key={idx}
                className={`group pl-3 border-l-4 ${
                  BORDER_COLORS[ev.type]
                } bg-white dark:bg-gray-800 p-2 rounded-r-md shadow-sm text-sm flex justify-between items-start transition-all hover:shadow-md`}
              >
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium leading-snug">
                    {ev.description}
                  </p>
                  <p className="text-xs text-gray-500 capitalize mt-0.5 flex items-center gap-1">
                    <Tag size={10} />
                    {ev.type === "personal"
                      ? "Nota Personal"
                      : ev.type === "holiday"
                      ? "Feriado"
                      : ev.type === "academic"
                      ? "Académico"
                      : ev.type === "exam"
                      ? "Examen"
                      : ev.type === "special"
                      ? "Especial"
                      : ev.type}
                  </p>
                </div>

                {ev.type === "personal" && (
                  <button
                    onClick={() => handleDelete(ev.date, ev.originalIndex)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar nota"
                    aria-label={`Eliminar nota: ${ev.description}`}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-400 text-sm italic bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
              No hay eventos visibles para este día.
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newEventText}
            onChange={(e) => setNewEventText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Agregar nota rápida..."
            className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            aria-label="Texto para nueva nota personal"
          />
          <button
            onClick={handleAdd}
            disabled={!newEventText.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:bg-gray-400"
            aria-label="Guardar nota"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    );
  }
);
