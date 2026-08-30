import type { ScheduleGroup, ScheduleSelect } from "../type";

export type ScheduleAgendaProps = ScheduleSelect & {
  groups: readonly ScheduleGroup[];
  showRoom?: boolean;
  emptyLabel?: string;
  className?: string;
};
