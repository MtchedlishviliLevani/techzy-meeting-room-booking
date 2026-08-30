import type { ComponentProps, ReactNode, RefObject } from "react";

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

export type ModalDialog = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  titleId: string;
  descriptionId: string;
  dialogHandlers: Pick<
    ComponentProps<"dialog">,
    "onCancel" | "onPointerDown" | "onClick"
  >;
};
