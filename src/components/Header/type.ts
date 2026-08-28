import type { NavbarProps } from "../ui/Navbar";

export type HeaderProps = NavbarProps & {
  totalRooms?: number;
  availableNow?: number;
  totalBookings?: number;
  upcomingMeetings?: number;
};
