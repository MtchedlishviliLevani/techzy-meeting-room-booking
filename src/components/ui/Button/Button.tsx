import type { ButtonProps } from "./type";
import { ICON_SIZE, buttonClass } from "./data";

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
      className={`${buttonClass(variant, size)} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {Icon && <Icon className={ICON_SIZE[size]} strokeWidth={2} aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
