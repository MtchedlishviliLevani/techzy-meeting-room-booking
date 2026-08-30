import { addDays, daysBetween, todayISO } from "@/lib";
import type { Booking } from "./type";

const STORAGE_KEY = "techzy:bookings";

const SEED_ANCHOR_DATE = "2026-08-30";

function toCurrentDates(bookings: readonly Booking[]): Booking[] {
  const offset = daysBetween(SEED_ANCHOR_DATE, todayISO());
  if (offset === 0) return [...bookings];

  return bookings.map((booking) => ({
    ...booking,
    date: addDays(booking.date, offset),
  }));
}

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

async function fetchSeedBookings(signal?: AbortSignal) {
  const response = await fetch("/data/bookings.json", { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);

  const seed = (await response.json()) as Booking[];
  return toCurrentDates(seed);
}

export async function getBookings(signal?: AbortSignal) {
  const stored = readStoredBookings();
  if (stored) return stored;

  return fetchSeedBookings(signal);
}
