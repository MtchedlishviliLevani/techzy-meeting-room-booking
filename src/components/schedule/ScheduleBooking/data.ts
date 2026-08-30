import type { BookingState } from "../../bookings";

export const SCHEDULE_BLOCK_TONE: Record<BookingState, string> = {
  upcoming:
    "bg-primary-subtle border-primary/40 text-ink hover:border-primary hover:bg-primary-subtle/70",
  completed: "bg-background border-border text-muted hover:border-border-strong",
  cancelled:
    "bg-background border-dashed border-border-strong/60 text-muted hover:border-border-strong",
};

export const SCHEDULE_BAR_TONE: Record<BookingState, string> = {
  upcoming: "bg-primary",
  completed: "bg-border-strong",
  cancelled: "bg-error/60",
};
