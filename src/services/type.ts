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
