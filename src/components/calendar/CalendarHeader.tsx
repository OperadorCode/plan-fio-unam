import { memo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarHeaderProps {
    monthName: string;
    year: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onGoToday: () => void;
}

export const CalendarHeader = memo(({ monthName, year, onPrevMonth, onNextMonth, onGoToday }: CalendarHeaderProps) => {
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
    );
});
