import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: ReactNode;
  size?: ModalSize;
  children: ReactNode;
  className?: string;
};
