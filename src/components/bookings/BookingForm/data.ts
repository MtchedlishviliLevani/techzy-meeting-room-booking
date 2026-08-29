import type { SelectOption } from "@/components/ui";
import { countLabel } from "@/lib";
import type { Booking, Employee, Room } from "@/services";
import { todayISO } from "../bookingDates";
import type { BookingFormValues } from "../type";

export const DEFAULT_START = "09:00";
export const DEFAULT_END = "10:00";

export const toFormValues = (
  booking: Booking | undefined,
  rooms: readonly Room[],
  employees: readonly Employee[],
  defaultRoomId?: string,
): BookingFormValues => ({
  title: booking?.title ?? "",
  description: booking?.description ?? "",
  roomId: booking?.roomId ?? defaultRoomId ?? rooms[0]?.id ?? "",
  organizerId: booking?.organizerId ?? employees[0]?.id ?? "",
  attendeeIds: booking?.attendeeIds ?? [],
  date: booking?.date ?? todayISO(),
  startTime: booking?.startTime ?? DEFAULT_START,
  endTime: booking?.endTime ?? DEFAULT_END,
});

export const toRoomFieldOptions = (rooms: readonly Room[]): SelectOption[] =>
  rooms.map((room) => ({
    label: `${room.name} · ${countLabel(room.capacity, "person", "people")}`,
    value: room.id,
  }));

export const toEmployeeOptions = (
  employees: readonly Employee[],
): SelectOption[] =>
  employees.map((employee) => ({
    label: employee.name,
    value: employee.id,
  }));

export const toggleId = (ids: readonly string[], id: string) =>
  ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];
