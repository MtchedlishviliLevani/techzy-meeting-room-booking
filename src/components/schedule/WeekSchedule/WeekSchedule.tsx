import { countLabel } from "@/lib";
import { formatFullDate } from "../../bookings";
import { bookingsOnDate } from "../filterScheduleBookings";
import { formatDayAndMonth, formatWeekday } from "../scheduleDates";
import { ScheduleAgenda } from "../ScheduleAgenda";
import { ScheduleGrid } from "../ScheduleGrid";
import { scheduleHourRange } from "../scheduleLayout";
import type { ScheduleColumn, ScheduleEvent } from "../type";
import type { WeekScheduleProps } from "./type";

function WeekSchedule({
  days,
  bookings,
  today,
  now,
  onSelect,
  className = "",
}: WeekScheduleProps) {
  const range = scheduleHourRange(bookings);
  const byDay = days.map((date) => ({
    date,
    items: bookingsOnDate(bookings, date),
  }));

  const columns: ScheduleColumn[] = byDay.map(({ date, items }) => ({
    key: date,
    label: formatWeekday(date),
    sublabel: formatDayAndMonth(date),
    meta: items.length === 0 ? "Free" : countLabel(items.length, "booking"),
    highlighted: date === today,
  }));

  const events: ScheduleEvent[] = bookings.map((item) => ({
    columnKey: item.booking.date,
    item,
  }));

  return (
    <section aria-label="Week schedule" className={`min-w-0 ${className}`}>
      <ScheduleGrid
        label="Bookings for the selected week"
        columns={columns}
        events={events}
        range={range}
        now={today && now ? { time: now, columnKey: today } : undefined}
        showRoom
        minColumnWidth="8rem"
        onSelect={onSelect}
        className="max-md:hidden"
      />

      <ScheduleAgenda
        groups={byDay.map(({ date, items }) => ({
          key: date,
          label: formatFullDate(date),
          sublabel: date === today ? "Today" : undefined,
          items,
        }))}
        showRoom
        onSelect={onSelect}
        className="md:hidden"
      />
    </section>
  );
}

export default WeekSchedule;
