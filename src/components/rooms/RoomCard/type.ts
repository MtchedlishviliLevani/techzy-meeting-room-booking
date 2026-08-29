import type { RoomActions, RoomListItem } from "../type";

export type RoomCardProps = RoomActions & {
  room: RoomListItem;
  maxEquipment?: number;
  className?: string;
};
