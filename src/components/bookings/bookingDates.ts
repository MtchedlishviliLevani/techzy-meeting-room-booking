import { daysBetween, parseISODate, todayISO, toISODate } from "@/lib";

export { nowTime, parseISODate, toISODate, todayISO } from "@/lib";

export function weekRange(today: string) {
  const date = parseISODate(today);
  const mondayOffset = (date.getDay() + 6) % 7;

  const start = new Date(date);
  start.setDate(date.getDate() - mondayOffset);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return { start: toISODate(start), end: toISODate(end) };
}

export function formatBookingDate(date: string, today = todayISO()): string {
  const diff = daysBetween(today, date);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";

  return parseISODate(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export const formatFullDate = (date: string) =>
  parseISODate(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const formatTimeRange = (startTime: string, endTime: string) =>
  `${startTime}–${endTime}`;
