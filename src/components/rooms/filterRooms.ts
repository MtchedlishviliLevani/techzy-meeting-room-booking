import {
  ALL_AVAILABILITY,
  ALL_ROOM_TYPES,
  ANY_CAPACITY,
} from "./RoomFilters/data";
import type { RoomFilterValues, RoomListItem } from "./type";

export function filterRooms(
  rooms: readonly RoomListItem[],
  filters: RoomFilterValues,
): RoomListItem[] {
  const search = filters.search.trim().toLowerCase();
  
  const minCapacity =
    filters.capacity === ANY_CAPACITY ? 0 : Number(filters.capacity);

  return rooms.filter((room) => {
    const matchesSearch =
      search === "" ||
      room.name.toLowerCase().includes(search) ||
      room.location.toLowerCase().includes(search);

    const matchesType =
      filters.roomType === ALL_ROOM_TYPES || room.type === filters.roomType;

    const matchesAvailability =
      filters.availability === ALL_AVAILABILITY ||
      room.availability === filters.availability;

    const matchesEquipment = filters.equipment.every((item) =>
      room.equipment.includes(item),
    );

    return (
      matchesSearch &&
      room.capacity >= minCapacity &&
      matchesType &&
      matchesAvailability &&
      matchesEquipment
    );
  });
}
