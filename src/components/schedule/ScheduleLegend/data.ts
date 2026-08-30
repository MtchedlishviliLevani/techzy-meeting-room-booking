import { BOOKING_STATUS_META, type BookingState } from "../../bookings";
import { SCHEDULE_BLOCK_TONE } from "../ScheduleBooking";

const LEGEND_STATES: BookingState[] = ["upcoming", "completed", "cancelled"];

export const SCHEDULE_LEGEND_ITEMS = LEGEND_STATES.map((status) => ({
  status,
  label: BOOKING_STATUS_META[status].label,
  icon: BOOKING_STATUS_META[status].icon,
  swatch: SCHEDULE_BLOCK_TONE[status],
}));
