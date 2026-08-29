import type { SelectHTMLAttributes } from "react";

export type SelectOption<V extends string = string> = {
  label: string;
  value: V;
};

export type SelectProps<V extends string = string> = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "value"
> & {
  label: string;
  options: readonly SelectOption<V>[];
  value?: V;
  onValueChange?: (value: V) => void;
  
  hideLabel?: boolean;
  error?: string;
  wrapperClassName?: string;
};
