import { byStartTime, nowTime, todayISO } from "../bookings";
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

export function isUpcoming(
  { booking }: BookingListItem,
  today = todayISO(),
  now = nowTime(),
): boolean {
  if (booking.status !== "confirmed") return false;
  if (booking.date > today) return true;

  return booking.date === today && booking.endTime > now;
}

export function getUpcomingBookings(
  items: readonly BookingListItem[],
  today = todayISO(),
  now = nowTime(),
): BookingListItem[] {
  return items.filter((item) => isUpcoming(item, today, now)).sort(byStartTime);
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
