import type { BookingListItem } from "../../bookings";
import type { ScheduleSelect } from "../type";

export type WeekScheduleProps = ScheduleSelect & {
  days: readonly string[];
  bookings: readonly BookingListItem[];
  today?: string;
  now?: string;
  className?: string;
};
