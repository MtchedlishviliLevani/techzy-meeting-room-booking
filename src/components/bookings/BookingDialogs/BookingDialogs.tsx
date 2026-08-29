import { Button, Modal } from "@/components/ui";
import { BookingDetails } from "../BookingDetails";
import { BookingForm } from "../BookingForm";
import { isEditable } from "../getBookingActions";
import type { BookingDialogsProps } from "./type";
import { FORM_COPY } from "./data";

function BookingDialogs({
  dialog,
  rooms,
  employees,
  bookings,
  onClose,
  onEdit,
  onSave,
  onConfirmCancel,
}: BookingDialogsProps) {
  if (!dialog) return null;

  if (dialog.type === "details") {
    const { item } = dialog;

    return (
      <Modal
        open
        onClose={onClose}
        size="lg"
        title={item.booking.title}
        description="Booking details"
        footer={
          <>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button disabled={!isEditable(item)} onClick={() => onEdit(item)}>
              Edit booking
            </Button>
          </>
        }
      >
        <BookingDetails booking={item} />
      </Modal>
    );
  }

  if (dialog.type === "cancel") {
    const { booking } = dialog.item;

    return (
      <Modal open onClose={onClose} size="sm" title="Cancel this booking?">
        <p className="text-muted text-sm leading-relaxed">
          <span className="text-ink font-medium">{booking.title}</span> will be
          released and the room becomes available for other teams.
        </p>

        <div className="border-border mt-5 flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            Keep booking
          </Button>
          <Button onClick={() => onConfirmCancel(booking.id)}>
            Cancel booking
          </Button>
        </div>
      </Modal>
    );
  }

  const editing = dialog.type === "edit" ? dialog.item.booking : undefined;
  const defaultRoomId = dialog.type === "create" ? dialog.roomId : undefined;
  const copy = FORM_COPY[editing ? "edit" : "create"];

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={copy.title}
      description={copy.description}
    >
      <BookingForm
        mode={editing ? "edit" : "create"}
        booking={editing}
        rooms={rooms}
        employees={employees}
        bookings={bookings}
        defaultRoomId={defaultRoomId}
        onSubmit={(values) => onSave(values, editing?.id)}
        onCancel={onClose}
      />
    </Modal>
  );
}

export default BookingDialogs;
