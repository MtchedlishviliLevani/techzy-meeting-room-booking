import type { CheckboxOption } from "@/components/ui";
import { EQUIPMENT_ICONS } from "../EquipmentTag";

export const CAPACITY_OPTIONS = [
  { label: "Any capacity", value: "any" },
  { label: "4+ people", value: "4" },
  { label: "6+ people", value: "6" },
  { label: "8+ people", value: "8" },
  { label: "12+ people", value: "12" },
  { label: "16+ people", value: "16" },
] as const;

export const ROOM_TYPE_OPTIONS = [
  { label: "All types", value: "all" },
  { label: "Meeting", value: "meeting" },
  { label: "Conference", value: "conference" },
  { label: "Huddle", value: "huddle" },
  { label: "Workshop", value: "workshop" },
] as const;

export const AVAILABILITY_OPTIONS = [
  { label: "All rooms", value: "all" },
  { label: "Available", value: "available" },
  { label: "Occupied", value: "occupied" },
] as const;

const EQUIPMENT_NAMES = [
  "Projector",
  "TV",
  "Whiteboard",
  "Video Conferencing",
  "HDMI",
] as const;

export type CapacityFilter = (typeof CAPACITY_OPTIONS)[number]["value"];
export type RoomTypeFilter = (typeof ROOM_TYPE_OPTIONS)[number]["value"];
export type AvailabilityFilter = (typeof AVAILABILITY_OPTIONS)[number]["value"];
export type EquipmentFilter = (typeof EQUIPMENT_NAMES)[number];

export const ANY_CAPACITY = CAPACITY_OPTIONS[0].value;
export const ALL_ROOM_TYPES = ROOM_TYPE_OPTIONS[0].value;
export const ALL_AVAILABILITY = AVAILABILITY_OPTIONS[0].value;

export const EQUIPMENT_OPTIONS: readonly CheckboxOption<EquipmentFilter>[] =
  EQUIPMENT_NAMES.map((name) => ({
    label: name,
    value: name,
    icon: EQUIPMENT_ICONS[name],
  }));
