import { CHOICE_FOCUS, FIELD_LABEL } from "../fieldStyles";
import type { CheckboxGroupProps } from "./type";

function CheckboxGroup<V extends string = string>({
  label,
  options,
  values,
  onToggle,
  hideLabel = false,
  className = "",
}: CheckboxGroupProps<V>) {
  return (
    <fieldset className={`min-w-0 ${className}`}>
      <legend className={hideLabel ? "sr-only" : FIELD_LABEL}>{label}</legend>

      <div className="flex flex-wrap gap-1.5">
        {options.map(({ label: optionLabel, value, icon: Icon }) => (
          <label key={value}>
            <input
              type="checkbox"
              value={value}
              className="peer sr-only"
              checked={values?.includes(value)}
              onChange={() => onToggle?.(value)}
            />
            <span
              className={`border-border text-muted hover:border-border-strong peer-checked:bg-primary peer-checked:text-surface peer-checked:border-primary inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-200 ${CHOICE_FOCUS}`}
            >
              {Icon && (
                <Icon className="size-3.5" strokeWidth={2} aria-hidden="true" />
              )}
              {optionLabel}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default CheckboxGroup;
