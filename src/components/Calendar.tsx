import React, { useState, useMemo, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Subcomponents
import { CalendarHeader } from './calendar/CalendarHeader';
import { CalendarGrid } from './calendar/CalendarGrid';
import { CalendarScheduleView } from './calendar/CalendarScheduleView';
import { CalendarLegend } from './calendar/CalendarLegend';
import { CalendarAgenda } from './calendar/CalendarAgenda';
import CalendarErrorBoundary from './calendar/CalendarErrorBoundary';

/**
 * Componente: Calendar (Calendario Académico)
 * -------------------------------------------
 * Visualización mensual modularizada.
 * Utiliza hooks para la lógica de datos y subcomponentes para el renderizado.
 */

const Calendar: React.FC = () => {
    // --- ESTADOS ---
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Estado de filtros
    const [visibleTypes, setVisibleTypes] = useState<Record<string, boolean>>({
        academic: true,
        exam: true,
        holiday: true,
        special: true,
        personal: true
    });

    const { addCalendarEvent, removeCalendarEvent } = useAppStore();

    // --- HOOK DE DATOS ---
    const unifiedEvents = useCalendarEvents();

    // --- MANEJADORES ---
    const changeMonth = useCallback((delta: number) => {
        setCurrentDate(prev => {
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
        setVisibleTypes(prev => ({ ...prev, [type]: !prev[type] }));
    }, []);

    const filteredEvents = useMemo(() => {
        return unifiedEvents.filter(e => visibleTypes[e.type]);
    }, [unifiedEvents, visibleTypes]);

    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in flex flex-col">

            <CalendarHeader
                monthName={format(currentDate, 'MMMM', { locale: es })}
                year={currentDate.getFullYear()}
                viewMode={viewMode}
                onViewChange={setViewMode}
                onPrevMonth={() => changeMonth(-1)}
                onNextMonth={() => changeMonth(1)}
                onGoToday={handleGoToday}
            />

            {viewMode === 'grid' ? (
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

            <CalendarLegend
                visibleTypes={visibleTypes}
                onToggleType={toggleFilter}
            />

            <CalendarAgenda
                selectedDate={selectedDate}
                events={filteredEvents}
                onAddEvent={addCalendarEvent}
                onDeleteEvent={removeCalendarEvent}
            />

        </div>
    );
};

const SafeCalendar = () => (
    <CalendarErrorBoundary>
        <Calendar />
    </CalendarErrorBoundary>
);

export default SafeCalendar;
