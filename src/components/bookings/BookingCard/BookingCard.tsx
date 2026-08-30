import { MapPin, User, Users } from "lucide-react";
import { ActionMenu } from "@/components/ui";
import { countLabel } from "@/lib";
import { BookingStatus } from "../BookingStatus";
import { formatBookingDate, formatTimeRange } from "../bookingDates";
import { getBookingActions } from "../getBookingActions";
import type { BookingCardProps } from "./type";

function BookingCard({
  booking: item,
  today,
  className = "",
  ...actions
}: BookingCardProps) {
  const { booking, state, room, organizer, attendees } = item;
  const isCancelled = state === "cancelled";

  return (
    <article
      className={`bg-raised border-border hover:border-border-strong flex h-full flex-col rounded-2xl border p-4 transition-colors duration-200 ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-ink text-base font-semibold tracking-tight">
            <button
              type="button"
              onClick={() => actions.onViewDetails?.(item)}
              className="hover:text-primary block max-w-full truncate text-left transition-colors duration-200"
            >
              <span className={isCancelled ? "line-through" : ""}>
                {booking.title}
              </span>
            </button>
          </h3>
          <p className="text-muted mt-0.5 text-sm">
            {formatBookingDate(booking.date, today)} ·{" "}
            {formatTimeRange(booking.startTime, booking.endTime)}
          </p>
        </div>

        <ActionMenu
          label={`Actions for ${booking.title}`}
          items={getBookingActions(item, actions)}
          className="-mr-1 shrink-0"
        />
      </div>

      <dl className="border-border text-muted mt-3.5 space-y-1.5 border-t pt-3.5 text-sm">
        <div className="flex min-w-0 items-center gap-1.5">
          <dt className="sr-only">Room</dt>
          <MapPin className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <dd className="text-ink truncate">
            {room ? `${room.name} · ${room.location}` : "Unknown room"}
          </dd>
        </div>

        <div className="flex min-w-0 items-center gap-1.5">
          <dt className="sr-only">Organizer</dt>
          <User className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <dd className="text-ink truncate">
            {organizer?.name ?? "Unknown organizer"}
          </dd>
        </div>

        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Attendees</dt>
          <Users className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <dd className="text-ink">
            {countLabel(attendees.length, "attendee")}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <BookingStatus status={state} />
      </div>
    </article>
  );
}

export default BookingCard;
