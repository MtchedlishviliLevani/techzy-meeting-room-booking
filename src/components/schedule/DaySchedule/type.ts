import type { Room } from "@/services";
import type { BookingListItem } from "../../bookings";
import type { ScheduleSelect } from "../type";

export type DayScheduleProps = ScheduleSelect & {
  date: string;
  rooms: readonly Room[];
  bookings: readonly BookingListItem[];
  today?: string;
  now?: string;
  className?: string;
};
