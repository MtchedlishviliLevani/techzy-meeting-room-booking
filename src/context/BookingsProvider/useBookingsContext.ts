import { useContext } from "react";
import { BookingsContext } from "./context";

export function useBookingsContext() {
  const context = useContext(BookingsContext);

  if (!context) {
    throw new Error("useBookingsContext must be used inside <BookingsProvider>");
  }

  return context;
}
