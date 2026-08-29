export type Room = {
  id: string;
  name: string;
  capacity: number;
  location: string;
  type: "meeting" | "conference" | "huddle" | "workshop";
  equipment: string[];
  description: string;
};
