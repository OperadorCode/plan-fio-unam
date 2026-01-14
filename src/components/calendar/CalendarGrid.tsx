import { memo } from "react";
import type { UnifiedEvent } from "../../hooks/useCalendarEvents";
import type { EventType } from "../../data/calendar/calendarConfig";
import { useCalendarMatrix } from "../../hooks/useCalendarMatrix";

interface CalendarGridProps {
  year: number;
  month: number;
  selectedDate: Date;
  events: UnifiedEvent[];
  visibleTypes: Record<string, boolean>;
  onSelectDate: (date: Date) => void;
}

const BG_COLORS: Record<EventType | "personal", string> = {
  academic: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  exam: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  holiday:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  special:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  personal: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
};

export const CalendarGrid = memo(
  ({
    year,
    month,
    selectedDate,
    events,
    visibleTypes,
    onSelectDate,
  }: CalendarGridProps) => {
    const { cells, totalRows, daysOfWeek } = useCalendarMatrix(
      year,
      month,
      events,
      selectedDate,
      visibleTypes
    );

    return (
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {daysOfWeek.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800"
            >
              {d}
            </div>
          ))}
        </div>
        <div
          className="flex-grow grid grid-cols-7"
          style={{
            gridTemplateRows: `repeat(${totalRows}, minmax(0, 1fr))`,
          }}
        >
          {cells.map((cell) => {
            if (cell.type === "empty") {
              return (
                <div
                  key={cell.id}
                  className="bg-gray-50/30 dark:bg-gray-800/30 border-b border-r border-gray-100 dark:border-gray-700/50"
                ></div>
              );
            }
            let bgClass =
              "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700";
            if (cell.isSelected) bgClass = "bg-blue-50 dark:bg-blue-900/10";

            return (
              <div
                key={cell.id}
                onClick={() => cell.dateObj && onSelectDate(cell.dateObj)}
                className={`
                  relative p-1 border-b border-r border-gray-100 dark:border-gray-700/50 cursor-pointer transition-colors flex flex-col gap-1
                  ${bgClass}
                  ${
                    cell.isSelected
                      ? "ring-2 ring-inset ring-blue-500 z-10"
                      : ""
                  }
                `}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`
                        w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium
                        ${
                          cell.isToday
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-700 dark:text-gray-300"
                        }
                    `}
                  >
                    {cell.dayNumber}
                  </span>
                </div>
                <div className="flex-grow overflow-hidden flex flex-col gap-0.5">
                  {cell.events?.map((event, idx) => (
                    <div
                      key={`${event.date}-${idx}`}
                      className={`
                                px-1.5 py-0.5 rounded text-[9px] truncate font-medium
                                ${BG_COLORS[event.type]}
                            `}
                      title={event.description}
                    >
                      {event.description}
                    </div>
                  ))}
                </div>
                {cell.events && cell.events.length > 3 && (
                  <div className="lg:hidden text-[9px] text-gray-400 text-center -mt-1">
                    •••
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
