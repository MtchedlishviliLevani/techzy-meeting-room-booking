import { useEffect, useState } from "react";
import { nowTime, todayISO } from "@/lib";

const TICK_MS = 15_000;

export function useNow() {
  const [clock, setClock] = useState(() => ({
    today: todayISO(),
    now: nowTime(),
  }));

  useEffect(() => {
    const id = setInterval(() => {
      const today = todayISO();
      const now = nowTime();

      setClock((current) =>
        current.today === today && current.now === now ? current : { today, now },
      );
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  return clock;
}
