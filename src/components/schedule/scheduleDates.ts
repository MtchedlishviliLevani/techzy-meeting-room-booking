import { parseISODate, toISODate, weekRange } from "../bookings";
import type { ScheduleView } from "./ScheduleControls/data";
import type { SchedulePeriod } from "./type";

const DAYS_PER_WEEK = 7;

export function shiftDate(date: string, days: number): string {
  const shifted = parseISODate(date);
  shifted.setDate(shifted.getDate() + days);
  return toISODate(shifted);
}

export function schedulePeriod(view: ScheduleView, date: string): SchedulePeriod {
  if (view === "day") return { start: date, end: date, days: [date] };

  const { start, end } = weekRange(date);
  const days = Array.from({ length: DAYS_PER_WEEK }, (_, index) =>
    shiftDate(start, index),
  );

  return { start, end, days };
}

export const stepForView = (view: ScheduleView) =>
  view === "day" ? 1 : DAYS_PER_WEEK;

export const formatWeekday = (date: string) =>
  parseISODate(date).toLocaleDateString("en-GB", { weekday: "short" });

export const formatDayAndMonth = (date: string) =>
  parseISODate(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

function formatWeekLabel(start: string, end: string): string {
  const from = parseISODate(start);
  const to = parseISODate(end);

  const sameYear = from.getFullYear() === to.getFullYear();
  const sameMonth = sameYear && from.getMonth() === to.getMonth();

  const fromLabel = from.toLocaleDateString("en-GB", {
    day: "numeric",
    ...(sameMonth ? {} : { month: "long" }),
    ...(sameYear ? {} : { year: "numeric" }),
  });

  const toLabel = to.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${fromLabel} – ${toLabel}`;
}

export function formatPeriodLabel(view: ScheduleView, date: string): string {
  if (view === "day") {
    return parseISODate(date).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const { start, end } = schedulePeriod(view, date);
  return formatWeekLabel(start, end);
}

export const isCurrentPeriod = (period: SchedulePeriod, today: string) =>
  today >= period.start && today <= period.end;
