import type { ButtonSize, ButtonVariant } from "./type";

const BASE =
  "inline-flex items-center justify-center rounded-lg border font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-55";

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-primary text-surface border-transparent hover:bg-primary-hover",
  secondary:
    "bg-raised text-ink border-border hover:border-border-strong hover:bg-primary-subtle",
  ghost:
    "bg-transparent text-muted border-transparent hover:bg-primary-subtle hover:text-ink",
  danger: "bg-error text-surface border-transparent hover:bg-error/85",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "gap-1.5 px-3 py-1.5 text-xs",
  md: "gap-2 px-4 py-2.5 text-sm",
};

export const ICON_SIZE: Record<ButtonSize, string> = {
  sm: "size-3.5",
  md: "size-4",
};

export const buttonClass = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
) => `${BASE} ${VARIANT[variant]} ${SIZE[size]}`;
