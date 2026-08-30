import type { CSSProperties } from "react";
import type { BookingListItem } from "../bookings";
import type {
  ScheduleEvent,
  ScheduleEventLayout,
  ScheduleHourRange,
} from "./type";

export const SCHEDULE_HOUR_HEIGHT = 64;

const DEFAULT_START_HOUR = 8;
const DEFAULT_END_HOUR = 19;

const MINUTES_PER_HOUR = 60;

export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * MINUTES_PER_HOUR + minutes;
}

export const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const rest = minutes % MINUTES_PER_HOUR;

  if (hours === 0) return `${rest}m`;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

export function scheduleHourRange(
  items: readonly BookingListItem[],
): ScheduleHourRange {
  let startHour = DEFAULT_START_HOUR;
  let endHour = DEFAULT_END_HOUR;

  items.forEach(({ booking }) => {
    startHour = Math.min(
      startHour,
      Math.floor(toMinutes(booking.startTime) / MINUTES_PER_HOUR),
    );
    endHour = Math.max(
      endHour,
      Math.ceil(toMinutes(booking.endTime) / MINUTES_PER_HOUR),
    );
  });

  return { startHour: Math.max(0, startHour), endHour: Math.min(24, endHour) };
}

export const scheduleHours = ({ startHour, endHour }: ScheduleHourRange) =>
  Array.from({ length: endHour - startHour }, (_, index) => startHour + index);

export const scheduleBodyHeight = (range: ScheduleHourRange) =>
  scheduleHours(range).length * SCHEDULE_HOUR_HEIGHT;

const rangeMinutes = ({ startHour, endHour }: ScheduleHourRange) =>
  (endHour - startHour) * MINUTES_PER_HOUR;

export function timeOffsetPercent(
  range: ScheduleHourRange,
  time: string,
): number | null {
  const offset = toMinutes(time) - range.startHour * MINUTES_PER_HOUR;
  const total = rangeMinutes(range);

  return offset < 0 || offset > total ? null : (offset / total) * 100;
}

const startsAt = ({ booking }: BookingListItem) => toMinutes(booking.startTime);
const endsAt = ({ booking }: BookingListItem) => toMinutes(booking.endTime);

function assignLanes(items: readonly BookingListItem[]) {
  const laneEnds: number[] = [];

  const placed = [...items]
    .sort((a, b) => startsAt(a) - startsAt(b) || endsAt(b) - endsAt(a))
    .map((item) => {
      const free = laneEnds.findIndex((end) => end <= startsAt(item));
      const lane = free === -1 ? laneEnds.length : free;

      laneEnds[lane] = endsAt(item);
      return { item, lane };
    });

  return { placed, lanes: Math.max(laneEnds.length, 1) };
}

export function layoutEvents(
  items: readonly BookingListItem[],
  range: ScheduleHourRange,
): ScheduleEventLayout[] {
  const total = rangeMinutes(range);
  const offset = range.startHour * MINUTES_PER_HOUR;
  const { placed, lanes } = assignLanes(items);
  const laneWidth = 100 / lanes;

  return placed.map(({ item, lane }) => {
    const top = ((startsAt(item) - offset) / total) * 100;
    const height = ((endsAt(item) - startsAt(item)) / total) * 100;

    const style: CSSProperties = {
      top: `${Math.max(top, 0)}%`,
      height: `${Math.min(height, 100 - Math.max(top, 0))}%`,
      left: `${lane * laneWidth}%`,
      width: `${laneWidth}%`,
      minHeight: "1.75rem",
    };

    return { item, style };
  });
}

export const bookedMinutes = (items: readonly BookingListItem[]) =>
  items
    .filter(({ booking }) => booking.status !== "cancelled")
    .reduce((total, item) => total + (endsAt(item) - startsAt(item)), 0);

export function groupEventsByColumn(
  events: readonly ScheduleEvent[],
): Map<string, ScheduleEvent["item"][]> {
  const byColumn = new Map<string, ScheduleEvent["item"][]>();

  events.forEach(({ columnKey, item }) => {
    byColumn.set(columnKey, [...(byColumn.get(columnKey) ?? []), item]);
  });

  return byColumn;
}
