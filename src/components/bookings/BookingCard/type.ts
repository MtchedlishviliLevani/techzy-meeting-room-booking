import type { BookingActions, BookingListItem } from "../type";

export type BookingCardProps = BookingActions & {
  booking: BookingListItem;
  today?: string;
  className?: string;
};
