import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "error";

export type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: LucideIcon;
  title?: string;
  className?: string;
};
