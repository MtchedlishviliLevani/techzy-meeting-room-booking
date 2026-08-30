import { Navbar } from "../ui/Navbar";
import type { HeaderProps } from "./type";

function Header(props: HeaderProps) {
  return (
    <header className="bg-header text-surface rounded-2xl border border-header-accent/20 px-4 py-3 shadow-sm sm:rounded-3xl sm:px-6 sm:py-4 lg:px-8">
      <Navbar {...props} />
    </header>
  );
}

export default Header;
