const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const isISODate = (value: string | null | undefined): value is string =>
  typeof value === "string" && ISO_DATE.test(value);
