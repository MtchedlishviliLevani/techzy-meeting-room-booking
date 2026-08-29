import { RotateCcw } from "lucide-react";
import {
  Button,
  DateInput,
  FilterPanel,
  SearchInput,
  SegmentedControl,
  Select,
} from "@/components/ui";
import type { BookingFiltersProps } from "./type";
import {
  BOOKING_DATE_OPTIONS,
  BOOKING_STATUS_OPTIONS,
  CUSTOM_DATE,
} from "./data";

function BookingFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  roomId,
  onRoomChange,
  roomOptions = [],
  organizerId,
  onOrganizerChange,
  organizerOptions = [],
  dateRange,
  onDateRangeChange,
  customDate = "",
  onCustomDateChange,
  onClearFilters,
  className = "",
}: BookingFiltersProps) {
  return (
    <FilterPanel
      label="Filter bookings"
      className={className}
      search={
        <SearchInput
          label="Search bookings"
          placeholder="Search by meeting, room, or organizer..."
          value={search}
          onValueChange={onSearchChange}
        />
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          label="Room"
          options={roomOptions}
          value={roomId}
          onValueChange={onRoomChange}
        />

        <Select
          label="Organizer"
          options={organizerOptions}
          value={organizerId}
          onValueChange={onOrganizerChange}
        />

        <Select
          label="Date"
          options={BOOKING_DATE_OPTIONS}
          value={dateRange}
          onValueChange={onDateRangeChange}
        />

        {dateRange === CUSTOM_DATE && (
          <DateInput
            label="On date"
            value={customDate}
            onValueChange={onCustomDateChange}
          />
        )}
      </div>

      <div className="border-border flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-end sm:justify-between">
        <SegmentedControl
          label="Status"
          options={BOOKING_STATUS_OPTIONS}
          value={status}
          onValueChange={onStatusChange}
          className="sm:max-w-md sm:flex-1"
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

export default BookingFilters;
