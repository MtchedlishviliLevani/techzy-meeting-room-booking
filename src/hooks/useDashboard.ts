import { useMemo } from "react";
import {
  UPCOMING_PREVIEW_LIMIT,
  getDashboardStats,
  getTodayBookings,
  getUpcomingBookings,
  nowTime,
  resolveBookings,
  todayISO,
  withAvailability,
  type DashboardData,
} from "@/components";
import { useBookingsContext } from "@/context";

export function useDashboard(limit = UPCOMING_PREVIEW_LIMIT): DashboardData {
  const { bookings, rooms, employees, loading, error } = useBookingsContext();

  const today = todayISO();
  const now = nowTime();

  return useMemo(() => {
    const items = resolveBookings(bookings, rooms, employees);
    const roomsWithAvailability = withAvailability(rooms, bookings, today, now);
    const upcoming = getUpcomingBookings(items, today, now);

    return {
      loading,
      error,
      today,
      stats: getDashboardStats(roomsWithAvailability, items, upcoming),
      rooms: roomsWithAvailability,
      todayBookings: getTodayBookings(items, today),
      upcomingBookings: upcoming.slice(0, limit),
      upcomingCount: upcoming.length,
    };
  }, [bookings, rooms, employees, loading, error, today, now, limit]);
}
