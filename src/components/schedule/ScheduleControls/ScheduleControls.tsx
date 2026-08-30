import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge, Button, DateInput, SegmentedControl, Select } from "@/components/ui";
import { formatPeriodLabel } from "../scheduleDates";
import type { ScheduleControlsProps } from "./type";
import { SCHEDULE_UNIT, SCHEDULE_VIEW_OPTIONS } from "./data";

function ScheduleControls({
  view,
  onViewChange,
  date,
  onDateChange,
  onPrevious,
  onNext,
  onToday,
  isCurrent = false,
  roomId,
  onRoomChange,
  roomOptions = [],
  className = "",
}: ScheduleControlsProps) {
  const unit = SCHEDULE_UNIT[view];

  return (
    <section
      aria-label="Schedule controls"
      className={`bg-raised border-border rounded-2xl border p-3 sm:p-4 ${className}`}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex shrink-0 items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              icon={ChevronLeft}
              aria-label={`Previous ${unit}`}
              onClick={onPrevious}
              className="px-2"
            />
            <Button variant="secondary" size="sm" onClick={onToday}>
              Today
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={ChevronRight}
              aria-label={`Next ${unit}`}
              onClick={onNext}
              className="px-2"
            />
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <p
              aria-live="polite"
              className="text-ink truncate text-sm font-semibold tracking-tight sm:text-base"
            >
              {formatPeriodLabel(view, date)}
            </p>
            {isCurrent && (
              <Badge tone="primary" className="shrink-0">
                {view === "day" ? "Today" : "This week"}
              </Badge>
            )}
          </div>
        </div>

        <SegmentedControl
          label="Schedule view"
          hideLabel
          options={SCHEDULE_VIEW_OPTIONS}
          value={view}
          onValueChange={onViewChange}
          className="sm:max-w-56 lg:w-56 lg:shrink-0"
        />
      </div>

      <div className="border-border mt-3 grid gap-3 border-t pt-3 sm:grid-cols-2 lg:max-w-2xl">
        <Select
          label="Room"
          options={roomOptions}
          value={roomId}
          onValueChange={onRoomChange}
        />

        <DateInput
          label={`Jump to ${unit}`}
          value={date}
          onValueChange={onDateChange}
        />
      </div>

      <p className="text-muted mt-3 flex items-center gap-1.5 text-xs">
        <CalendarDays className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
        Select any booking to see its full details.
      </p>
    </section>
  );
}

export default ScheduleControls;
