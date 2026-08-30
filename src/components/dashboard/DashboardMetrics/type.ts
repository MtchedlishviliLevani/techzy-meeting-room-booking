import type { LucideIcon } from "lucide-react";
import type { DashboardStats } from "../type";

export type MetricTile = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  to: string;
  progress?: number;
};

export type DashboardMetricsProps = {
  stats: DashboardStats;
  loading?: boolean;
};
