import { addDays, isAfter, isBefore, subYears, differenceInCalendarDays } from "date-fns";
import { toUTCDay, toUTCStartOfDay, getStartingSunday } from "./dateHelpers";
import type { Cell } from "../types/cell";

export function generateCells(yearOption: string, today: Date): { cells: Cell[]; yearStart: Date; yearEnd: Date } {
  let yearStart: Date;
  let yearEnd: Date;
  if (yearOption === "current") {
    yearEnd = toUTCStartOfDay(today);
    yearStart = subYears(yearEnd, 1);
  } else {
    const y = parseInt(yearOption, 10);
    yearStart = new Date(Date.UTC(y, 0, 1));
    yearEnd = new Date(Date.UTC(y, 11, 31));
  }
  const gridStart = getStartingSunday(yearStart);
  const daysBetween = differenceInCalendarDays(yearEnd, gridStart) + 1;
  const totalDays = Math.max(daysBetween, 53 * 7);
  const cells: Cell[] = [];
  for (let i = 0; i < totalDays; i++) {
    const date = addDays(gridStart, i);
    const isOutOfRange =
      isBefore(date, yearStart) ||
      isAfter(date, yearEnd) ||
      (yearOption === "current" && isAfter(date, today));
    cells.push({ date, intensity: 0, isOutOfRange });
  }
  return { cells, yearStart, yearEnd };
}

export function computeMonthLabels(cells: Cell[]): Record<number, number> {
  const monthPositions: Record<number, number> = {};
  for (let i = 0; i < cells.length; i++) {
    if (toUTCDay(cells[i].date) !== 0) continue;
    const month = cells[i].date.getUTCMonth();
    if (!(month in monthPositions)) {
      monthPositions[month] = Math.floor(i / 7);
    }
  }
  return monthPositions;
}
