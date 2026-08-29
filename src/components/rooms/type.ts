import type { Room } from "@/services";
import type {
  AvailabilityFilter,
  CapacityFilter,
  EquipmentFilter,
  RoomTypeFilter,
} from "./RoomFilters/data";

export type RoomAvailability = "available" | "occupied";

export type RoomListItem = Room & {
  availability?: RoomAvailability;
};

export type RoomActions = {
  onBook?: (room: Room) => void;
  onViewDetails?: (room: Room) => void;
};

export type RoomFilterValues = {
  search: string;
  capacity: CapacityFilter;
  roomType: RoomTypeFilter;
  availability: AvailabilityFilter;
  equipment: readonly EquipmentFilter[];
};
