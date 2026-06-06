"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-container flex min-h-[50vh] min-w-0 flex-col items-center justify-center py-20 text-center sm:py-24">
      <div className="stack max-w-md">
        <h1 className="text-balance text-xl font-bold sm:text-2xl">Something went wrong</h1>
        <p className="text-base leading-relaxed text-muted">
          We encountered an unexpected error. Please try again.
        </p>
        <Button className="mx-auto" onClick={reset}>
          Try again
        </Button>
      </div>
    </section>
  );
}
