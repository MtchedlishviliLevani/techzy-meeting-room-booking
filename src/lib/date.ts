const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function parseISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export const todayISO = () => toISODate(new Date());

export const nowTime = () => new Date().toTimeString().slice(0, 5);

export function addDays(date: string, days: number): string {
  const shifted = parseISODate(date);
  shifted.setDate(shifted.getDate() + days);
  return toISODate(shifted);
}

export function daysBetween(from: string, to: string): number {
  const diff = parseISODate(to).getTime() - parseISODate(from).getTime();
  return Math.round(diff / MS_PER_DAY);
}
