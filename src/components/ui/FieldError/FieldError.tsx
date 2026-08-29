import { CircleAlert } from "lucide-react";
import type { FieldErrorProps } from "./type";

function FieldError({ id, message, className = "" }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p
      id={id}
      className={`text-error mt-1.5 flex items-start gap-1.5 text-xs ${className}`}
    >
      <CircleAlert
        className="mt-px size-3.5 shrink-0"
        strokeWidth={2}
        aria-hidden="true"
      />
      {message}
    </p>
  );
}

export default FieldError;
