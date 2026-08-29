import { CalendarCheck, CircleCheck, CircleX } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui";
import type { BookingStatus as Status } from "@/services";
import type { BookingStatusProps } from "./type";

const STATUS = {
  confirmed: { label: "Confirmed", tone: "success", icon: CalendarCheck },
  completed: { label: "Completed", tone: "neutral", icon: CircleCheck },
  cancelled: { label: "Cancelled", tone: "error", icon: CircleX },
} satisfies Record<
  Status,
  { label: string; tone: BadgeTone; icon: typeof CircleCheck }
>;

function BookingStatus({ status, className = "" }: BookingStatusProps) {
  const { label, tone, icon } = STATUS[status];

  return (
    <Badge tone={tone} icon={icon} className={className}>
      {label}
    </Badge>
  );
}

export default BookingStatus;
