import { createContext } from "react";
import type { BookingsContextValue } from "./type";

export const BookingsContext = createContext<BookingsContextValue | null>(null);
