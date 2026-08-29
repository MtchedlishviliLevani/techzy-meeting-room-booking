import { todayISO, weekRange } from "./bookingDates";
import {
  ALL_DATES,
  ALL_ORGANIZERS,
  ALL_ROOMS,
  ALL_STATUSES,
} from "./BookingFilters/data";
import type { BookingFilterValues, BookingListItem } from "./type";

function matchesDate(
  date: string,
  filters: BookingFilterValues,
  today: string,
): boolean {
  if (filters.dateRange === ALL_DATES) return true;
  if (filters.dateRange === "today") return date === today;

  if (filters.dateRange === "week") {
    const { start, end } = weekRange(today);
    return date >= start && date <= end;
  }

  return filters.customDate === "" || date === filters.customDate;
}

export function filterBookings(
  items: readonly BookingListItem[],
  filters: BookingFilterValues,
  today = todayISO(),
): BookingListItem[] {
  const search = filters.search.trim().toLowerCase();

  return items.filter(({ booking, room, organizer }) => {
    const matchesSearch =
      search === "" ||
      booking.title.toLowerCase().includes(search) ||
      (room?.name.toLowerCase().includes(search) ?? false) ||
      (organizer?.name.toLowerCase().includes(search) ?? false);

    const matchesStatus =
      filters.status === ALL_STATUSES || booking.status === filters.status;

    const matchesRoom =
      filters.roomId === ALL_ROOMS || booking.roomId === filters.roomId;

    const matchesOrganizer =
      filters.organizerId === ALL_ORGANIZERS ||
      booking.organizerId === filters.organizerId;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRoom &&
      matchesOrganizer &&
      matchesDate(booking.date, filters, today)
    );
  });
}
