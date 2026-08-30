import { countLabel } from "@/lib";
import { formatFullDate } from "../../bookings";
import { bookingsInRoom } from "../filterScheduleBookings";
import { ScheduleAgenda } from "../ScheduleAgenda";
import { ScheduleGrid } from "../ScheduleGrid";
import { bookedMinutes, formatDuration, scheduleHourRange } from "../scheduleLayout";
import type { ScheduleColumn, ScheduleEvent } from "../type";
import type { DayScheduleProps } from "./type";

const columnMeta = (booked: number, count: number) =>
  booked === 0 ? "Free all day" : `${countLabel(count, "booking")} · ${formatDuration(booked)}`;

function DaySchedule({
  date,
  rooms,
  bookings,
  today,
  now,
  onSelect,
  className = "",
}: DayScheduleProps) {
  const range = scheduleHourRange(bookings);
  const byRoom = rooms.map((room) => ({
    room,
    items: bookingsInRoom(bookings, room.id),
  }));

  const columns: ScheduleColumn[] = byRoom.map(({ room, items }) => ({
    key: room.id,
    label: room.name,
    sublabel: room.location,
    meta: columnMeta(bookedMinutes(items), items.length),
  }));

  const events: ScheduleEvent[] = bookings.map((item) => ({
    columnKey: item.booking.roomId,
    item,
  }));

  return (
    <section
      aria-label={`Day schedule for ${formatFullDate(date)}`}
      className={`min-w-0 ${className}`}
    >
      <ScheduleGrid
        label={`Rooms and bookings on ${formatFullDate(date)}`}
        columns={columns}
        events={events}
        range={range}
        now={date === today && now ? { time: now } : undefined}
        minColumnWidth="9.5rem"
        onSelect={onSelect}
        className="max-md:hidden"
      />

      <ScheduleAgenda
        groups={byRoom.map(({ room, items }) => ({
          key: room.id,
          label: room.name,
          sublabel: room.location,
          items,
        }))}
        onSelect={onSelect}
        className="md:hidden"
      />
    </section>
  );
}

export default DaySchedule;
