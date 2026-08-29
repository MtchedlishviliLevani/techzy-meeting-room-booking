import type { BookingStatus as Status } from "@/services";

export type BookingStatusProps = {
  status: Status;
  className?: string;
};
