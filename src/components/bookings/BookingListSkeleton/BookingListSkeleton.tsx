import type { BookingListSkeletonProps } from "./type";

const PLACEHOLDER = "bg-raised border-border animate-pulse rounded-2xl border";

function BookingListSkeleton({
  count = 6,
  className = "",
}: BookingListSkeletonProps) {
  return (
    <div aria-hidden="true" className={className}>
      <div className={`${PLACEHOLDER} hidden h-96 lg:block`} />

      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:hidden">
        {Array.from({ length: count }, (_, index) => (
          <li key={index} className={`${PLACEHOLDER} h-48`} />
        ))}
      </ul>
    </div>
  );
}

export default BookingListSkeleton;
