import { Link } from "react-router";
import type { StatCardProps } from "./type";

const CONTAINER =
  "bg-raised border-border block min-w-0 rounded-2xl border p-4 transition-colors duration-200 sm:p-5";

const clamp = (value: number) => Math.min(100, Math.max(0, value));

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  progress,
  to,
  className = "",
}: StatCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="text-muted truncate text-xs sm:text-sm">{label}</p>
        {Icon && (
          <Icon
            aria-hidden="true"
            strokeWidth={2}
            className="text-border-strong size-4 shrink-0"
          />
        )}
      </div>

      <p className="text-ink mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
        {value}
      </p>

      {progress !== undefined && (
        <div
          aria-hidden="true"
          className="bg-border mt-3 h-1.5 overflow-hidden rounded-full"
        >
          <div
            style={{ width: `${clamp(progress)}%` }}
            className="bg-primary h-full rounded-full transition-[width] duration-500"
          />
        </div>
      )}

      {detail && <p className="text-muted mt-2 truncate text-xs">{detail}</p>}
    </>
  );

  if (!to) {
    return <div className={`${CONTAINER} ${className}`}>{content}</div>;
  }

  return (
    <Link
      to={to}
      className={`${CONTAINER} hover:border-border-strong hover:bg-surface ${className}`}
    >
      {content}
    </Link>
  );
}

export default StatCard;
