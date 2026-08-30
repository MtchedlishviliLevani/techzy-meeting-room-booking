import { Badge } from "@/components/ui";
import type { BookingStatusProps } from "./type";
import { BOOKING_STATUS_META } from "./data";

function BookingStatus({ status, className = "" }: BookingStatusProps) {
  const { label, tone, icon } = BOOKING_STATUS_META[status];

  return (
    <Badge tone={tone} icon={icon} className={className}>
      {label}
    </Badge>
  );
}

export default BookingStatus;
