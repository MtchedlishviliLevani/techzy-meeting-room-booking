import type { EmptyStateProps } from "./type";

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`border-border bg-raised flex flex-col items-center rounded-2xl border border-dashed px-6 py-12 text-center ${className}`}
    >
      {Icon && (
        <span className="bg-primary-subtle text-primary mb-4 inline-flex size-11 items-center justify-center rounded-full">
          <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
      )}

      <p className="text-ink text-base font-semibold tracking-tight">{title}</p>

      {description && (
        <p className="text-muted mt-1.5 max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
