import { BOOKING_STATUS_META } from "../../bookings";
import { SCHEDULE_BLOCK_TONE } from "../ScheduleBooking";
import type { BookingStatus } from "@/services";

const LEGEND_STATUSES: BookingStatus[] = [
  "confirmed",
  "completed",
  "cancelled",
];

export const SCHEDULE_LEGEND_ITEMS = LEGEND_STATUSES.map((status) => ({
  status,
  label: BOOKING_STATUS_META[status].label,
  icon: BOOKING_STATUS_META[status].icon,
  swatch: SCHEDULE_BLOCK_TONE[status],
}));
