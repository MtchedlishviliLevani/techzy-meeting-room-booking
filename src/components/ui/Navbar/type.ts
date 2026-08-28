import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
};

export type ActionItem = {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export type NavbarProps = {
  navItems?: NavItem[];
  actions?: ActionItem[];
  userName?: string;
  avatarSrc?: string;
};
