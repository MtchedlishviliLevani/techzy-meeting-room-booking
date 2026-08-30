import {
  CalendarCheck,
  CalendarOff,
  DoorClosed,
  Plus,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import {
  Button,
  DashboardBookingList,
  DashboardMetrics,
  DashboardPanel,
  EmptyState,
  PageHeader,
  RoomAvailabilityList,
  formatFullDate,
} from "@/components";
import { useBookingsContext } from "@/context";
import { useDashboard } from "@/hooks";
import { countLabel } from "@/lib";

function Dashboard() {
  const { openCreateBooking, openBookingDetails, openResetDemoData } =
    useBookingsContext();
  const {
    loading,
    error,
    today,
    stats,
    rooms,
    todayBookings,
    upcomingBookings,
    upcomingCount,
  } = useDashboard();

  const ready = !loading && !error;

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <PageHeader
        title="Dashboard"
        description={`${formatFullDate(today)} — here's what's happening across your meeting rooms today.`}
        action={
          <div className="flex shrink-0 gap-2 max-sm:w-full">
            <Button
              variant="secondary"
              icon={RotateCcw}
              onClick={openResetDemoData}
              className="max-sm:flex-1"
            >
              Reset demo data
            </Button>
            <Button
              icon={Plus}
              onClick={() => openCreateBooking()}
              className="max-sm:flex-1"
            >
              New Booking
            </Button>
          </div>
        }
      />

      {!error && <DashboardMetrics stats={stats} loading={loading} />}

      {loading && (
        <div
          aria-hidden="true"
          className="grid gap-4 sm:gap-5 lg:grid-cols-3"
        >
          <div className="bg-raised border-border h-96 animate-pulse rounded-2xl border lg:col-span-2" />
          <div className="bg-raised border-border h-96 animate-pulse rounded-2xl border" />
        </div>
      )}

      {!loading && error && (
        <EmptyState
          icon={TriangleAlert}
          title="Couldn't load the dashboard"
          description="Something went wrong while loading the rooms and bookings. Please refresh the page to try again."
        />
      )}

      {ready && (
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:col-span-2">
            <DashboardPanel
              title="Today's schedule"
              meta={countLabel(todayBookings.length, "meeting")}
              action={{ label: "View schedule", to: "/schedule" }}
            >
              <DashboardBookingList
                bookings={todayBookings}
                showRoom
                onSelect={openBookingDetails}
                emptyState={
                  <EmptyState
                    icon={CalendarOff}
                    title="Nothing scheduled today"
                    description="You have no meetings scheduled for today."
                    action={
                      <Button onClick={() => openCreateBooking()}>
                        Create booking
                      </Button>
                    }
                  />
                }
              />
            </DashboardPanel>

            <DashboardPanel
              title="Upcoming meetings"
              meta={countLabel(upcomingCount, "meeting")}
              action={{ label: "View all bookings", to: "/bookings" }}
            >
              <DashboardBookingList
                bookings={upcomingBookings}
                showRoom
                showDate
                showOrganizer
                onSelect={openBookingDetails}
                emptyState={
                  <EmptyState
                    icon={CalendarCheck}
                    title="No upcoming meetings"
                    description="Your schedule is clear. Book a room when you're ready to plan your next meeting."
                    action={
                      <Button onClick={() => openCreateBooking()}>
                        Create booking
                      </Button>
                    }
                  />
                }
              />
            </DashboardPanel>
          </div>

          <DashboardPanel
            title="Room availability"
            meta={`${stats.availableNow} of ${stats.totalRooms} free now`}
            action={{ label: "View rooms", to: "/rooms" }}
          >
            <RoomAvailabilityList
              rooms={rooms}
              emptyState={
                <EmptyState
                  icon={DoorClosed}
                  title="No meeting rooms available"
                  description="There are no meeting rooms set up yet, so nothing can be booked."
                />
              }
            />
          </DashboardPanel>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
