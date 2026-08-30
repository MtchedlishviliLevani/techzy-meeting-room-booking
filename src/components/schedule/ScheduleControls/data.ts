export const SCHEDULE_VIEW_OPTIONS = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
] as const;

export type ScheduleView = (typeof SCHEDULE_VIEW_OPTIONS)[number]["value"];

export const DEFAULT_SCHEDULE_VIEW = SCHEDULE_VIEW_OPTIONS[0].value;

export const SCHEDULE_UNIT: Record<ScheduleView, string> = {
  day: "day",
  week: "week",
};
