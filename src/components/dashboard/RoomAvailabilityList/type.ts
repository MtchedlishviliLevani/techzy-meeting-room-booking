import type { ReactNode } from "react";
import type { RoomListItem } from "../../rooms";

export type RoomAvailabilityListProps = {
  rooms: readonly RoomListItem[];
  emptyState?: ReactNode;
  className?: string;
};
