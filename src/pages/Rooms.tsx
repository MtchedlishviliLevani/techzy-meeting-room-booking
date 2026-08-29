import { Plus, SearchX, TriangleAlert } from "lucide-react";
import {
  Button,
  EmptyState,
  PageHeader,
  ResultCount,
  RoomFilters,
  RoomGrid,
  filterRooms,
} from "@/components";
import { useBookingsContext } from "@/context";
import { useRoomFilters, useRooms } from "@/hooks";

const SKELETON_COUNT = 6;

function Rooms() {
  const { rooms, loading, error } = useRooms();
  const { openCreateBooking } = useBookingsContext();
  const filters = useRoomFilters();
  const visibleRooms = filterRooms(rooms, filters);

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <PageHeader
        title="Meeting Rooms"
        description="Find the right meeting room for your next meeting — browse by capacity, equipment, and availability."
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

      <RoomFilters
        search={filters.search}
        onSearchChange={filters.setSearch}
        capacity={filters.capacity}
        onCapacityChange={filters.setCapacity}
        roomType={filters.roomType}
        onRoomTypeChange={filters.setRoomType}
        availability={filters.availability}
        onAvailabilityChange={filters.setAvailability}
        equipment={filters.equipment}
        onEquipmentToggle={filters.toggleEquipment}
        onClearFilters={filters.clearFilters}
      />

      <ResultCount
        count={visibleRooms.length}
        total={rooms.length}
        noun="meeting rooms"
        loading={loading}
        loadingLabel="Loading rooms…"
        error={Boolean(error)}
        errorLabel="Rooms unavailable"
      />

      {loading && (
        <ul
          aria-hidden="true"
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
        >
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <li
              key={index}
              className="bg-raised border-border h-64 animate-pulse rounded-2xl border"
            />
          ))}
        </ul>
      )}

      {!loading && error && (
        <EmptyState
          icon={TriangleAlert}
          title="Couldn't load rooms"
          description="Something went wrong while loading the meeting rooms. Please refresh the page to try again."
        />
      )}

      {!loading && !error && (
        <RoomGrid
          rooms={visibleRooms}
          onBook={(room) => openCreateBooking(room.id)}
          emptyState={
            <EmptyState
              icon={SearchX}
              title="No rooms match your filters"
              description="Try a wider capacity range, a different room type, or clear the filters to see every meeting room."
              action={
                <Button variant="secondary" onClick={filters.clearFilters}>
                  Clear filters
                </Button>
              }
            />
          }
        />
      )}
    </div>
  );
}

export default Rooms;
