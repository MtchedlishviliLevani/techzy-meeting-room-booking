import { useId } from "react";
import { FIELD_CONTROL, FIELD_LABEL } from "../fieldStyles";
import type { DateInputProps } from "./type";

function DateInput({
  label,
  onValueChange,
  onChange,
  hideLabel = false,
  id,
  className = "",
  wrapperClassName = "",
  ...props
}: DateInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={`min-w-0 ${wrapperClassName}`}>
      <label htmlFor={inputId} className={hideLabel ? "sr-only" : FIELD_LABEL}>
        {label}
      </label>

      <input
        id={inputId}
        type="date"
        onChange={(event) => {
          onChange?.(event);
          onValueChange?.(event.target.value);
        }}
        className={`${FIELD_CONTROL} px-3 ${className}`}
        {...props}
      />
    </div>
  );
}

export default DateInput;
