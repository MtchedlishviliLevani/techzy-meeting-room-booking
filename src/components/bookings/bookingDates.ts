const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export const todayISO = () => toISODate(new Date());

export const nowTime = () => new Date().toTimeString().slice(0, 5);

export function parseISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const dayDiff = (date: string, from: string) =>
  Math.round((parseISODate(date).getTime() - parseISODate(from).getTime()) / MS_PER_DAY);

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
  const diff = dayDiff(date, today);
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
