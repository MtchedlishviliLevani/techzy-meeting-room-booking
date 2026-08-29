import type { InputHTMLAttributes } from "react";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  onValueChange?: (value: string) => void;
  hideLabel?: boolean;
  error?: string;
  wrapperClassName?: string;
};
