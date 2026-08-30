import type { SelectOption } from "@/components/ui";
import type { ScheduleView } from "./data";

export type ScheduleControlsProps = {
  view: ScheduleView;
  onViewChange: (value: ScheduleView) => void;
  date: string;
  onDateChange: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  isCurrent?: boolean;
  roomId?: string;
  onRoomChange?: (value: string) => void;
  roomOptions?: readonly SelectOption[];
  className?: string;
};
