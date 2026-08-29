import { CalendarX } from "lucide-react";
import { EmptyState } from "@/components/ui";
import { BookingCard } from "../BookingCard";
import { BookingRow } from "../BookingRow";
import type { BookingListProps } from "./type";
import { BOOKING_COLUMNS } from "./data";

function BookingList({
  bookings,
  today,
  emptyState,
  className = "",
  ...actions
}: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <>
        {emptyState ?? (
          <EmptyState
            icon={CalendarX}
            title="No bookings found"
            description="Try changing your filters or create a new booking."
          />
        )}
      </>
    );
  }

  return (
    <div className={className}>
      <div className="bg-raised border-border hidden overflow-hidden rounded-2xl border lg:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Bookings</caption>
          <thead>
            <tr className="bg-surface">
              {BOOKING_COLUMNS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="text-muted px-4 py-3 text-xs font-medium tracking-wide"
                >
                  {column}
                </th>
              ))}
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((item) => (
              <BookingRow
                key={item.booking.id}
                booking={item}
                today={today}
                {...actions}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:hidden">
        {bookings.map((item) => (
          <li key={item.booking.id} className="flex">
            <BookingCard
              booking={item}
              today={today}
              className="w-full"
              {...actions}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
