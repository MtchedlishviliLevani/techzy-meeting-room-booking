import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { FIELD_CONTROL, FIELD_LABEL } from "../fieldStyles";
import type { SelectProps } from "./type";

function Select<V extends string = string>({
  label,
  options,
  onValueChange,
  onChange,
  hideLabel = false,
  id,
  className = "",
  wrapperClassName = "",
  ...props
}: SelectProps<V>) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={`min-w-0 ${wrapperClassName}`}>
      <label htmlFor={selectId} className={hideLabel ? "sr-only" : FIELD_LABEL}>
        {label}
      </label>

      <div className="relative">
        <select
          id={selectId}
          onChange={(event) => {
            onChange?.(event);
            onValueChange?.(event.target.value as V);
          }}
          className={`${FIELD_CONTROL} cursor-pointer appearance-none pr-9 pl-3 ${className}`}
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
    </div>
  );
}

export default Select;
