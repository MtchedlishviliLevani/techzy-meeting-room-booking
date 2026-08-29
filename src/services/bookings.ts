import type { Booking } from "./type";

const STORAGE_KEY = "techzy:bookings";

function readStoredBookings(): Booking[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : null;
  } catch {
    return null;
  }
}

export function saveBookings(bookings: readonly Booking[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    return;
  }
}

export function clearStoredBookings() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

export async function getBookings(signal?: AbortSignal) {
  const stored = readStoredBookings();
  if (stored) return stored;

  const response = await fetch("/data/bookings.json", { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<Booking[]>;
}
