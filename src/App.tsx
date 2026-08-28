import { Outlet } from "react-router";
import { Header } from "./components";

function App() {
  return (
    <div className="min-h-screen px-3 py-3 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
      <Header />
      <main className="mt-4 sm:mt-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
