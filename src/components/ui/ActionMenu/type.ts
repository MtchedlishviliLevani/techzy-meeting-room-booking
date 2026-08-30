import type { RefObject } from "react";
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

export type ActionMenuControls = {
  open: boolean;
  menuId: string;
  containerRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  toggle: () => void;
  close: () => void;
};
