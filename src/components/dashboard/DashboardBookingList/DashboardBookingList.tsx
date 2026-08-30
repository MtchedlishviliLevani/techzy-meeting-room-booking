import { ScheduleBooking } from "../../schedule";
import type { DashboardBookingListProps } from "./type";

function DashboardBookingList({
  bookings,
  showRoom = false,
  showDate = false,
  showOrganizer = false,
  emptyState,
  onSelect,
  className = "",
}: DashboardBookingListProps) {
  if (bookings.length === 0) return <>{emptyState}</>;

  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {bookings.map((item) => (
        <li key={item.booking.id}>
          <ScheduleBooking
            booking={item}
            variant="row"
            showRoom={showRoom}
            showDate={showDate}
            showOrganizer={showOrganizer}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}

export default DashboardBookingList;
