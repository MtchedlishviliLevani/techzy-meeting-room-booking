import type { ReactNode } from "react";
import type { RoomActions, RoomListItem } from "../type";

export type RoomGridProps = RoomActions & {
  rooms: RoomListItem[];
  
  emptyState?: ReactNode;
  className?: string;
};
