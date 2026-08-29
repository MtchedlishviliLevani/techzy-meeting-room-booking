import type { SelectOption } from "@/components/ui";
import type { BookingDateFilter, BookingStatusFilter } from "./data";

export type BookingFiltersProps = {
  search?: string;
  onSearchChange?: (value: string) => void;
  status?: BookingStatusFilter;
  onStatusChange?: (value: BookingStatusFilter) => void;
  roomId?: string;
  onRoomChange?: (value: string) => void;
  roomOptions?: readonly SelectOption[];
  organizerId?: string;
  onOrganizerChange?: (value: string) => void;
  organizerOptions?: readonly SelectOption[];
  dateRange?: BookingDateFilter;
  onDateRangeChange?: (value: BookingDateFilter) => void;
  customDate?: string;
  onCustomDateChange?: (value: string) => void;
  onClearFilters?: () => void;
  className?: string;
};
