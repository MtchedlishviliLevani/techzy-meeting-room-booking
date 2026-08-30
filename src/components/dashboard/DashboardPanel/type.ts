import type { ReactNode } from "react";
import type { DashboardPanelAction } from "../type";

export type DashboardPanelProps = {
  title: string;
  meta?: string;
  action?: DashboardPanelAction;
  children: ReactNode;
  className?: string;
};
