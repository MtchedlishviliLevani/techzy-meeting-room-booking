import { CalendarOff, SearchX } from "lucide-react";

export const SCHEDULE_EMPTY_COPY = {
  bookings: {
    icon: CalendarOff,
    title: "No bookings scheduled",
    description:
      "There's nothing scheduled for this period — every room is available. Move to another day or week, or create a booking.",
    actionLabel: "Create booking",
  },
  room: {
    icon: SearchX,
    title: "That room isn't available",
    description:
      "The selected room could not be found. Show every room to see the full schedule.",
    actionLabel: "Show all rooms",
  },
} as const;
