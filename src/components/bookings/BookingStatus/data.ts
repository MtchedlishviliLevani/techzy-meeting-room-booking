import { CalendarCheck, CircleCheck, CircleX, type LucideIcon } from "lucide-react";
import type { BadgeTone } from "@/components/ui";
import type { BookingStatus as Status } from "@/services";

export const BOOKING_STATUS_META = {
  confirmed: { label: "Confirmed", tone: "success", icon: CalendarCheck },
  completed: { label: "Completed", tone: "neutral", icon: CircleCheck },
  cancelled: { label: "Cancelled", tone: "error", icon: CircleX },
} satisfies Record<Status, { label: string; tone: BadgeTone; icon: LucideIcon }>;
