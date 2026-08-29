import type { Employee } from "./type";

export async function getEmployees(signal?: AbortSignal) {
  const response = await fetch("/data/employees.json", { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<Employee[]>;
}
