import { useId } from "react";
import { Search } from "lucide-react";
import { FIELD_CONTROL, FIELD_LABEL } from "../fieldStyles";
import type { SearchInputProps } from "./type";

function SearchInput({
  label,
  onValueChange,
  onChange,
  showLabel = false,
  id,
  className = "",
  wrapperClassName = "",
  ...props
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div role="search" className={`min-w-0 ${wrapperClassName}`}>
      <label htmlFor={inputId} className={showLabel ? FIELD_LABEL : "sr-only"}>
        {label}
      </label>

      <div className="relative">
        <Search
          className="text-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          strokeWidth={2}
          aria-hidden="true"
        />

        <input
          id={inputId}
          type="search"
          onChange={(event) => {
            onChange?.(event);
            onValueChange?.(event.target.value);
          }}
          className={`${FIELD_CONTROL} pr-3 pl-9 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}

export default SearchInput;
