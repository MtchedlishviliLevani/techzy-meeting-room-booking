import type { FormEvent, RefObject } from "react";
import type { SelectOption } from "@/components/ui";
import type { Booking, Employee, Room } from "@/services";
import type { BookingFormErrors, BookingFormValues } from "../type";

export type BookingFormMode = "create" | "edit";

export type BookingFormProps = {
  mode?: BookingFormMode;

  booking?: Booking;
  rooms: readonly Room[];
  employees: readonly Employee[];

  bookings?: readonly Booking[];

  defaultRoomId?: string;
  onSubmit?: (values: BookingFormValues) => void;
  onCancel?: () => void;
  className?: string;
};

export type BookingFormOptions = Omit<
  BookingFormProps,
  "onCancel" | "className"
>;

export type BookingFormControls = {
  formRef: RefObject<HTMLFormElement | null>;
  values: BookingFormValues;
  errors: BookingFormErrors;
  today: string;
  roomOptions: SelectOption[];
  employeeOptions: SelectOption[];
  setValue: <K extends keyof BookingFormValues>(
    key: K,
    value: BookingFormValues[K],
  ) => void;
  toggleAttendee: (id: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
