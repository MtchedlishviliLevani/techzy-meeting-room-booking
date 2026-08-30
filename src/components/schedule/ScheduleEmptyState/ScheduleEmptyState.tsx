import { Button, EmptyState } from "@/components/ui";
import type { ScheduleEmptyStateProps } from "./type";
import { SCHEDULE_EMPTY_COPY } from "./data";

function ScheduleEmptyState({
  reason,
  onCreateBooking,
  onShowAllRooms,
  className = "",
}: ScheduleEmptyStateProps) {
  const copy = SCHEDULE_EMPTY_COPY[reason];

  return (
    <EmptyState
      icon={copy.icon}
      title={copy.title}
      description={copy.description}
      className={className}
      action={
        reason === "bookings" ? (
          <Button onClick={onCreateBooking}>{copy.actionLabel}</Button>
        ) : (
          <Button variant="secondary" onClick={onShowAllRooms}>
            {copy.actionLabel}
          </Button>
        )
      }
    />
  );
}

export default ScheduleEmptyState;
