import { NavLink, Outlet } from "react-router";

function App() {
  return (
    <>
      <nav className="site-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
