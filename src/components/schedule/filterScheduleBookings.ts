import { ALL_ROOMS, type BookingListItem } from "../bookings";
import type { SchedulePeriod } from "./type";

export function filterScheduleBookings(
  items: readonly BookingListItem[],
  period: SchedulePeriod,
  roomId: string = ALL_ROOMS,
): BookingListItem[] {
  return items
    .filter(
      ({ booking }) =>
        booking.date >= period.start &&
        booking.date <= period.end &&
        (roomId === ALL_ROOMS || booking.roomId === roomId),
    )
    .sort(
      (a, b) =>
        a.booking.date.localeCompare(b.booking.date) ||
        a.booking.startTime.localeCompare(b.booking.startTime),
    );
}

export const bookingsOnDate = (
  items: readonly BookingListItem[],
  date: string,
) => items.filter(({ booking }) => booking.date === date);

export const bookingsInRoom = (
  items: readonly BookingListItem[],
  roomId: string,
) => items.filter(({ booking }) => booking.roomId === roomId);
