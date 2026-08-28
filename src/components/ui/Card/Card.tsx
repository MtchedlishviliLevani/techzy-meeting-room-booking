import type { CardProps } from "./type";

const TONE = {
  surface: {
    container: "bg-raised border-border",
    label: "text-muted",
    value: "text-ink",
  },
  inverted: {
    container: "bg-primary/40 border-primary/50",
    label: "text-header-accent",
    value: "text-surface",
  },
};

function Card({
  label = "lmlml",
  value = 2,
  tone = "surface",
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 ${TONE[tone].container} ${className}`}
    >
      <p className={`text-xs sm:text-sm ${TONE[tone].label}`}>{label}</p>
      <p
        className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${TONE[tone].value}`}
      >
        {value}
      </p>
    </div>
  );
}

export default Card;
