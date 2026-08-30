import type { Booking, Employee, Room } from "@/services";
import type {
  BookingDateFilter,
  BookingStatusFilter,
} from "./BookingFilters/data";
import type { BookingFormMode } from "./BookingForm/type";

export type BookingState = "upcoming" | "completed" | "cancelled";

export type BookingListItem = {
  booking: Booking;
  state: BookingState;
  room?: Room;
  organizer?: Employee;
  attendees: Employee[];
};

export type BookingActions = {
  onViewDetails?: (item: BookingListItem) => void;
  onEdit?: (item: BookingListItem) => void;
  onCancel?: (item: BookingListItem) => void;
};

export type BookingFilterValues = {
  search: string;
  status: BookingStatusFilter;
  roomId: string;
  organizerId: string;
  dateRange: BookingDateFilter;
  customDate: string;
};

export type BookingFilterControls = BookingFilterValues & {
  setSearch: (value: string) => void;
  setStatus: (value: BookingStatusFilter) => void;
  setRoomId: (value: string) => void;
  setOrganizerId: (value: string) => void;
  setDateRange: (value: BookingDateFilter) => void;
  setCustomDate: (value: string) => void;
  clearFilters: () => void;
};

export type BookingFormValues = {
  title: string;
  description: string;
  roomId: string;
  organizerId: string;
  attendeeIds: string[];
  date: string;
  startTime: string;
  endTime: string;
};

export type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

export type ValidateBookingOptions = {
  rooms: readonly Room[];
  bookings: readonly Booking[];
  bookingId?: string;
  mode?: BookingFormMode;
  today?: string;
  now?: string;
};

export type BookingDialog =
  | { type: "create"; roomId?: string }
  | { type: "reset" }
  | { type: "details"; item: BookingListItem }
  | { type: "edit"; item: BookingListItem }
  | { type: "cancel"; item: BookingListItem };
