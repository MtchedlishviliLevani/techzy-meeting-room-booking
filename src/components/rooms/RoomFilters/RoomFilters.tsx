import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { FilterPanel } from "@/components/ui/FilterPanel";
import { SearchInput } from "@/components/ui/SearchInput";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select } from "@/components/ui/Select";
import type { RoomFiltersProps } from "./type";
import {
  AVAILABILITY_OPTIONS,
  CAPACITY_OPTIONS,
  EQUIPMENT_OPTIONS,
  ROOM_TYPE_OPTIONS,
} from "./data";

function RoomFilters({
  search,
  onSearchChange,
  capacity,
  onCapacityChange,
  roomType,
  onRoomTypeChange,
  equipment,
  onEquipmentToggle,
  availability,
  onAvailabilityChange,
  onClearFilters,
  className = "",
}: RoomFiltersProps) {
  return (
    <FilterPanel
      label="Filter rooms"
      className={className}
      search={
        <SearchInput
          label="Search rooms"
          placeholder="Search rooms..."
          value={search}
          onValueChange={onSearchChange}
        />
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          label="Capacity"
          options={CAPACITY_OPTIONS}
          value={capacity}
          onValueChange={onCapacityChange}
        />

        <Select
          label="Room type"
          options={ROOM_TYPE_OPTIONS}
          value={roomType}
          onValueChange={onRoomTypeChange}
        />

        <SegmentedControl
          label="Availability"
          options={AVAILABILITY_OPTIONS}
          value={availability}
          onValueChange={onAvailabilityChange}
        />
      </div>

      <div className="border-border flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-end sm:justify-between">
        <CheckboxGroup
          label="Equipment"
          options={EQUIPMENT_OPTIONS}
          values={equipment}
          onToggle={onEquipmentToggle}
        />

        <Button
          variant="ghost"
          size="sm"
          icon={RotateCcw}
          onClick={onClearFilters}
          className="self-start sm:self-end"
        >
          Clear filters
        </Button>
      </div>
    </FilterPanel>
  );
}

export default RoomFilters;
