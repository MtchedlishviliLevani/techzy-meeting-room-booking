import { todayISO } from "./bookingDates";
import type { BookingListItem } from "./type";

const startsAt = ({ booking }: BookingListItem) =>
  `${booking.date} ${booking.startTime}`;

export const byStartTime = (a: BookingListItem, b: BookingListItem) =>
  startsAt(a).localeCompare(startsAt(b));

export function sortBookings(
  items: readonly BookingListItem[],
  today = todayISO(),
): BookingListItem[] {
  const upcoming = items.filter(({ booking }) => booking.date >= today);
  const past = items.filter(({ booking }) => booking.date < today);

  return [
    ...upcoming.sort(byStartTime),
    ...past.sort((a, b) => byStartTime(b, a)),
  ];
}
