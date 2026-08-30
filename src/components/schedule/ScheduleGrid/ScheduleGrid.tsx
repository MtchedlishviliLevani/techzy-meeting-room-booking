import { ScheduleBooking } from "../ScheduleBooking";
import {
  formatHour,
  layoutEvents,
  scheduleBodyHeight,
  scheduleHours,
  timeOffsetPercent,
} from "../scheduleLayout";
import type { ScheduleEvent } from "../type";
import type { ScheduleGridProps } from "./type";

const TIME_COLUMN_WIDTH = "3.75rem";

const groupByColumn = (events: readonly ScheduleEvent[]) => {
  const byColumn = new Map<string, ScheduleEvent["item"][]>();

  events.forEach(({ columnKey, item }) => {
    byColumn.set(columnKey, [...(byColumn.get(columnKey) ?? []), item]);
  });

  return byColumn;
};

function ScheduleGrid({
  label,
  columns,
  events,
  range,
  now,
  showRoom = false,
  onSelect,
  minColumnWidth = "9rem",
  className = "",
}: ScheduleGridProps) {
  const hours = scheduleHours(range);
  const bodyHeight = scheduleBodyHeight(range);
  const byColumn = groupByColumn(events);
  const nowPercent = now ? timeOffsetPercent(range, now.time) : null;

  const template = {
    gridTemplateColumns: `${TIME_COLUMN_WIDTH} repeat(${columns.length}, minmax(${minColumnWidth}, 1fr))`,
  };

  return (
    <div
      className={`bg-raised border-border overflow-hidden rounded-2xl border ${className}`}
    >
      <div className="overflow-x-auto">
        <div className="grid" style={template}>
          <div className="bg-surface border-border sticky left-0 z-20 border-b border-r px-2 py-2">
            <span className="text-muted text-[11px] font-medium">Time</span>
          </div>

          {columns.map((column) => (
            <div
              key={column.key}
              className={`border-border min-w-0 border-b border-l px-3 py-2 ${
                column.highlighted ? "bg-primary-subtle" : "bg-surface"
              }`}
            >
              <p className="text-ink truncate text-sm font-medium">
                {column.label}
              </p>
              {column.sublabel && (
                <p className="text-muted truncate text-xs">{column.sublabel}</p>
              )}
              {column.meta && (
                <p className="text-muted mt-0.5 truncate text-[11px]">
                  {column.meta}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid" style={template} aria-label={label} role="group">
          <div
            className="bg-raised border-border sticky left-0 z-10 border-r"
            style={{ height: bodyHeight }}
          >
            {hours.map((hour) => (
              <div
                key={hour}
                className="border-border border-t pt-0.5 pr-2 text-right first:border-t-0"
                style={{ height: bodyHeight / hours.length }}
              >
                <span className="text-muted text-[11px] tabular-nums">
                  {formatHour(hour)}
                </span>
              </div>
            ))}
          </div>

          {columns.map((column) => (
            <div
              key={column.key}
              className="border-border relative border-l"
              style={{ height: bodyHeight }}
            >
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="border-border border-t first:border-t-0"
                  style={{ height: bodyHeight / hours.length }}
                />
              ))}

              {layoutEvents(byColumn.get(column.key) ?? [], range).map(
                ({ item, style }) => (
                  <div
                    key={item.booking.id}
                    className="absolute pr-1"
                    style={style}
                  >
                    <ScheduleBooking
                      booking={item}
                      showRoom={showRoom}
                      onSelect={onSelect}
                    />
                  </div>
                ),
              )}

              {nowPercent !== null &&
                (now?.columnKey === undefined ||
                  now.columnKey === column.key) && (
                  <div
                    aria-hidden="true"
                    className="border-error/70 pointer-events-none absolute inset-x-0 border-t-2"
                    style={{ top: `${nowPercent}%` }}
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduleGrid;
