import { useState, useEffect } from "react";
import { getRooms, type Room } from "../services";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getRooms(controller.signal)
      .then((data) => {
        setRooms(data);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err : new Error("Failed to load rooms"),
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { rooms, loading, error };
}
