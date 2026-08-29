import { countLabel } from "@/lib";
import { nowTime, todayISO } from "./bookingDates";
import type {
  BookingFormErrors,
  BookingFormValues,
  ValidateBookingOptions,
} from "./type";
import type { Booking } from "@/services";

function findClash(
  values: BookingFormValues,
  bookings: readonly Booking[],
  bookingId?: string,
) {
  return bookings.find(
    (booking) =>
      booking.id !== bookingId &&
      booking.status !== "cancelled" &&
      booking.roomId === values.roomId &&
      booking.date === values.date &&
      values.startTime < booking.endTime &&
      booking.startTime < values.endTime,
  );
}

export function validateBooking(
  values: BookingFormValues,
  {
    rooms,
    bookings,
    bookingId,
    allowPastStart = false,
    today = todayISO(),
    now = nowTime(),
  }: ValidateBookingOptions,
): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (values.title.trim() === "") {
    errors.title = "Give the meeting a title.";
  }

  if (values.roomId === "") {
    errors.roomId = "Choose a room.";
  }

  if (values.date === "") {
    errors.date = "Pick a date.";
  } else if (values.date < today) {
    errors.date = "That date has passed — pick today or a later date.";
  }

  if (values.startTime === "") {
    errors.startTime = "Add a start time.";
  } else if (
    !allowPastStart &&
    values.date === today &&
    values.startTime < now
  ) {
    errors.startTime = `That time has already passed — it is ${now}.`;
  }

  if (values.endTime === "") {
    errors.endTime = "Add an end time.";
  } else if (values.startTime !== "" && values.endTime <= values.startTime) {
    errors.endTime = "The end time must be after the start time.";
  }

  if (values.organizerId === "") {
    errors.organizerId = "Choose an organizer.";
  }

  const room = rooms.find((item) => item.id === values.roomId);

  if (room && values.attendeeIds.length > room.capacity) {
    const over = values.attendeeIds.length - room.capacity;
    errors.attendeeIds = `${room.name} seats ${room.capacity}. Remove ${countLabel(over, "attendee")} or pick a larger room.`;
  }

  const timesAreUsable = !errors.date && !errors.startTime && !errors.endTime;

  if (room && timesAreUsable) {
    const clash = findClash(values, bookings, bookingId);

    if (clash) {
      errors.roomId = `${room.name} is already booked ${clash.startTime}–${clash.endTime} that day (${clash.title}).`;
    }
  }

  return errors;
}
