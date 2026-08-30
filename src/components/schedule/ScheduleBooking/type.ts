import type { BookingListItem } from "../../bookings";
import type { ScheduleSelect } from "../type";

export type ScheduleBookingVariant = "block" | "row";

export type ScheduleBookingProps = ScheduleSelect & {
  booking: BookingListItem;
  variant?: ScheduleBookingVariant;
  showRoom?: boolean;
  showDate?: boolean;
  className?: string;
};
