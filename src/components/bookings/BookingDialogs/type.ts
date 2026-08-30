import type { Booking, Employee, Room } from "@/services";
import type {
  BookingDialog,
  BookingFormValues,
  BookingListItem,
} from "../type";

export type BookingDialogsProps = {
  dialog: BookingDialog | null;
  rooms: readonly Room[];
  employees: readonly Employee[];
  bookings: readonly Booking[];
  onClose: () => void;
  onEdit: (item: BookingListItem) => void;
  onSave: (values: BookingFormValues, bookingId?: string) => void;
  onConfirmCancel: (bookingId: string) => void;
  onConfirmReset: () => void;
};
