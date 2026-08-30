export type ScheduleEmptyReason = "bookings" | "room";

export type ScheduleEmptyStateProps = {
  reason: ScheduleEmptyReason;
  onCreateBooking?: () => void;
  onShowAllRooms?: () => void;
  className?: string;
};
