import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import {
  ALL_AVAILABILITY,
  ALL_ROOM_TYPES,
  ANY_CAPACITY,
  AVAILABILITY_OPTIONS,
  CAPACITY_OPTIONS,
  EQUIPMENT_OPTIONS,
  ROOM_TYPE_OPTIONS,
  type AvailabilityFilter,
  type CapacityFilter,
  type EquipmentFilter,
  type RoomTypeFilter,
} from "@/components";
import { readOption } from "@/lib";

const PARAM = {
  search: "q",
  capacity: "capacity",
  roomType: "type",
  availability: "availability",
  equipment: "equipment",
} as const;

export function useRoomFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(PARAM.search) ?? "";
  const capacity = readOption(
    searchParams.get(PARAM.capacity),
    CAPACITY_OPTIONS,
    ANY_CAPACITY,
  );
  const roomType = readOption(
    searchParams.get(PARAM.roomType),
    ROOM_TYPE_OPTIONS,
    ALL_ROOM_TYPES,
  );
  const availability = readOption(
    searchParams.get(PARAM.availability),
    AVAILABILITY_OPTIONS,
    ALL_AVAILABILITY,
  );

  const selectedEquipment = searchParams.getAll(PARAM.equipment);
  const equipment = EQUIPMENT_OPTIONS.filter((option) =>
    selectedEquipment.includes(option.value),
  ).map((option) => option.value);

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

  function setCapacity(value: CapacityFilter) {
    setParam(PARAM.capacity, value, ANY_CAPACITY);
  }

  function setRoomType(value: RoomTypeFilter) {
    setParam(PARAM.roomType, value, ALL_ROOM_TYPES);
  }

  function setAvailability(value: AvailabilityFilter) {
    setParam(PARAM.availability, value, ALL_AVAILABILITY);
  }

  function toggleEquipment(name: EquipmentFilter) {
    update((params) => {
      const current = params
        .getAll(PARAM.equipment)
        .filter((item) =>
          EQUIPMENT_OPTIONS.some(({ value }) => value === item),
        );
      const next = current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name];

      params.delete(PARAM.equipment);
      next.forEach((item) => params.append(PARAM.equipment, item));
    });
  }

  function clearFilters() {
    update((params) => {
      Object.values(PARAM).forEach((key) => params.delete(key));
    });
  }

  return {
    search,
    setSearch,
    capacity,
    setCapacity,
    roomType,
    setRoomType,
    availability,
    setAvailability,
    equipment,
    toggleEquipment,
    clearFilters,
  };
}
