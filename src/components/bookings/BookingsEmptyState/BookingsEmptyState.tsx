import { Button, EmptyState } from "@/components/ui";
import type { BookingsEmptyStateProps } from "./type";
import { BOOKINGS_EMPTY_COPY } from "./data";

function BookingsEmptyState({
  hasBookings = false,
  onCreateBooking,
  onClearFilters,
  className = "",
}: BookingsEmptyStateProps) {
  const copy = hasBookings
    ? BOOKINGS_EMPTY_COPY.filtered
    : BOOKINGS_EMPTY_COPY.empty;

  return (
    <EmptyState
      icon={copy.icon}
      title={copy.title}
      description={copy.description}
      className={className}
      action={
        hasBookings ? (
          <Button variant="secondary" onClick={onClearFilters}>
            {copy.actionLabel}
          </Button>
        ) : (
          <Button onClick={onCreateBooking}>{copy.actionLabel}</Button>
        )
      }
    />
  );
}

export default BookingsEmptyState;
