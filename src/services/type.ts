export type Room = {
  id: string;
  name: string;
  capacity: number;
  location: string;
  type: "meeting" | "conference" | "huddle" | "workshop";
  equipment: string[];
  description: string;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

export type BookingStatus = "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  title: string;
  description: string;
  roomId: string;
  organizerId: string;
  attendeeIds: string[];
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
};
