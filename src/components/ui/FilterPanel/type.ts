import type { ReactNode } from "react";

export type FilterPanelProps = {
  label: string;
  search?: ReactNode;
  children: ReactNode;
  toggleLabel?: string;
  className?: string;
};
