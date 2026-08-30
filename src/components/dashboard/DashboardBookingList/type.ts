import type { ReactNode } from "react";
import type { BookingListItem } from "../../bookings";
import type { ScheduleSelect } from "../../schedule";

export type DashboardBookingListProps = ScheduleSelect & {
  bookings: readonly BookingListItem[];
  showRoom?: boolean;
  showDate?: boolean;
  showOrganizer?: boolean;
  emptyState?: ReactNode;
  className?: string;
};
