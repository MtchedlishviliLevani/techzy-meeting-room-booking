import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Avatar } from "@/components/ui";
import { countLabel } from "@/lib";
import { BookingStatus } from "../BookingStatus";
import { formatFullDate, formatTimeRange } from "../bookingDates";
import type { BookingDetailProps, BookingDetailsProps } from "./type";

function Detail({ icon: Icon, label, value, hint }: BookingDetailProps) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon
        className="text-muted mt-0.5 size-4 shrink-0"
        strokeWidth={2}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <dt className="text-muted text-xs font-medium tracking-wide">{label}</dt>
        <dd className="text-ink mt-0.5 text-sm">
          {value}
          {hint && <span className="text-muted"> · {hint}</span>}
        </dd>
      </div>
    </div>
  );
}

function BookingDetails({ booking: item, className = "" }: BookingDetailsProps) {
  const { booking, state, room, organizer, attendees } = item;

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <BookingStatus status={state} />
        {room && (
          <span className="text-muted text-xs">
            {room.name} · up to {countLabel(room.capacity, "person", "people")}
          </span>
        )}
      </div>

      {booking.description && (
        <p className="text-muted text-sm leading-relaxed">{booking.description}</p>
      )}

      <dl className="grid gap-4 sm:grid-cols-2">
        <Detail
          icon={CalendarDays}
          label="Date"
          value={formatFullDate(booking.date)}
        />
        <Detail
          icon={Clock}
          label="Time"
          value={formatTimeRange(booking.startTime, booking.endTime)}
        />
        <Detail
          icon={MapPin}
          label="Room"
          value={room?.name ?? "Unknown room"}
          hint={room?.location}
        />
        <Detail
          icon={Users}
          label="Attendees"
          value={countLabel(attendees.length, "person", "people")}
        />
      </dl>

      <section className="border-border border-t pt-4">
        <h3 className="text-muted text-xs font-medium tracking-wide">Organizer</h3>
        <div className="mt-2 flex items-center gap-2.5">
          <Avatar userName={organizer?.name ?? "Unknown"} className="size-9" />
          <div className="min-w-0">
            <p className="text-ink truncate text-sm font-medium">
              {organizer?.name ?? "Unknown organizer"}
            </p>
            {organizer && (
              <p className="text-muted truncate text-xs">{organizer.role}</p>
            )}
          </div>
        </div>
      </section>

      <section className="border-border border-t pt-4">
        <h3 className="text-muted text-xs font-medium tracking-wide">
          Attendees ({attendees.length})
        </h3>

        {attendees.length === 0 ? (
          <p className="text-muted mt-2 text-sm">No attendees added yet.</p>
        ) : (
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {attendees.map((attendee) => (
              <li key={attendee.id} className="flex items-center gap-2.5">
                <Avatar userName={attendee.name} className="size-8" />
                <div className="min-w-0">
                  <p className="text-ink truncate text-sm">{attendee.name}</p>
                  <p className="text-muted truncate text-xs">
                    {attendee.department}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default BookingDetails;
