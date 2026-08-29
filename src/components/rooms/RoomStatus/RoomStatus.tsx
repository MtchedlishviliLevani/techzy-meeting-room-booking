import { CircleCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { BadgeTone } from "@/components/ui/Badge";
import type { RoomAvailability } from "../type";
import type { RoomStatusProps } from "./type";

const STATUS = {
  available: { label: "Available", tone: "success", icon: CircleCheck },
  occupied: { label: "Occupied", tone: "error", icon: Clock },
} satisfies Record<
  RoomAvailability,
  { label: string; tone: BadgeTone; icon: typeof Clock }
>;

function RoomStatus({ status, className = "" }: RoomStatusProps) {
  const { label, tone, icon } = STATUS[status];

  return (
    <Badge tone={tone} icon={icon} className={className}>
      {label}
    </Badge>
  );
}

export default RoomStatus;
