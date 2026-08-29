import type { ButtonProps } from "./type";

const BASE =
  "inline-flex items-center justify-center rounded-lg border font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-55";

const VARIANT = {
  primary: "bg-primary text-surface border-transparent hover:bg-primary-hover",
  secondary:
    "bg-raised text-ink border-border hover:border-border-strong hover:bg-primary-subtle",
  ghost: "bg-transparent text-muted border-transparent hover:bg-primary-subtle hover:text-ink",
};

const SIZE = {
  sm: "gap-1.5 px-3 py-1.5 text-xs",
  md: "gap-2 px-4 py-2.5 text-sm",
};

const ICON_SIZE = { sm: "size-3.5", md: "size-4" };

function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  fullWidth = false,
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {Icon && <Icon className={ICON_SIZE[size]} strokeWidth={2} aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
