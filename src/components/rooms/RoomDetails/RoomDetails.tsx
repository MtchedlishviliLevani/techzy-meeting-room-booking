import { DoorOpen, MapPin, Users } from "lucide-react";
import { Button, Modal } from "@/components/ui";
import { countLabel } from "@/lib";
import { EquipmentTag } from "../EquipmentTag";
import { ROOM_TYPE_LABELS } from "../RoomCard";
import { RoomStatus } from "../RoomStatus";
import type { RoomDetailProps, RoomDetailsProps } from "./type";

function Detail({ icon: Icon, label, value }: RoomDetailProps) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon
        className="text-muted mt-0.5 size-4 shrink-0"
        strokeWidth={2}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <dt className="text-muted text-xs font-medium tracking-wide">{label}</dt>
        <dd className="text-ink mt-0.5 text-sm">{value}</dd>
      </div>
    </div>
  );
}

function RoomDetails({ room, onClose, onBook }: RoomDetailsProps) {
  if (!room) return null;

  return (
    <Modal
      open
      onClose={onClose}
      size="md"
      title={room.name}
      description="Room details"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onBook?.(room)}>Book room</Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          {room.availability && <RoomStatus status={room.availability} />}
          <span className="text-muted text-xs">
            {ROOM_TYPE_LABELS[room.type]}
          </span>
        </div>

        {room.description && (
          <p className="text-muted text-sm leading-relaxed">
            {room.description}
          </p>
        )}

        <dl className="grid gap-4 sm:grid-cols-2">
          <Detail
            icon={Users}
            label="Capacity"
            value={countLabel(room.capacity, "person", "people")}
          />
          <Detail icon={MapPin} label="Location" value={room.location} />
          <Detail
            icon={DoorOpen}
            label="Room type"
            value={ROOM_TYPE_LABELS[room.type]}
          />
        </dl>

        <section className="border-border border-t pt-4">
          <h3 className="text-muted text-xs font-medium tracking-wide">
            Equipment ({room.equipment.length})
          </h3>

          {room.equipment.length === 0 ? (
            <p className="text-muted mt-2 text-sm">
              No equipment listed for this room.
            </p>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {room.equipment.map((item) => (
                <li key={item}>
                  <EquipmentTag name={item} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Modal>
  );
}

export default RoomDetails;
