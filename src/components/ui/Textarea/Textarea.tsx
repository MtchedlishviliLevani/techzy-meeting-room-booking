import { useId } from "react";
import { fieldControl, FIELD_LABEL } from "../fieldStyles";
import { FieldError } from "../FieldError";
import type { TextareaProps } from "./type";

function Textarea({
  label,
  onValueChange,
  onChange,
  hideLabel = false,
  error,
  rows = 3,
  id,
  className = "",
  wrapperClassName = "",
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;

  return (
    <div className={`min-w-0 ${wrapperClassName}`}>
      <label htmlFor={textareaId} className={hideLabel ? "sr-only" : FIELD_LABEL}>
        {label}
      </label>

      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => {
          onChange?.(event);
          onValueChange?.(event.target.value);
        }}
        className={`${fieldControl(Boolean(error))} resize-y px-3 ${className}`}
        {...props}
      />

      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default Textarea;
