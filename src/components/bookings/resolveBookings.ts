import type { Booking, Employee, Room } from "@/services";
import type { BookingListItem } from "./type";

export function resolveBookings(
  bookings: readonly Booking[],
  rooms: readonly Room[],
  employees: readonly Employee[],
): BookingListItem[] {
  const roomsById = new Map(rooms.map((room) => [room.id, room]));
  const employeesById = new Map(employees.map((employee) => [employee.id, employee]));

  return bookings.map((booking) => ({
    booking,
    room: roomsById.get(booking.roomId),
    organizer: employeesById.get(booking.organizerId),
    attendees: booking.attendeeIds
      .map((id) => employeesById.get(id))
      .filter((employee) => employee !== undefined),
  }));
}
