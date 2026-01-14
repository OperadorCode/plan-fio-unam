import React, { useState, useMemo, useCallback } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { useCalendarEvents } from "../../../hooks/useCalendarEvents";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { CalendarHeader } from "../../calendar/CalendarHeader";
import { CalendarGrid } from "../../calendar/CalendarGrid";
import { CalendarScheduleView } from "../../calendar/CalendarScheduleView";
import { CalendarLegend } from "../../calendar/CalendarLegend";
import { CalendarAgenda } from "../../calendar/CalendarAgenda";
import CalendarErrorBoundary from "../../calendar/CalendarErrorBoundary";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [visibleTypes, setVisibleTypes] = useState<Record<string, boolean>>({
    academic: true,
    exam: true,
    holiday: true,
    special: true,
    personal: true,
  });

  const { addCalendarEvent, removeCalendarEvent } = useAppStore();

  const unifiedEvents = useCalendarEvents();

  const changeMonth = useCallback((delta: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + delta);
      return newDate;
    });
  }, []);

  const handleGoToday = useCallback(() => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  }, []);

  const toggleFilter = useCallback((type: string) => {
    setVisibleTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  }, []);

  const filteredEvents = useMemo(() => {
    return unifiedEvents.filter((e) => visibleTypes[e.type]);
  }, [unifiedEvents, visibleTypes]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">
      {/* Columna Principal: Calendario */}
      <div className="flex-grow bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
        <CalendarHeader
          monthName={format(currentDate, "MMMM", { locale: es })}
          year={currentDate.getFullYear()}
          viewMode={viewMode}
          onViewChange={setViewMode}
          onPrevMonth={() => changeMonth(-1)}
          onNextMonth={() => changeMonth(1)}
          onGoToday={handleGoToday}
        />

        <div className="flex-grow overflow-y-auto custom-scrollbar relative">
          {viewMode === "grid" ? (
            <CalendarGrid
              year={currentDate.getFullYear()}
              month={currentDate.getMonth()}
              selectedDate={selectedDate}
              events={unifiedEvents}
              visibleTypes={visibleTypes}
              onSelectDate={setSelectedDate}
            />
          ) : (
            <CalendarScheduleView
              events={filteredEvents}
              onSelectDate={setSelectedDate}
            />
          )}
        </div>
      </div>

      {/* Columna Lateral: Agenda y Filtros */}
      <div className="w-full lg:w-80 flex-shrink-0 flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex-grow flex flex-col overflow-hidden border-b border-gray-100 dark:border-gray-700">
          <CalendarAgenda
            selectedDate={selectedDate}
            events={filteredEvents}
            onAddEvent={addCalendarEvent}
            onDeleteEvent={removeCalendarEvent}
          />
        </div>
        <div className="flex-shrink-0 p-4 bg-gray-50 dark:bg-gray-700/30">
          <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-xs uppercase tracking-wide">
            Filtros Rápidos
          </h3>
          <CalendarLegend
            visibleTypes={visibleTypes}
            onToggleType={toggleFilter}
          />
        </div>
      </div>
    </div>
  );
};

const SafeCalendar = () => (
  <CalendarErrorBoundary>
    <Calendar />
  </CalendarErrorBoundary>
);

export default SafeCalendar;
