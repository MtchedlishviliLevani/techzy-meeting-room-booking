import { EllipsisVertical } from "lucide-react";
import { useActionMenu } from "@/hooks/useActionMenu";
import type { ActionMenuProps } from "./type";

const ITEM_TONE = {
  default: "text-ink enabled:hover:bg-primary-subtle",
  danger: "text-error enabled:hover:bg-error/10",
};

function ActionMenu({
  label,
  items,
  align = "end",
  className = "",
}: ActionMenuProps) {
  const { open, menuId, containerRef, triggerRef, toggle, close } =
    useActionMenu();

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={toggle}
        className="text-muted hover:bg-primary-subtle hover:text-ink inline-flex items-center justify-center rounded-full border border-transparent p-1.5 transition-colors duration-200"
      >
        <EllipsisVertical
          className="size-4"
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={`bg-raised border-border absolute top-full z-20 mt-1 min-w-44 rounded-xl border p-1 shadow-lg ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {items.map(
            ({
              label: itemLabel,
              icon: Icon,
              onSelect,
              disabled,
              tone = "default",
              hint,
            }) => (
              <button
                key={itemLabel}
                type="button"
                role="menuitem"
                disabled={disabled}
                title={disabled ? hint : undefined}
                onClick={() => {
                  close();
                  onSelect?.();
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors duration-200 disabled:opacity-45 ${ITEM_TONE[tone]}`}
              >
                {Icon && (
                  <Icon
                    className="size-4 shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}
                {itemLabel}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
