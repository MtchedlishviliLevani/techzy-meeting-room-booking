import type { ReactNode } from "react";
import type { Booking, Employee, Room } from "@/services";
import type { BookingListItem } from "@/components";

export type BookingsContextValue = {
  bookings: Booking[];
  rooms: Room[];
  employees: Employee[];
  loading: boolean;
  error: Error | null;

  today: string;
  now: string;
  openCreateBooking: (roomId?: string) => void;
  openResetDemoData: () => void;
  openBookingDetails: (item: BookingListItem) => void;
  openEditBooking: (item: BookingListItem) => void;
  openCancelBooking: (item: BookingListItem) => void;
};

export type BookingsProviderProps = {
  children: ReactNode;
};
