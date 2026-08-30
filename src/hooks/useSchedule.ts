import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import {
  ALL_ROOMS,
  DEFAULT_SCHEDULE_VIEW,
  SCHEDULE_VIEW_OPTIONS,
  shiftDate,
  stepForView,
  todayISO,
  type ScheduleControlsValue,
  type ScheduleView,
} from "@/components";
import { isISODate, readOption } from "@/lib";

const PARAM = {
  view: "view",
  date: "date",
  room: "room",
} as const;

export function useSchedule(today = todayISO()): ScheduleControlsValue {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = readOption(
    searchParams.get(PARAM.view),
    SCHEDULE_VIEW_OPTIONS,
    DEFAULT_SCHEDULE_VIEW,
  );

  const rawDate = searchParams.get(PARAM.date);
  const date = isISODate(rawDate) ? rawDate : today;
  const roomId = searchParams.get(PARAM.room) ?? ALL_ROOMS;

  const pendingParams = useRef(searchParams);

  useEffect(() => {
    pendingParams.current = searchParams;
  }, [searchParams]);

  function update(mutate: (params: URLSearchParams) => void) {
    const next = new URLSearchParams(pendingParams.current);
    mutate(next);
    pendingParams.current = next;
    setSearchParams(next, { replace: true });
  }

  function setParam(key: string, value: string, omitWhen: string) {
    update((params) => {
      if (value === omitWhen) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
  }

  function setView(value: ScheduleView) {
    setParam(PARAM.view, value, DEFAULT_SCHEDULE_VIEW);
  }

  function setDate(value: string) {
    setParam(PARAM.date, isISODate(value) ? value : today, today);
  }

  function setRoomId(value: string) {
    setParam(PARAM.room, value, ALL_ROOMS);
  }

  return {
    view,
    setView,
    date,
    setDate,
    roomId,
    setRoomId,
    goToPrevious: () => setDate(shiftDate(date, -stepForView(view))),
    goToNext: () => setDate(shiftDate(date, stepForView(view))),
    goToToday: () => setDate(today),
  };
}
