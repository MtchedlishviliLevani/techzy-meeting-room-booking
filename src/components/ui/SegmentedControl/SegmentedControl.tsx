import { useId } from "react";
import { CHOICE_FOCUS, FIELD_LABEL } from "../fieldStyles";
import type { SegmentedControlProps } from "./type";

function SegmentedControl<V extends string = string>({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  hideLabel = false,
  className = "",
}: SegmentedControlProps<V>) {
  const groupName = useId();
  const initialValue = defaultValue ?? options[0]?.value;

  return (
    <fieldset className={`min-w-0 ${className}`}>
      <legend className={hideLabel ? "sr-only" : FIELD_LABEL}>{label}</legend>

      <div className="border-border bg-background flex rounded-lg border p-0.5">
        {options.map((option) => (
          <label key={option.value} className="relative min-w-0 flex-1">
            <input
              type="radio"
              name={groupName}
              value={option.value}
              className="peer sr-only"
              {...(value === undefined
                ? { defaultChecked: option.value === initialValue }
                : { checked: value === option.value })}
              onChange={() => onValueChange?.(option.value)}
            />
            <span
              className={`text-muted peer-checked:bg-raised peer-checked:text-ink peer-checked:border-border block cursor-pointer truncate rounded-md border border-transparent px-2 py-1.5 text-center text-xs font-medium transition-colors duration-200 ${CHOICE_FOCUS}`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default SegmentedControl;
