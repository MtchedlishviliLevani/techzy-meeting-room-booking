import type {
  ScheduleColumn,
  ScheduleEvent,
  ScheduleHourRange,
  ScheduleNow,
  ScheduleSelect,
} from "../type";

export type ScheduleGridProps = ScheduleSelect & {
  label: string;
  columns: readonly ScheduleColumn[];
  events: readonly ScheduleEvent[];
  range: ScheduleHourRange;
  now?: ScheduleNow;
  showRoom?: boolean;
  minColumnWidth?: string;
  className?: string;
};
