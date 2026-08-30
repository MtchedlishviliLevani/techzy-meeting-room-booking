import { useState } from "react";
import { BookingDialogs, type BookingDialog } from "@/components";
import { useBookings, useEmployees, useNow, useRooms } from "@/hooks";
import { BookingsContext } from "./context";
import type { BookingsProviderProps } from "./type";

function BookingsProvider({ children }: BookingsProviderProps) {
  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
    createBooking,
    updateBooking,
    cancelBooking,
  } = useBookings();
  const { rooms, loading: roomsLoading, error: roomsError } = useRooms();
  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
  } = useEmployees();

  const { today, now } = useNow();

  const [dialog, setDialog] = useState<BookingDialog | null>(null);
  const closeDialog = () => setDialog(null);

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        rooms,
        employees,
        today,
        now,
        loading: bookingsLoading || roomsLoading || employeesLoading,
        error: bookingsError ?? roomsError ?? employeesError,
        openCreateBooking: (roomId) => setDialog({ type: "create", roomId }),
        openBookingDetails: (item) => setDialog({ type: "details", item }),
        openEditBooking: (item) => setDialog({ type: "edit", item }),
        openCancelBooking: (item) => setDialog({ type: "cancel", item }),
      }}
    >
      {children}

      <BookingDialogs
        dialog={dialog}
        rooms={rooms}
        employees={employees}
        bookings={bookings}
        onClose={closeDialog}
        onEdit={(item) => setDialog({ type: "edit", item })}
        onSave={(values, bookingId) => {
          if (bookingId) {
            updateBooking(bookingId, values);
          } else {
            createBooking(values);
          }
          closeDialog();
        }}
        onConfirmCancel={(bookingId) => {
          cancelBooking(bookingId);
          closeDialog();
        }}
      />
    </BookingsContext.Provider>
  );
}

export default BookingsProvider;
