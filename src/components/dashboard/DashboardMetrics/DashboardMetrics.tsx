import { StatCard } from "@/components/ui";
import type { DashboardMetricsProps } from "./type";
import { METRICS_GRID, toMetricTiles } from "./data";

const SKELETON_KEYS = ["free", "in-use", "upcoming", "bookings"];

function DashboardMetrics({ stats, loading = false }: DashboardMetricsProps) {
  if (loading) {
    return (
      <div aria-hidden="true" className={METRICS_GRID}>
        {SKELETON_KEYS.map((key) => (
          <div
            key={key}
            className="bg-raised border-border h-[104px] animate-pulse rounded-2xl border sm:h-[124px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={METRICS_GRID}>
      {toMetricTiles(stats).map(({ label, ...tile }) => (
        <StatCard key={label} label={label} {...tile} />
      ))}
    </div>
  );
}

export default DashboardMetrics;
