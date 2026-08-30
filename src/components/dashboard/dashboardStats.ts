import { byStartTime, todayISO } from "../bookings";
import type { BookingListItem } from "../bookings";
import { availableRooms } from "../rooms";
import type { RoomListItem } from "../rooms";
import type { DashboardStats } from "./type";

export const UPCOMING_PREVIEW_LIMIT = 5;

export function getTodayBookings(
  items: readonly BookingListItem[],
  today = todayISO(),
): BookingListItem[] {
  return items
    .filter(({ booking }) => booking.date === today)
    .sort(byStartTime);
}

export const isUpcoming = (item: BookingListItem) => item.state === "upcoming";

export function getUpcomingBookings(
  items: readonly BookingListItem[],
): BookingListItem[] {
  return items.filter(isUpcoming).sort(byStartTime);
}

export function getDashboardStats(
  rooms: readonly RoomListItem[],
  bookings: readonly BookingListItem[],
  upcoming: readonly BookingListItem[],
): DashboardStats {
  return {
    totalRooms: rooms.length,
    availableNow: availableRooms(rooms).length,
    totalBookings: bookings.length,
    upcomingMeetings: upcoming.length,
  };
}
