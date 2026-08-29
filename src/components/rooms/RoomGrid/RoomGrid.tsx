import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui";
import { RoomCard } from "../RoomCard";
import type { RoomGridProps } from "./type";

function RoomGrid({
  rooms,
  onBook,
  onViewDetails,
  emptyState,
  className = "",
}: RoomGridProps) {
  if (rooms.length === 0) {
    return (
      <>
        {emptyState ?? (
          <EmptyState
            icon={SearchX}
            title="No rooms match your filters"
            description="Try a wider capacity range, a different room type, or clear the filters to see every meeting room."
          />
        )}
      </>
    );
  }

  return (
    <ul
      className={`grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 ${className}`}
    >
      {rooms.map((room) => (
        <li key={room.id} className="flex">
          <RoomCard
            room={room}
            onBook={onBook}
            onViewDetails={onViewDetails}
            className="w-full"
          />
        </li>
      ))}
    </ul>
  );
}

export default RoomGrid;
