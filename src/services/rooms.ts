import type { Room } from "./type";

export async function getRooms(signal?: AbortSignal) {
  const response = await fetch("/data/rooms.json", { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<Room[]>;
}
