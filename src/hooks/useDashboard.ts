import { useMemo } from "react";
import {
  UPCOMING_PREVIEW_LIMIT,
  getDashboardStats,
  getTodayBookings,
  getUpcomingBookings,
  resolveBookings,
  withAvailability,
  type DashboardData,
} from "@/components";
import { useBookingsContext } from "@/context";

export function useDashboard(limit = UPCOMING_PREVIEW_LIMIT): DashboardData {
  const { bookings, rooms, employees, loading, error, today, now } =
    useBookingsContext();

  return useMemo(() => {
    const items = resolveBookings(bookings, rooms, employees, today, now);
    const roomsWithAvailability = withAvailability(rooms, bookings, today, now);
    const upcoming = getUpcomingBookings(items);

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
