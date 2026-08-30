import { Users } from "lucide-react";
import { ActionMenu, Avatar } from "@/components/ui";
import { pluralize } from "@/lib";
import { BookingStatus } from "../BookingStatus";
import { formatBookingDate, formatTimeRange } from "../bookingDates";
import { getBookingActions } from "../getBookingActions";
import type { BookingRowProps } from "./type";

const CELL = "px-4 py-3.5 align-middle";

function BookingRow({ booking: item, today, ...actions }: BookingRowProps) {
  const { booking, state, room, organizer, attendees } = item;
  const isCancelled = state === "cancelled";

  return (
    <tr className="border-border hover:bg-primary-subtle/40 border-t transition-colors duration-200">
      <th scope="row" className={`${CELL} max-w-xs text-left font-normal`}>
        <button
          type="button"
          onClick={() => actions.onViewDetails?.(item)}
          className="text-ink hover:text-primary block max-w-full truncate text-sm font-medium transition-colors duration-200"
        >
          <span className={isCancelled ? "line-through" : ""}>{booking.title}</span>
        </button>
      </th>

      <td className={CELL}>
        <p className="text-ink text-sm">{formatBookingDate(booking.date, today)}</p>
        <p className="text-muted mt-0.5 text-xs">
          {formatTimeRange(booking.startTime, booking.endTime)}
        </p>
      </td>

      <td className={CELL}>
        <p className="text-ink text-sm">{room?.name ?? "Unknown room"}</p>
        {room && <p className="text-muted mt-0.5 text-xs">{room.location}</p>}
      </td>

      <td className={CELL}>
        <div className="flex items-center gap-2">
          <Avatar userName={organizer?.name ?? "Unknown"} className="size-7" />
          <span className="text-ink truncate text-sm">
            {organizer?.name ?? "Unknown organizer"}
          </span>
        </div>
      </td>

      <td className={CELL}>
        <span className="text-muted inline-flex items-center gap-1.5 text-sm">
          <Users className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <span className="text-ink">{attendees.length}</span>
          <span className="sr-only">
            {pluralize(attendees.length, "attendee")}
          </span>
        </span>
      </td>

      <td className={CELL}>
        <BookingStatus status={state} />
      </td>

      <td className={`${CELL} text-right`}>
        <ActionMenu
          label={`Actions for ${booking.title}`}
          items={getBookingActions(item, actions)}
          className="inline-block"
        />
      </td>
    </tr>
  );
}

export default BookingRow;
