import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import type { DashboardPanelProps } from "./type";

function DashboardPanel({
  title,
  meta,
  action,
  children,
  className = "",
}: DashboardPanelProps) {
  return (
    <section aria-label={title} className={`min-w-0 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex min-w-0 items-baseline gap-2">
          <h2 className="text-ink truncate text-base font-semibold tracking-tight sm:text-lg">
            {title}
          </h2>
          {meta && <span className="text-muted shrink-0 text-xs">{meta}</span>}
        </div>

        {action && (
          <Link
            to={action.to}
            className="text-primary hover:text-primary-hover inline-flex shrink-0 items-center gap-1 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            {action.label}
            <ChevronRight className="size-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="mt-3">{children}</div>
    </section>
  );
}

export default DashboardPanel;
