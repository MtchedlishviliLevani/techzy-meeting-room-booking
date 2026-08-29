import type { LucideIcon } from "lucide-react";

export type ActionMenuItem = {
  label: string;
  icon?: LucideIcon;
  onSelect?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
  
  hint?: string;
};

export type ActionMenuProps = {
  label: string;
  items: readonly ActionMenuItem[];
  align?: "start" | "end";
  className?: string;
};
