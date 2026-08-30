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
import { useBookingForm } from "@/hooks/useBookingForm";
import type { BookingFormProps } from "./type";

const ATTENDEES_ERROR_ID = "booking-attendees-error";

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
  const {
    formRef,
    values,
    errors,
    today,
    roomOptions,
    employeeOptions,
    setValue,
    toggleAttendee,
    handleSubmit,
  } = useBookingForm({
    mode,
    booking,
    rooms,
    employees,
    bookings,
    defaultRoomId,
    onSubmit,
  });

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
          error={errors.title}
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
          error={errors.roomId}
          onValueChange={(value) => setValue("roomId", value)}
        />

        <DateInput
          label="Date"
          name="date"
          min={mode === "create" ? today : undefined}
          value={values.date}
          error={errors.date}
          onValueChange={(value) => setValue("date", value)}
        />

        <TextInput
          label="Start time"
          name="startTime"
          type="time"
          value={values.startTime}
          error={errors.startTime}
          onValueChange={(value) => setValue("startTime", value)}
        />

        <TextInput
          label="End time"
          name="endTime"
          type="time"
          value={values.endTime}
          error={errors.endTime}
          onValueChange={(value) => setValue("endTime", value)}
        />

        <Select
          label="Organizer"
          name="organizerId"
          options={employeeOptions}
          value={values.organizerId}
          error={errors.organizerId}
          onValueChange={(value) => setValue("organizerId", value)}
          wrapperClassName="sm:col-span-2"
        />
      </div>

      <div>
        <p className={FIELD_LABEL}>Attendees ({values.attendeeIds.length})</p>

        <div
          className={`rounded-lg border p-2.5 ${
            errors.attendeeIds ? "border-error" : "border-border"
          }`}
        >
          <CheckboxGroup
            label="Attendees"
            hideLabel
            options={employeeOptions}
            values={values.attendeeIds}
            onToggle={toggleAttendee}
          />
        </div>

        <FieldError id={ATTENDEES_ERROR_ID} message={errors.attendeeIds} />
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
