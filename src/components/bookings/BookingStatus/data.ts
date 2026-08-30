import { CalendarCheck, CircleCheck, CircleX, type LucideIcon } from "lucide-react";
import type { BadgeTone } from "@/components/ui";
import type { BookingState } from "../type";

export const BOOKING_STATUS_META = {
  upcoming: { label: "Upcoming", tone: "success", icon: CalendarCheck },
  completed: { label: "Completed", tone: "neutral", icon: CircleCheck },
  cancelled: { label: "Cancelled", tone: "error", icon: CircleX },
} satisfies Record<
  BookingState,
  { label: string; tone: BadgeTone; icon: LucideIcon }
>;
