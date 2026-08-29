import { useState, useEffect } from "react";
import { getEmployees, type Employee } from "../services";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getEmployees(controller.signal)
      .then((data) => {
        setEmployees(data);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err : new Error("Failed to load employees"),
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { employees, loading, error };
}
