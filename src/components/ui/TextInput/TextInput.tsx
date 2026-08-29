import { useId } from "react";
import { fieldControl, FIELD_LABEL } from "../fieldStyles";
import { FieldError } from "../FieldError";
import type { TextInputProps } from "./type";

function TextInput({
  label,
  onValueChange,
  onChange,
  hideLabel = false,
  error,
  type = "text",
  id,
  className = "",
  wrapperClassName = "",
  ...props
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={`min-w-0 ${wrapperClassName}`}>
      <label htmlFor={inputId} className={hideLabel ? "sr-only" : FIELD_LABEL}>
        {label}
      </label>

      <input
        id={inputId}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => {
          onChange?.(event);
          onValueChange?.(event.target.value);
        }}
        className={`${fieldControl(Boolean(error))} px-3 ${className}`}
        {...props}
      />

      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default TextInput;
