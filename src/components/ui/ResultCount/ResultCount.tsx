import type { ResultCountProps } from "./type";

function ResultCount({
  count,
  total,
  noun,
  loading = false,
  loadingLabel = "Loading…",
  error = false,
  errorLabel = "Unavailable",
  className = "",
}: ResultCountProps) {
  return (
    <p aria-live="polite" className={`text-muted text-sm ${className}`}>
      {loading ? (
        loadingLabel
      ) : error ? (
        errorLabel
      ) : (
        <>
          <span className="text-ink font-medium">{count}</span>
          {count !== total && ` of ${total}`} {noun}
        </>
      )}
    </p>
  );
}

export default ResultCount;
