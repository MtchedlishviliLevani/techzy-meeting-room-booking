import { countLabel } from "@/lib";
import { RoomStatus } from "../../rooms";
import type { RoomAvailabilityListProps } from "./type";

function RoomAvailabilityList({
  rooms,
  emptyState,
  className = "",
}: RoomAvailabilityListProps) {
  if (rooms.length === 0) return <>{emptyState}</>;

  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {rooms.map((room) => (
        <li
          key={room.id}
          className="bg-raised border-border flex items-center gap-3 rounded-xl border px-3 py-2.5"
        >
          <span className="min-w-0 flex-1">
            <span className="text-ink block truncate text-sm font-medium">
              {room.name}
            </span>
            <span className="text-muted block truncate text-xs">
              {room.location} · {countLabel(room.capacity, "seat")}
            </span>
          </span>

          {room.availability && (
            <RoomStatus status={room.availability} className="shrink-0" />
          )}
        </li>
      ))}
    </ul>
  );
}

export default RoomAvailabilityList;
