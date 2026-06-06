export default function ListingsLoading() {
  return (
    <div className="page-container page-section min-w-0 !pt-8 sm:!pt-10">
      <div className="stack-lg">
        <div className="stack-sm">
          <div className="h-9 w-48 max-w-full animate-pulse rounded-xl bg-card sm:h-10 sm:w-64" />
          <div className="h-4 w-full max-w-md animate-pulse rounded bg-card" />
        </div>
        <div className="card-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-72 min-w-0 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      </div>
    </div>
  );
}
