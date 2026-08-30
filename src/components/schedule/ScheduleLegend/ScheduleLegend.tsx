import type { ScheduleLegendProps } from "./type";
import { SCHEDULE_LEGEND_ITEMS } from "./data";

function ScheduleLegend({ className = "" }: ScheduleLegendProps) {
  return (
    <div
      className={`text-muted flex flex-wrap items-center gap-x-4 gap-y-2 text-xs ${className}`}
    >
      {SCHEDULE_LEGEND_ITEMS.map(({ status, label, icon: Icon, swatch }) => (
        <span key={status} className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={`inline-flex size-4 items-center justify-center rounded border ${swatch}`}
          >
            <Icon className="size-2.5" strokeWidth={2} />
          </span>
          {label}
        </span>
      ))}

      <span className="inline-flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="border-border bg-raised inline-block size-4 rounded border"
        />
        Empty slot — room is available
      </span>
    </div>
  );
}

export default ScheduleLegend;
