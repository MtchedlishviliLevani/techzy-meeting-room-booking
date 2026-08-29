import type { Room } from "@/services";

export const ROOM_TYPE_LABELS: Record<Room["type"], string> = {
  meeting: "Meeting Room",
  conference: "Conference Room",
  huddle: "Huddle Room",
  workshop: "Workshop Room",
};
