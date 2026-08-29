import { Plus, SearchX, TriangleAlert } from "lucide-react";
import { filterRooms, RoomFilters, RoomGrid } from "@/components/rooms";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRoomFilters } from "@/hooks/useRoomFilters";
import { useRooms } from "@/hooks/useRooms";

const SKELETON_COUNT = 6;

function Rooms() {
  const { rooms, loading, error } = useRooms();
  const filters = useRoomFilters();
  const visibleRooms = filterRooms(rooms, filters);
  const isFiltered = visibleRooms.length !== rooms.length;

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <h1 className="text-ink text-xl font-semibold tracking-tight sm:text-2xl">
            Meeting Rooms
          </h1>
          <p className="text-muted mt-1 text-sm leading-relaxed sm:max-w-xl">
            Find the right meeting room for your next meeting — browse by
            capacity, equipment, and availability.
          </p>
        </div>

        <Button icon={Plus} className="shrink-0 max-sm:w-full">
          New Booking
        </Button>
      </div>

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

      <p aria-live="polite" className="text-muted text-sm">
        {loading ? (
          "Loading rooms…"
        ) : error ? (
          "Rooms unavailable"
        ) : (
          <>
            <span className="text-ink font-medium">{visibleRooms.length}</span>
            {isFiltered && ` of ${rooms.length}`} meeting rooms
          </>
        )}
      </p>

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
