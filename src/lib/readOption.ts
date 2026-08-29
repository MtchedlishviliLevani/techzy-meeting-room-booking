export function readOption<V extends string>(
  raw: string | null | undefined,
  options: readonly { value: V }[],
  fallback: V,
): V {
  return options.find((option) => option.value === raw)?.value ?? fallback;
}
