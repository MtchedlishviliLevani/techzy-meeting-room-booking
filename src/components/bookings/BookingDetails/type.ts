import type { LucideIcon } from "lucide-react";
import type { BookingListItem } from "../type";

export type BookingDetailsProps = {
  booking: BookingListItem;
  className?: string;
};

export type BookingDetailProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
};
