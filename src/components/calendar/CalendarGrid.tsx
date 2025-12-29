import { memo } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { UnifiedEvent } from '../../hooks/useCalendarEvents';
import type { EventType } from '../../data/calendarConfig';

interface CalendarGridProps {
    year: number;
    month: number;
    selectedDate: Date;
    events: UnifiedEvent[];
    visibleTypes: Record<string, boolean>;
    onSelectDate: (date: Date) => void;
}

const EVENT_PRIORITY: Record<EventType | 'personal', number> = {
    exam: 5,
    holiday: 4,
    special: 3,
    personal: 2,
    academic: 1
};

const BG_COLORS: Record<EventType | 'personal', string> = {
    academic: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    exam: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    holiday: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    special: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    personal: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
};

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export const CalendarGrid = memo(({ year, month, selectedDate, events, visibleTypes, onSelectDate }: CalendarGridProps) => {
    const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const renderDays = () => {
        const days = [];
        const todayStr = new Date().toDateString();
        const selectedStr = selectedDate.toDateString();


        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} aria-hidden="true" className="aspect-square"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month, day);
            const dateString = dateObj.toISOString().split('T')[0];
            const isToday = todayStr === dateObj.toDateString();
            const isSelected = selectedStr === dateObj.toDateString();


            const dayEvents = events.filter(e => e.date === dateString && visibleTypes[e.type]);

            let bgClass = "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

            if (dayEvents.length > 0) {
                const priorityEvent = [...dayEvents].sort((a, b) => EVENT_PRIORITY[b.type] - EVENT_PRIORITY[a.type])[0];
                bgClass = `${BG_COLORS[priorityEvent.type]} hover:opacity-80 font-medium`;
            }

            if (isToday) {
                bgClass = "bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700";
            } else if (isSelected) {
                bgClass += " ring-2 ring-blue-400 ring-offset-1 dark:ring-offset-gray-800 z-10";
            }

            const monthName = format(new Date(year, month), 'MMMM', { locale: es });
            const ariaLabel = `${day} de ${monthName}, ${dayEvents.length > 0 ? `${dayEvents.length} eventos` : 'Sin eventos'}`;

            days.push(
                <button
                    key={day}
                    onClick={() => onSelectDate(dateObj)}
                    aria-label={ariaLabel}
                    aria-current={isToday ? 'date' : undefined}
                    aria-pressed={isSelected}
                    className={`
                        /* UX MÓVIL: Ampliamos el touch target */
                        aspect-square w-full min-h-[46px] sm:min-h-auto
                        flex flex-col items-center justify-center rounded-lg relative transition-all duration-200
                        ${bgClass}
                    `}
                >
                    <span className="text-xs sm:text-sm">{day}</span>
                    {/* Puntos indicadores si hay más de un evento */}
                    {!isToday && dayEvents.length > 1 && (
                        <div className="flex gap-0.5 mt-0.5" aria-hidden="true">
                            <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
                            <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
                        </div>
                    )}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="p-2 sm:p-4 pb-2">
            <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase">
                        {d}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {renderDays()}
            </div>
        </div>
    );
});
