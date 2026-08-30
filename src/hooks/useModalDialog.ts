import { useEffect, useId, useRef } from "react";
import type { ModalDialog } from "@/components";

export function useModalDialog(
  open: boolean,
  onClose: () => void,
): ModalDialog {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropPressed = useRef(false);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const opener = document.activeElement;
    if (!dialog.open) dialog.showModal();

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const gutter = window.innerWidth - documentElement.clientWidth;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
      if (dialog.open) dialog.close();
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, [open]);

  return {
    dialogRef,
    titleId,
    descriptionId,
    dialogHandlers: {
      onCancel: (event) => {
        event.preventDefault();
        onClose();
      },
      onPointerDown: (event) => {
        backdropPressed.current = event.target === dialogRef.current;
      },
      onClick: (event) => {
        const onBackdrop = event.target === dialogRef.current;
        const pressedBackdrop = backdropPressed.current;
        backdropPressed.current = false;
        if (onBackdrop && pressedBackdrop) onClose();
      },
    },
  };
}
