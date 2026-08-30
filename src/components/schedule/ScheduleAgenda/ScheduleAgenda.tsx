import { ScheduleBooking } from "../ScheduleBooking";
import type { ScheduleAgendaProps } from "./type";

function ScheduleAgenda({
  groups,
  showRoom = false,
  emptyLabel = "Available all day",
  onSelect,
  className = "",
}: ScheduleAgendaProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {groups.map((group) => (
        <section key={group.key} aria-label={group.label}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-ink truncate text-sm font-semibold tracking-tight">
              {group.label}
            </h3>
            {group.sublabel && (
              <span className="text-muted shrink-0 text-xs">
                {group.sublabel}
              </span>
            )}
          </div>

          {group.items.length === 0 ? (
            <p className="text-muted border-border mt-2 rounded-xl border border-dashed px-3 py-3 text-xs">
              {emptyLabel}
            </p>
          ) : (
            <ul className="mt-2 flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item.booking.id}>
                  <ScheduleBooking
                    booking={item}
                    variant="row"
                    showRoom={showRoom}
                    onSelect={onSelect}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export default ScheduleAgenda;
