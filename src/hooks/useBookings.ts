import { useState, useEffect } from "react";
import type { BookingFormValues } from "@/components";
import { isModifiable } from "@/components/bookings/bookingState";
import { getBookings, saveBookings, type Booking } from "../services";

const createId = () => `booking-${crypto.randomUUID()}`;

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getBookings(controller.signal)
      .then((data) => {
        setBookings(data);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err : new Error("Failed to load bookings"),
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  function commit(next: Booking[]) {
    setBookings(next);
    saveBookings(next);
  }

  function withModifiable(id: string, change: (booking: Booking) => Booking) {
    const target = bookings.find((booking) => booking.id === id);
    if (!target || !isModifiable(target)) return;

    commit(
      bookings.map((booking) => (booking.id === id ? change(booking) : booking)),
    );
  }

  function createBooking(values: BookingFormValues) {
    commit([...bookings, { id: createId(), status: "confirmed", ...values }]);
  }

  function updateBooking(id: string, values: BookingFormValues) {
    withModifiable(id, (booking) => ({ ...booking, ...values }));
  }

  function cancelBooking(id: string) {
    withModifiable(id, (booking) => ({ ...booking, status: "cancelled" }));
  }

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBooking,
    cancelBooking,
  };
}
