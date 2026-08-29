import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, Search, X } from "lucide-react";
import { TechzyLogo } from "../TechzyLogo";
import { Avatar } from "../Avatar";
import { isActivePath } from "@/lib";
import type { ActionItem, NavbarProps } from "./type";
import { NAV_ITEMS } from "./data";

const ACTIONS: ActionItem[] = [{ label: "Search", icon: Search }];

const NAV_LINK_CLASS = {
  active: "bg-header-accent text-header font-medium",
  inactive: "text-header-accent hover:bg-header-accent/15 hover:text-surface",
};

function Navbar({
  navItems = NAV_ITEMS,
  actions = ACTIONS,
  userName = "Levan M.",
  avatarSrc,
}: NavbarProps) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-3 sm:gap-6">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <TechzyLogo
            variant="mark"
            className="text-surface h-6 w-auto sm:hidden"
          />
          <TechzyLogo className="text-surface hidden h-6 w-auto sm:block" />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={
                isActivePath(pathname, item.to) ? "page" : undefined
              }
              className={`rounded-full px-3 py-2 text-sm transition-colors duration-200 lg:px-4 ${
                isActivePath(pathname, item.to)
                  ? NAV_LINK_CLASS.active
                  : NAV_LINK_CLASS.inactive
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
          {actions.map(({ label, icon: Icon, onClick }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={onClick}
              className={`hidden sm:inline-flex items-center justify-center rounded-full bg-header-accent/15 p-2 text-header-accent transition-colors duration-200 hover:bg-header-accent/30 hover:text-surface sm:p-2.5`}
            >
              <Icon className="size-4 sm:size-5" strokeWidth={2} />
            </button>
          ))}

          <Avatar
            src={avatarSrc}
            userName={userName}
            className="size-9 sm:size-10"
          />

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex md:hidden items-center justify-center rounded-full bg-header-accent/15 p-2 text-header-accent transition-colors duration-200 hover:bg-header-accent/30 hover:text-surface sm:p-2.5`}
          >
            {menuOpen ? (
              <X className="size-5" strokeWidth={2} />
            ) : (
              <Menu className="size-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-header-accent/20 mt-3 border-t pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={
                  isActivePath(pathname, item.to) ? "page" : undefined
                }
                onClick={() => setMenuOpen(false)}
                className={`rounded-full px-4 py-2.5 text-sm transition-colors duration-200 ${
                  isActivePath(pathname, item.to)
                    ? NAV_LINK_CLASS.active
                    : NAV_LINK_CLASS.inactive
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 flex items-center gap-2 sm:hidden">
            {actions.map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={onClick}
                className={`inline-flex items-center justify-center rounded-full bg-header-accent/15 p-2 text-header-accent transition-colors duration-200 hover:bg-header-accent/30 hover:text-surface sm:p-2.5`}
              >
                <Icon className="size-5" strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
