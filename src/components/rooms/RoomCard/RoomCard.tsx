import { MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EquipmentTag } from "../EquipmentTag";
import { RoomStatus } from "../RoomStatus";
import type { RoomCardProps } from "./type";
import { ROOM_TYPE_LABELS } from "./data";

function RoomCard({
  room,
  onBook,
  onViewDetails,
  maxEquipment = 3,
  className = "",
}: RoomCardProps) {
  const { name, type, capacity, location, equipment, availability } = room;
  const visibleEquipment = equipment.slice(0, maxEquipment);
  const hiddenCount = equipment.length - visibleEquipment.length;

  return (
    <article
      className={`bg-raised border-border flex h-full flex-col rounded-2xl border p-4 transition-colors duration-200 hover:border-border-strong sm:p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-ink truncate text-base font-semibold tracking-tight sm:text-lg">
            {name}
          </h3>
          <p className="text-muted mt-0.5 text-sm">{ROOM_TYPE_LABELS[type]}</p>
        </div>

        {availability && <RoomStatus status={availability} className="shrink-0" />}
      </div>

      <dl className="text-muted mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Capacity</dt>
          <Users className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <dd className="text-ink">
            {capacity} <span className="text-muted">people</span>
          </dd>
        </div>

        <div className="flex min-w-0 items-center gap-1.5">
          <dt className="sr-only">Location</dt>
          <MapPin className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <dd className="text-ink truncate">{location}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <h4 className="text-muted text-xs font-medium tracking-wide">Equipment</h4>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {visibleEquipment.map((item) => (
            <li key={item}>
              <EquipmentTag name={item} />
            </li>
          ))}
          {hiddenCount > 0 && (
            <li>
              <Badge
                title={equipment.slice(maxEquipment).join(", ")}
                className="border-dashed"
              >
                +{hiddenCount} more
              </Badge>
            </li>
          )}
        </ul>
      </div>

      <div className="border-border mt-auto flex items-center gap-2 border-t pt-5">
        <Button variant="secondary" onClick={() => onViewDetails?.(room)}>
          View details
        </Button>
        <Button onClick={() => onBook?.(room)} className="flex-1">
          Book room
        </Button>
      </div>

    </article>
  );
}

export default RoomCard;
