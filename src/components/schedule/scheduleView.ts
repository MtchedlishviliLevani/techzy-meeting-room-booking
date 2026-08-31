import type { Room } from "@/services";
import { ALL_ROOMS, type BookingListItem } from "../bookings";
import type { ScheduleVisibility } from "./type";

export function visibleScheduleRooms(
  rooms: readonly Room[],
  roomId: string = ALL_ROOMS,
): Room[] {
  return roomId === ALL_ROOMS
    ? [...rooms]
    : rooms.filter((room) => room.id === roomId);
}

export function getScheduleVisibility(
  rooms: readonly Room[],
  bookings: readonly BookingListItem[],
  ready: boolean,
): ScheduleVisibility {
  const hasRooms = rooms.length > 0;
  const hasBookings = bookings.length > 0;

  return {
    showRoomEmptyState: ready && !hasRooms,
    showBookingsEmptyState: ready && hasRooms && !hasBookings,
    showSchedule: ready && hasRooms && hasBookings,
  };
}
