import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type StatCardProps = {
  label: string;
  value: ReactNode;
  detail?: string;
  icon?: LucideIcon;
  progress?: number;
  to?: string;
  className?: string;
};
