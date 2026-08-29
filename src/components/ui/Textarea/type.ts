import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  onValueChange?: (value: string) => void;
  hideLabel?: boolean;
  error?: string;
  wrapperClassName?: string;
};
