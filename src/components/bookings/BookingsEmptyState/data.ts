import { CalendarPlus, SearchX } from "lucide-react";

export const BOOKINGS_EMPTY_COPY = {
  
  empty: {
    icon: CalendarPlus,
    title: "No bookings found",
    description:
      "Nothing is booked yet. Create a booking to reserve a meeting room for your team.",
    actionLabel: "Create booking",
  },
  
  filtered: {
    icon: SearchX,
    title: "No bookings match your filters",
    description:
      "Try a different room, organizer, or date range — or clear the filters to see every booking.",
    actionLabel: "Clear filters",
  },
} as const;
