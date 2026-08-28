import type { ReactNode } from "react";

export type CardTone = "surface" | "inverted";

export type CardProps = {
  label: string;
  value: ReactNode;
  tone?: CardTone;
  className?: string;
};
