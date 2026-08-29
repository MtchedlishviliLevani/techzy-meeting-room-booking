import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};
