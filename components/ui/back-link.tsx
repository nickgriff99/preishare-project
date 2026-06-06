"use client";

export function BackLink() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex min-h-12 w-full max-w-full items-center justify-center rounded-xl border border-card-border px-6 py-3 text-sm font-medium transition-colors hover:border-gold/40 sm:w-auto sm:min-w-[10rem]"
    >
      Go Back
    </button>
  );
}
