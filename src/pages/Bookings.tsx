import { Plus, TriangleAlert } from "lucide-react";
import {
  BookingFilters,
  BookingList,
  BookingListSkeleton,
  BookingsEmptyState,
  Button,
  EmptyState,
  PageHeader,
  ResultCount,
  filterBookings,
  resolveBookings,
  sortBookings,
  toBookingFiltersProps,
  todayISO,
} from "@/components";
import { useBookingsContext } from "@/context";
import { useBookingFilters } from "@/hooks";

function Bookings() {
  const {
    bookings: allBookings,
    rooms,
    employees,
    loading,
    error,
    openCreateBooking,
    openBookingDetails,
    openEditBooking,
    openCancelBooking,
  } = useBookingsContext();
  const filters = useBookingFilters();

  const today = todayISO();
  const bookings = resolveBookings(allBookings, rooms, employees);
  const visibleBookings = sortBookings(
    filterBookings(bookings, filters, today),
    today,
  );

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <PageHeader
        title="Bookings"
        description="View and manage upcoming and past meetings — search, filter, and keep every room reservation in one place."
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

      <BookingFilters {...toBookingFiltersProps(filters, rooms, employees)} />

      <ResultCount
        count={visibleBookings.length}
        total={bookings.length}
        noun="bookings"
        loading={loading}
        loadingLabel="Loading bookings…"
        error={Boolean(error)}
        errorLabel="Bookings unavailable"
      />

      {loading && <BookingListSkeleton />}

      {!loading && error && (
        <EmptyState
          icon={TriangleAlert}
          title="Couldn't load bookings"
          description="Something went wrong while loading the bookings. Please refresh the page to try again."
        />
      )}

      {!loading && !error && (
        <BookingList
          bookings={visibleBookings}
          today={today}
          onViewDetails={openBookingDetails}
          onEdit={openEditBooking}
          onCancel={openCancelBooking}
          emptyState={
            <BookingsEmptyState
              hasBookings={bookings.length > 0}
              onCreateBooking={() => openCreateBooking()}
              onClearFilters={filters.clearFilters}
            />
          }
        />
      )}
    </div>
  );
}

export default Bookings;
