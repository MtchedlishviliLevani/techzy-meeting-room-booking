import { useRef, useState, type FormEvent } from "react";
import {
  toEmployeeOptions,
  toFormValues,
  toRoomFieldOptions,
  todayISO,
  toggleId,
  validateBooking,
  type BookingFormControls,
  type BookingFormErrors,
  type BookingFormOptions,
  type BookingFormValues,
} from "@/components";

const NO_ERRORS: BookingFormErrors = {};

export function useBookingForm({
  mode = "create",
  booking,
  rooms,
  employees,
  bookings = [],
  defaultRoomId,
  onSubmit,
}: BookingFormOptions): BookingFormControls {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState(() =>
    toFormValues(booking, rooms, employees, defaultRoomId),
  );

  const today = todayISO();
  const errors = validateBooking(values, {
    rooms,
    bookings,
    bookingId: booking?.id,
    mode,
    today,
  });

  function setValue<K extends keyof BookingFormValues>(
    key: K,
    value: BookingFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const firstInvalid = Object.keys(errors)[0];

    if (firstInvalid) {
      const field = formRef.current?.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    onSubmit?.(values);
  }

  return {
    formRef,
    values,
    errors: submitted ? errors : NO_ERRORS,
    today,
    roomOptions: toRoomFieldOptions(rooms),
    employeeOptions: toEmployeeOptions(employees),
    setValue,
    toggleAttendee: (id) =>
      setValue("attendeeIds", toggleId(values.attendeeIds, id)),
    handleSubmit,
  };
}
