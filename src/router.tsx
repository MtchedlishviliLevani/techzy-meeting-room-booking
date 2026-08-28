import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Bookings from "./pages/Bookings.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import Rooms from "./pages/Rooms.tsx";
import Schedule from "./pages/Schedule.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: Dashboard },
      { path: "/rooms", Component: Rooms },
      { path: "/schedule", Component: Schedule },
      { path: "/bookings", Component: Bookings },
      { path: "*", Component: NotFound },
    ],
  },
]);
