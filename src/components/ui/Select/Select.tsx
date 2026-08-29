import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { fieldControl, FIELD_LABEL } from "../fieldStyles";
import { FieldError } from "../FieldError";
import type { SelectProps } from "./type";

function Select<V extends string = string>({
  label,
  options,
  onValueChange,
  onChange,
  hideLabel = false,
  error,
  id,
  className = "",
  wrapperClassName = "",
  ...props
}: SelectProps<V>) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className={`min-w-0 ${wrapperClassName}`}>
      <label htmlFor={selectId} className={hideLabel ? "sr-only" : FIELD_LABEL}>
        {label}
      </label>

      <div className="relative">
        <select
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            onChange?.(event);
            onValueChange?.(event.target.value as V);
          }}
          className={`${fieldControl(Boolean(error))} cursor-pointer appearance-none pr-9 pl-3 ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="text-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default Select;
