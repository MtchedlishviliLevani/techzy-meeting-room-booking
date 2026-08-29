import type { InputHTMLAttributes } from "react";

export type DateInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  onValueChange?: (value: string) => void;
  hideLabel?: boolean;
  error?: string;
  wrapperClassName?: string;
};
