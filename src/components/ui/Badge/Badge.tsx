import type { BadgeProps } from "./type";

const TONE = {
  neutral: "bg-background border-border text-muted",
  primary: "bg-primary/10 border-primary/30 text-primary",
  success: "bg-success/10 border-success/30 text-success",
  warning: "bg-warning/10 border-warning/30 text-warning",
  error: "bg-error/10 border-error/30 text-error",
};

function Badge({
  children,
  tone = "neutral",
  icon: Icon,
  title,
  className = "",
}: BadgeProps) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${TONE[tone]} ${className}`}
    >
      {Icon && <Icon className="size-3.5" strokeWidth={2} />}
      {children}
    </span>
  );
}

export default Badge;
