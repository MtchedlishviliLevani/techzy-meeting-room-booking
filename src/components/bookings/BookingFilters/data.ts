import type { SelectOption } from "@/components/ui";
import type { Employee, Room } from "@/services";
import type { BookingFilterControls } from "../type";
import type { BookingFiltersProps } from "./type";

export const BOOKING_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
] as const;

export const BOOKING_DATE_OPTIONS = [
  { label: "All dates", value: "all" },
  { label: "Today", value: "today" },
  { label: "This week", value: "week" },
  { label: "Custom date", value: "custom" },
] as const;

export type BookingStatusFilter = (typeof BOOKING_STATUS_OPTIONS)[number]["value"];
export type BookingDateFilter = (typeof BOOKING_DATE_OPTIONS)[number]["value"];

export const ALL_STATUSES = BOOKING_STATUS_OPTIONS[0].value;
export const ALL_DATES = BOOKING_DATE_OPTIONS[0].value;
export const CUSTOM_DATE: BookingDateFilter = "custom";

export const ALL_ROOMS = "all";
export const ALL_ORGANIZERS = "all";

export const toRoomOptions = (rooms: readonly Room[]): SelectOption[] => [
  { label: "All rooms", value: ALL_ROOMS },
  ...rooms.map((room) => ({ label: room.name, value: room.id })),
];

export const toOrganizerOptions = (
  employees: readonly Employee[],
): SelectOption[] => [
  { label: "All organizers", value: ALL_ORGANIZERS },
  ...employees.map((employee) => ({ label: employee.name, value: employee.id })),
];

export const toBookingFiltersProps = (
  filters: BookingFilterControls,
  rooms: readonly Room[],
  employees: readonly Employee[],
): BookingFiltersProps => ({
  search: filters.search,
  onSearchChange: filters.setSearch,
  status: filters.status,
  onStatusChange: filters.setStatus,
  roomId: filters.roomId,
  onRoomChange: filters.setRoomId,
  roomOptions: toRoomOptions(rooms),
  organizerId: filters.organizerId,
  onOrganizerChange: filters.setOrganizerId,
  organizerOptions: toOrganizerOptions(employees),
  dateRange: filters.dateRange,
  onDateRangeChange: filters.setDateRange,
  customDate: filters.customDate,
  onCustomDateChange: filters.setCustomDate,
  onClearFilters: filters.clearFilters,
});
