import type { PageHeaderProps } from "./type";

function PageHeader({
  title,
  description,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6 ${className}`}
    >
      <div className="min-w-0">
        <h1 className="text-ink text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h1>

        {description && (
          <p className="text-muted mt-1 text-sm leading-relaxed sm:max-w-xl">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

export default PageHeader;
