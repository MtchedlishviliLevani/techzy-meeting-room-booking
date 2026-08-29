import type { AvatarProps } from "./type";

const AVATAR_CLASS = "shrink-0 rounded-full border border-header-accent/60";

const toInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Avatar({ src, userName, className = "" }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={userName}
        className={`${AVATAR_CLASS} ${className} object-cover`}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={userName}
      title={userName}
      className={`${AVATAR_CLASS} ${className} bg-success text-surface inline-flex items-center justify-center text-xs font-semibold sm:text-sm`}
    >
      {toInitials(userName)}
    </span>
  );
}

export default Avatar;
