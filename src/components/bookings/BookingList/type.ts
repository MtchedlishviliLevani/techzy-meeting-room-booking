import type { ReactNode } from "react";
import type { BookingActions, BookingListItem } from "../type";

export type BookingListProps = BookingActions & {
  bookings: BookingListItem[];
  today?: string;
  emptyState?: ReactNode;
  className?: string;
};
