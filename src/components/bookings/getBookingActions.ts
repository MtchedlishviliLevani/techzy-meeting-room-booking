import { Pencil, Eye, X } from "lucide-react";
import type { ActionMenuItem } from "@/components/ui";
import type { BookingActions, BookingListItem } from "./type";

const CANCELLED_HINT = "This booking is already cancelled";
const COMPLETED_HINT = "Past bookings can no longer be changed";

export const isEditable = (item: BookingListItem) => item.state === "upcoming";

export function getBookingActions(
  item: BookingListItem,
  { onViewDetails, onEdit, onCancel }: BookingActions,
): ActionMenuItem[] {
  const editable = isEditable(item);
  const hint = item.state === "cancelled" ? CANCELLED_HINT : COMPLETED_HINT;

  return [
    {
      label: "View details",
      icon: Eye,
      onSelect: () => onViewDetails?.(item),
    },
    {
      label: "Edit booking",
      icon: Pencil,
      disabled: !editable,
      hint,
      onSelect: () => onEdit?.(item),
    },
    {
      label: "Cancel booking",
      icon: X,
      tone: "danger",
      disabled: !editable,
      hint,
      onSelect: () => onCancel?.(item),
    },
  ];
}
