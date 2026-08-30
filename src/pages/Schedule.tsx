import { Plus, TriangleAlert } from "lucide-react";
import {
  ALL_ROOMS,
  Button,
  DaySchedule,
  EmptyState,
  PageHeader,
  ResultCount,
  ScheduleControls,
  ScheduleEmptyState,
  ScheduleLegend,
  WeekSchedule,
  filterScheduleBookings,
  isCurrentPeriod,
  resolveBookings,
  schedulePeriod,
  toRoomOptions,
} from "@/components";
import { useBookingsContext } from "@/context";
import { useSchedule } from "@/hooks";

function Schedule() {
  const {
    bookings: allBookings,
    rooms,
    employees,
    loading,
    error,
    today,
    now,
    openCreateBooking,
    openBookingDetails,
  } = useBookingsContext();

  const schedule = useSchedule(today);
  const period = schedulePeriod(schedule.view, schedule.date);

  const bookings = resolveBookings(allBookings, rooms, employees, today, now);
  const visibleBookings = filterScheduleBookings(
    bookings,
    period,
    schedule.roomId,
  );

  const visibleRooms =
    schedule.roomId === ALL_ROOMS
      ? rooms
      : rooms.filter((room) => room.id === schedule.roomId);

  const showRoomEmptyState = !loading && !error && visibleRooms.length === 0;
  const showBookingsEmptyState =
    !loading && !error && visibleRooms.length > 0 && visibleBookings.length === 0;
  const showSchedule =
    !loading && !error && visibleRooms.length > 0 && visibleBookings.length > 0;

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <PageHeader
        title="Schedule"
        description="View meeting room availability and upcoming bookings."
        action={
          <Button
            icon={Plus}
            onClick={() => openCreateBooking()}
            className="shrink-0 max-sm:w-full"
          >
            New Booking
          </Button>
        }
      />

      <ScheduleControls
        view={schedule.view}
        onViewChange={schedule.setView}
        date={schedule.date}
        onDateChange={schedule.setDate}
        onPrevious={schedule.goToPrevious}
        onNext={schedule.goToNext}
        onToday={schedule.goToToday}
        isCurrent={isCurrentPeriod(period, today)}
        roomId={schedule.roomId}
        onRoomChange={schedule.setRoomId}
        roomOptions={toRoomOptions(rooms)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <ResultCount
          count={visibleBookings.length}
          total={bookings.length}
          noun="bookings scheduled"
          loading={loading}
          loadingLabel="Loading schedule…"
          error={Boolean(error)}
          errorLabel="Schedule unavailable"
        />

        <ScheduleLegend className="sm:justify-end" />
      </div>

      {loading && (
        <div
          aria-hidden="true"
          className="bg-raised border-border h-96 animate-pulse rounded-2xl border"
        />
      )}

      {!loading && error && (
        <EmptyState
          icon={TriangleAlert}
          title="Couldn't load the schedule"
          description="Something went wrong while loading the rooms and bookings. Please refresh the page to try again."
        />
      )}

      {showRoomEmptyState && (
        <ScheduleEmptyState
          reason="room"
          onShowAllRooms={() => schedule.setRoomId(ALL_ROOMS)}
        />
      )}

      {showBookingsEmptyState && (
        <ScheduleEmptyState
          reason="bookings"
          onCreateBooking={() =>
            openCreateBooking(
              schedule.roomId === ALL_ROOMS ? undefined : schedule.roomId,
            )
          }
        />
      )}

      {showSchedule &&
        (schedule.view === "day" ? (
          <DaySchedule
            date={schedule.date}
            rooms={visibleRooms}
            bookings={visibleBookings}
            today={today}
            now={now}
            onSelect={openBookingDetails}
          />
        ) : (
          <WeekSchedule
            days={period.days}
            bookings={visibleBookings}
            today={today}
            now={now}
            onSelect={openBookingDetails}
          />
        ))}
    </div>
  );
}

export default Schedule;
