/** True when `pathname` is `to` or nested under it; "/" matches exactly. */
export const isActivePath = (pathname: string, to: string) =>
  to === "/"
    ? pathname === "/"
    : pathname === to || pathname.startsWith(`${to}/`);
