import { useLocation } from "react-router";
import { Card } from "@/components/ui/Card";
import { isActivePath } from "@/lib";
import { Navbar } from "../ui/Navbar";
import type { HeaderProps } from "./type";

const STATS_PATH = "/";

function Header({
  totalRooms,
  availableNow,
  totalBookings,
  upcomingMeetings,
  ...navbarProps
}: HeaderProps) {
  const { pathname } = useLocation();

  return (
    <header className="bg-header text-surface rounded-2xl border border-header-accent/20 px-4 py-3 shadow-sm sm:rounded-3xl sm:px-6 sm:py-4 lg:px-8">
      <Navbar {...navbarProps} />

      {isActivePath(pathname, STATS_PATH) && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 md:grid-cols-4">
          {[
            { label: "Total Rooms", value: totalRooms },
            { label: "Available Now", value: availableNow },
            { label: "Total Bookings", value: totalBookings },
            { label: "Upcoming Meetings", value: upcomingMeetings },
          ].map(({ label, value }) => (
            <Card
              key={label}
              label={label}
              value={value ?? "—"}
              tone="inverted"
            />
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
