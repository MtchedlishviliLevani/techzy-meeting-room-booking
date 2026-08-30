import type { CSSProperties } from "react";
import type { BookingListItem } from "../bookings";
import type { ScheduleView } from "./ScheduleControls/data";

export type SchedulePeriod = {
  start: string;
  end: string;
  days: string[];
};

export type ScheduleState = {
  view: ScheduleView;
  date: string;
  roomId: string;
};

export type ScheduleActions = {
  setView: (value: ScheduleView) => void;
  setDate: (value: string) => void;
  setRoomId: (value: string) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  goToToday: () => void;
};

export type ScheduleControlsValue = ScheduleState & ScheduleActions;

export type ScheduleHourRange = {
  startHour: number;
  endHour: number;
};

export type ScheduleColumn = {
  key: string;
  label: string;
  sublabel?: string;
  meta?: string;
  highlighted?: boolean;
};

export type ScheduleEvent = {
  columnKey: string;
  item: BookingListItem;
};

export type ScheduleEventLayout = {
  item: BookingListItem;
  style: CSSProperties;
};

export type ScheduleNow = {
  time: string;
  columnKey?: string;
};

export type ScheduleGroup = {
  key: string;
  label: string;
  sublabel?: string;
  items: BookingListItem[];
};

export type ScheduleSelect = {
  onSelect?: (item: BookingListItem) => void;
};
