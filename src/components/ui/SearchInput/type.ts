import type { InputHTMLAttributes } from "react";

export type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  onValueChange?: (value: string) => void;
  showLabel?: boolean;
  wrapperClassName?: string;
};
