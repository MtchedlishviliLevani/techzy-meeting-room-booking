import { useId, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../Button";
import type { FilterPanelProps } from "./type";

function FilterPanel({
  label,
  search,
  children,
  toggleLabel = "Filters",
  className = "",
}: FilterPanelProps) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-label={label}
      className={`bg-raised border-border rounded-2xl border p-3 sm:p-4 ${className}`}
    >
      {search && (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="min-w-0 flex-1">{search}</div>

          <Button
            variant="secondary"
            icon={SlidersHorizontal}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((isOpen) => !isOpen)}
            className="shrink-0 md:hidden"
          >
            {toggleLabel}
          </Button>
        </div>
      )}

      <div
        id={panelId}
        className={`${open ? "block" : "hidden"} mt-3 space-y-3 md:block`}
      >
        {children}
      </div>
    </section>
  );
}

export default FilterPanel;
