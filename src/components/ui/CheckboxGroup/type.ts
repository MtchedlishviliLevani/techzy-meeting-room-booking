import type { LucideIcon } from "lucide-react";

export type CheckboxOption<V extends string = string> = {
  label: string;
  value: V;
  icon?: LucideIcon;
};

export type CheckboxGroupProps<V extends string = string> = {
  label: string;
  options: readonly CheckboxOption<V>[];
  values?: readonly V[];
  onToggle?: (value: V) => void;
  hideLabel?: boolean;
  className?: string;
};
