import { todayISO } from "./bookingDates";
import type { BookingListItem } from "./type";

const startsAt = ({ booking }: BookingListItem) =>
  `${booking.date} ${booking.startTime}`;

export function sortBookings(
  items: readonly BookingListItem[],
  today = todayISO(),
): BookingListItem[] {
  const upcoming = items.filter(({ booking }) => booking.date >= today);
  const past = items.filter(({ booking }) => booking.date < today);

  return [
    ...upcoming.sort((a, b) => startsAt(a).localeCompare(startsAt(b))),
    ...past.sort((a, b) => startsAt(b).localeCompare(startsAt(a))),
  ];
}
