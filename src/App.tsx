import { Outlet } from "react-router";
import { BookingsProvider } from "@/context";
import { Header } from "./components";

function AppShell() {
  return (
    <div className="min-h-screen px-3 py-3 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
      <Header />
      <main className="mt-4 sm:mt-6">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BookingsProvider>
      <AppShell />
    </BookingsProvider>
  );
}

export default App;
