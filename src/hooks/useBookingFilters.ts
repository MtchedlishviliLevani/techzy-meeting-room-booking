import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import {
  ALL_DATES,
  ALL_ORGANIZERS,
  ALL_ROOMS,
  ALL_STATUSES,
  BOOKING_DATE_OPTIONS,
  BOOKING_STATUS_OPTIONS,
  CUSTOM_DATE,
  type BookingDateFilter,
  type BookingFilterControls,
  type BookingStatusFilter,
} from "@/components";
import { readOption } from "@/lib";

const PARAM = {
  search: "q",
  status: "status",
  room: "room",
  organizer: "organizer",
  date: "date",
} as const;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function useBookingFilters(): BookingFilterControls {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(PARAM.search) ?? "";

  const status = readOption(
    searchParams.get(PARAM.status),
    BOOKING_STATUS_OPTIONS,
    ALL_STATUSES,
  );

  const roomId = searchParams.get(PARAM.room) ?? ALL_ROOMS;
  const organizerId = searchParams.get(PARAM.organizer) ?? ALL_ORGANIZERS;

  
  const rawDate = searchParams.get(PARAM.date) ?? "";
  const isCustomDate = ISO_DATE.test(rawDate);
  const dateRange = isCustomDate
    ? CUSTOM_DATE
    : readOption(rawDate, BOOKING_DATE_OPTIONS, ALL_DATES);
  const customDate = isCustomDate ? rawDate : "";

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

  function setSearch(value: string) {
    setParam(PARAM.search, value, "");
  }

  function setStatus(value: BookingStatusFilter) {
    setParam(PARAM.status, value, ALL_STATUSES);
  }

  function setRoomId(value: string) {
    setParam(PARAM.room, value, ALL_ROOMS);
  }

  function setOrganizerId(value: string) {
    setParam(PARAM.organizer, value, ALL_ORGANIZERS);
  }

  function setDateRange(value: BookingDateFilter) {
    setParam(PARAM.date, value, ALL_DATES);
  }

  function setCustomDate(value: string) {
    setParam(PARAM.date, value === "" ? CUSTOM_DATE : value, ALL_DATES);
  }

  function clearFilters() {
    update((params) => {
      Object.values(PARAM).forEach((key) => params.delete(key));
    });
  }

  return {
    search,
    setSearch,
    status,
    setStatus,
    roomId,
    setRoomId,
    organizerId,
    setOrganizerId,
    dateRange,
    setDateRange,
    customDate,
    setCustomDate,
    clearFilters,
  };
}
