import type { Booking, Room } from "@/services";
import { nowTime, todayISO } from "../bookings";
import type { RoomListItem } from "./type";

const coversNow = (booking: Booking, today: string, now: string) =>
  booking.status !== "cancelled" &&
  booking.date === today &&
  booking.startTime <= now &&
  booking.endTime > now;

export function withAvailability(
  rooms: readonly Room[],
  bookings: readonly Booking[],
  today = todayISO(),
  now = nowTime(),
): RoomListItem[] {
  const occupied = new Set(
    bookings
      .filter((booking) => coversNow(booking, today, now))
      .map((booking) => booking.roomId),
  );

  return rooms.map((room) => ({
    ...room,
    availability: occupied.has(room.id) ? "occupied" : "available",
  }));
}

export const availableRooms = (rooms: readonly RoomListItem[]) =>
  rooms.filter((room) => room.availability === "available");
