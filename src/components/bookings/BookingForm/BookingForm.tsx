import { useRef, useState, type FormEvent } from "react";
import {
  Button,
  CheckboxGroup,
  DateInput,
  FIELD_LABEL,
  FieldError,
  Select,
  TextInput,
  Textarea,
} from "@/components/ui";
import { todayISO } from "../bookingDates";
import { validateBooking } from "../validateBooking";
import type { BookingFormErrors, BookingFormValues } from "../type";
import type { BookingFormProps } from "./type";
import {
  toEmployeeOptions,
  toFormValues,
  toRoomFieldOptions,
  toggleId,
} from "./data";

const ATTENDEES_ERROR_ID = "booking-attendees-error";

const NO_ERRORS: BookingFormErrors = {};

function BookingForm({
  mode = "create",
  booking,
  rooms,
  employees,
  bookings = [],
  defaultRoomId,
  onSubmit,
  onCancel,
  className = "",
}: BookingFormProps) {
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
    allowPastStart: mode === "edit",
    today,
  });

  
  const visible = submitted ? errors : NO_ERRORS;
  const roomOptions = toRoomFieldOptions(rooms);
  const employeeOptions = toEmployeeOptions(employees);

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

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 ${className}`}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <TextInput
          label="Meeting title"
          name="title"
          placeholder="e.g. Engineering Weekly Sync"
          value={values.title}
          error={visible.title}
          onValueChange={(value) => setValue("title", value)}
          wrapperClassName="sm:col-span-2"
        />

        <Textarea
          label="Description"
          name="description"
          placeholder="What is this meeting about?"
          value={values.description}
          onValueChange={(value) => setValue("description", value)}
          wrapperClassName="sm:col-span-2"
        />

        <Select
          label="Room"
          name="roomId"
          options={roomOptions}
          value={values.roomId}
          error={visible.roomId}
          onValueChange={(value) => setValue("roomId", value)}
        />

        <DateInput
          label="Date"
          name="date"
          min={mode === "create" ? today : undefined}
          value={values.date}
          error={visible.date}
          onValueChange={(value) => setValue("date", value)}
        />

        <TextInput
          label="Start time"
          name="startTime"
          type="time"
          value={values.startTime}
          error={visible.startTime}
          onValueChange={(value) => setValue("startTime", value)}
        />

        <TextInput
          label="End time"
          name="endTime"
          type="time"
          value={values.endTime}
          error={visible.endTime}
          onValueChange={(value) => setValue("endTime", value)}
        />

        <Select
          label="Organizer"
          name="organizerId"
          options={employeeOptions}
          value={values.organizerId}
          error={visible.organizerId}
          onValueChange={(value) => setValue("organizerId", value)}
          wrapperClassName="sm:col-span-2"
        />
      </div>

      <div>
        <p className={FIELD_LABEL}>Attendees ({values.attendeeIds.length})</p>

        <div
          className={`max-h-40 overflow-y-auto overscroll-contain rounded-lg border p-2.5 ${
            visible.attendeeIds ? "border-error" : "border-border"
          }`}
        >
          <CheckboxGroup
            label="Attendees"
            hideLabel
            options={employeeOptions}
            values={values.attendeeIds}
            onToggle={(id) =>
              setValue("attendeeIds", toggleId(values.attendeeIds, id))
            }
          />
        </div>

        <FieldError id={ATTENDEES_ERROR_ID} message={visible.attendeeIds} />
      </div>

      <div className="border-border flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "edit" ? "Save changes" : "Create booking"}
        </Button>
      </div>
    </form>
  );
}

export default BookingForm;
