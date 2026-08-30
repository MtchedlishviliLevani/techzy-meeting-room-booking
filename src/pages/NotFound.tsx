import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { Compass } from "lucide-react";
import { EmptyState, buttonClass } from "@/components/ui";

const NOT_FOUND = 404;

function NotFound() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : NOT_FOUND;
  const isMissing = status === NOT_FOUND;

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-3 py-8">
      <EmptyState
        icon={Compass}
        title={isMissing ? "Page not found" : `Something went wrong (${status})`}
        description={
          isMissing
            ? "That page doesn't exist. It may have been moved, or the link might be out of date."
            : "An unexpected error stopped this page from loading. Head back to the dashboard and try again."
        }
        action={
          <Link to="/" className={buttonClass()}>
            Go to Dashboard
          </Link>
        }
        className="w-full max-w-md"
      />
    </section>
  );
}

export default NotFound;
