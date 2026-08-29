import type {
  AvailabilityFilter,
  CapacityFilter,
  EquipmentFilter,
  RoomTypeFilter,
} from "./data";

export type RoomFiltersProps = {
  search?: string;
  onSearchChange?: (value: string) => void;
  capacity?: CapacityFilter;
  onCapacityChange?: (value: CapacityFilter) => void;
  roomType?: RoomTypeFilter;
  onRoomTypeChange?: (value: RoomTypeFilter) => void;
  equipment?: readonly EquipmentFilter[];
  onEquipmentToggle?: (value: EquipmentFilter) => void;
  availability?: AvailabilityFilter;
  onAvailabilityChange?: (value: AvailabilityFilter) => void;
  onClearFilters?: () => void;
  className?: string;
};
