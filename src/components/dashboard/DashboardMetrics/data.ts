import { CalendarClock, CalendarDays, DoorOpen, Gauge } from "lucide-react";
import { countLabel, pluralize } from "@/lib";
import type { DashboardStats } from "../type";
import type { MetricTile } from "./type";

export const METRICS_GRID = "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4";

export function toMetricTiles({
  totalRooms,
  availableNow,
  totalBookings,
  upcomingMeetings,
}: DashboardStats): MetricTile[] {
  const inUse = totalRooms - availableNow;
  const utilization =
    totalRooms === 0 ? 0 : Math.round((inUse / totalRooms) * 100);

  return [
    {
      label: "Free now",
      value: `${availableNow} of ${totalRooms}`,
      detail: `${pluralize(availableNow, "room")} ready to book`,
      icon: DoorOpen,
      to: "/rooms?availability=available",
    },
    {
      label: "In use (Now)",
      value: `${utilization}%`,
      detail: `${countLabel(inUse, "room")} occupied`,
      icon: Gauge,
      to: "/rooms?availability=occupied",
      progress: utilization,
    },
    {
      label: "Upcoming",
      value: `${upcomingMeetings}`,
      detail: `${pluralize(upcomingMeetings, "meeting")} still to come`,
      icon: CalendarClock,
      to: "/bookings?status=upcoming",
    },
    {
      label: "Bookings",
      value: `${totalBookings}`,
      detail: "across all rooms",
      icon: CalendarDays,
      to: "/bookings",
    },
  ];
}
