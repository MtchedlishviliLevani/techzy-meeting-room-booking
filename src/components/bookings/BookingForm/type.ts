import type { Booking, Employee, Room } from "@/services";
import type { BookingFormValues } from "../type";

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
