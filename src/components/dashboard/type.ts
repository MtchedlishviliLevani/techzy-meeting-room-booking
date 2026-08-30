import type { BookingListItem } from "../bookings";
import type { RoomListItem } from "../rooms";

export type DashboardStats = {
  totalRooms: number;
  availableNow: number;
  totalBookings: number;
  upcomingMeetings: number;
};

export type DashboardData = {
  loading: boolean;
  error: Error | null;
  today: string;
  stats: DashboardStats;
  
  rooms: RoomListItem[];
  todayBookings: BookingListItem[];
  
  upcomingBookings: BookingListItem[];
  upcomingCount: number;
};

export type DashboardPanelAction = {
  label: string;
  to: string;
};
