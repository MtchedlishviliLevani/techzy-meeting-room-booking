import type { LucideIcon } from "lucide-react";
import type { Room } from "@/services";
import type { RoomListItem } from "../type";

export type RoomDetailsProps = {
  room: RoomListItem | null;
  onClose: () => void;
  onBook?: (room: Room) => void;
};

export type RoomDetailProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};
