import { X } from "lucide-react";
import { useModalDialog } from "@/hooks/useModalDialog";
import type { ModalProps } from "./type";

const SIZE = {
  sm: "sm:max-w-md",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
};

function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  size = "md",
  children,
  className = "",
}: ModalProps) {
  const { dialogRef, titleId, descriptionId, dialogHandlers } = useModalDialog(
    open,
    onClose,
  );

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      {...dialogHandlers}
      className={`bg-raised border-border text-ink open:flex m-auto max-h-[85dvh] w-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-2xl border p-0 shadow-lg backdrop:bg-header/50 ${SIZE[size]} ${className}`}
    >
      <header className="border-border flex items-start justify-between gap-3 border-b px-4 py-3.5 sm:px-5">
        <div className="min-w-0">
          <h2
            id={titleId}
            className="text-ink text-base font-semibold tracking-tight sm:text-lg"
          >
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="text-muted mt-0.5 text-sm">
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="text-muted hover:bg-primary-subtle hover:text-ink -mr-1 inline-flex shrink-0 items-center justify-center rounded-full p-1.5 transition-colors duration-200"
        >
          <X className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </header>

      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
        {children}
      </div>

      {footer && (
        <footer className="border-border bg-surface flex flex-col-reverse gap-2 border-t px-4 py-3 sm:flex-row sm:justify-end sm:px-5">
          {footer}
        </footer>
      )}
    </dialog>
  );
}

export default Modal;
