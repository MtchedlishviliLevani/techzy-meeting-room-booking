import type { BookingActions, BookingListItem } from "../type";

export type BookingRowProps = BookingActions & {
  booking: BookingListItem;
  today?: string;
};
