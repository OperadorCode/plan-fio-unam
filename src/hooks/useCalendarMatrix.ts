import { useMemo } from "react";
import type { UnifiedEvent } from "../hooks/useCalendarEvents";

export interface CalendarCellData {
  id: string;
  type: "empty" | "day";
  dateObj?: Date;
  dateString?: string;
  dayNumber?: number;
  isToday?: boolean;
  isSelected?: boolean;
  events?: UnifiedEvent[];
}

export const useCalendarMatrix = (
  year: number,
  month: number,
  events: UnifiedEvent[],
  selectedDate: Date,
  visibleTypes: Record<string, boolean>
) => {
  const todayStr = new Date().toDateString();
  const selectedStr = selectedDate.toDateString();

  return useMemo(() => {
    const getDaysInMonth = (y: number, m: number) =>
      new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (y: number, m: number) =>
      new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const totalSlots = firstDay + daysInMonth;
    const totalRows = Math.ceil(totalSlots / 7);

    const cells: CalendarCellData[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push({ id: `start-empty-${i}`, type: "empty" });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateString = dateObj.toISOString().split("T")[0];
      const isToday = todayStr === dateObj.toDateString();
      const isSelected = selectedStr === dateObj.toDateString();

      const dayEvents = events.filter(
        (e) => e.date === dateString && visibleTypes[e.type]
      );

      cells.push({
        id: `day-${day}`,
        type: "day",
        dateObj,
        dateString,
        dayNumber: day,
        isToday,
        isSelected,
        events: dayEvents,
      });
    }

    const remaining = totalRows * 7 - totalSlots;
    for (let i = 0; i < remaining; i++) {
      cells.push({ id: `end-empty-${i}`, type: "empty" });
    }

    return {
      cells,
      totalRows,
      daysOfWeek: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    };
  }, [year, month, events, visibleTypes, todayStr, selectedStr]);
};
