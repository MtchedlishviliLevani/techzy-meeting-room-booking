import {
  BOOKING_STATUS_META,
  formatBookingDate,
  formatTimeRange,
} from "../../bookings";
import type { ScheduleBookingProps } from "./type";
import { SCHEDULE_BAR_TONE, SCHEDULE_BLOCK_TONE } from "./data";

const FOCUS =
  "focus-visible:outline-focus focus-visible:outline-2 focus-visible:outline-offset-2";

function ScheduleBooking({
  booking: item,
  variant = "block",
  showRoom = false,
  showDate = false,
  showOrganizer = false,
  onSelect,
  className = "",
}: ScheduleBookingProps) {
  const { booking, state, room, organizer } = item;
  const { label: statusLabel, icon: StatusIcon } = BOOKING_STATUS_META[state];

  const time = formatTimeRange(booking.startTime, booking.endTime);
  const roomName = room?.name ?? "Unknown room";
  const organizerName = organizer?.name ?? "Unknown organizer";
  const isCancelled = state === "cancelled";

  const details = [
    showDate ? formatBookingDate(booking.date) : null,
    time,
    showRoom ? roomName : null,
    showOrganizer ? organizerName : null,
    statusLabel,
  ]
    .filter(Boolean)
    .join(", ");

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={() => onSelect?.(item)}
        aria-label={`${booking.title}. ${details}. View booking details`}
        className={`bg-raised border-border hover:border-border-strong flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors duration-200 ${FOCUS} ${className}`}
      >
        <span
          aria-hidden="true"
          className={`h-9 w-1 shrink-0 rounded-full ${SCHEDULE_BAR_TONE[state]}`}
        />

        <span className="min-w-0 flex-1">
          <span
            className={`text-ink block truncate text-sm font-medium ${isCancelled ? "line-through" : ""}`}
          >
            {booking.title}
          </span>
          <span className="text-muted block truncate text-xs">
            {showDate && `${formatBookingDate(booking.date)} · `}
            {time}
            {showRoom && ` · ${roomName}`}
            {showOrganizer && ` · ${organizerName}`}
          </span>
        </span>

        <span className="text-muted flex shrink-0 items-center gap-1 text-xs">
          <StatusIcon className="size-4" strokeWidth={2} aria-hidden="true" />
          <span className="sr-only">{statusLabel}</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      title={`${booking.title} · ${time}`}
      aria-label={`${booking.title}. ${details}. View booking details`}
      className={`flex h-full w-full flex-col overflow-hidden rounded-lg border px-2 py-1 text-left transition-colors duration-200 ${FOCUS} ${SCHEDULE_BLOCK_TONE[state]} ${className}`}
    >
      <span className="flex w-full items-center gap-1">
        <StatusIcon className="size-3 shrink-0" strokeWidth={2} aria-hidden="true" />
        <span
          className={`truncate text-xs font-medium ${isCancelled ? "line-through" : ""}`}
        >
          {booking.title}
        </span>
      </span>

      <span className="mt-0.5 truncate text-[11px] tabular-nums">{time}</span>

      {showRoom && <span className="truncate text-[11px]">{roomName}</span>}

      {!showRoom && organizer && (
        <span className="truncate text-[11px]">{organizer.name}</span>
      )}

      <span className="sr-only">{statusLabel}</span>
    </button>
  );
}

export default ScheduleBooking;
