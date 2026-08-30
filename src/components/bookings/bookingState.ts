import type { Booking } from "@/services";
import { nowTime, todayISO } from "./bookingDates";
import type { BookingState } from "./type";

type Timed = Pick<Booking, "date" | "endTime">;

export function hasEnded(
  booking: Timed,
  today = todayISO(),
  now = nowTime(),
): boolean {
  if (booking.date < today) return true;
  return booking.date === today && booking.endTime <= now;
}

export function getBookingState(
  booking: Booking,
  today = todayISO(),
  now = nowTime(),
): BookingState {
  if (booking.status === "cancelled") return "cancelled";
  return hasEnded(booking, today, now) ? "completed" : "upcoming";
}

export const isModifiable = (
  booking: Booking,
  today = todayISO(),
  now = nowTime(),
) => getBookingState(booking, today, now) === "upcoming";
