"use client";

import { useState } from "react";

export function DemoBanner() {
  const showDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const [dismissed, setDismissed] = useState(false);

  if (!showDemo || dismissed) return null;

  return (
    <div
      role="status"
      className="border-b border-gold/30 bg-gold/10 px-4 py-2.5 text-center text-sm text-foreground"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <strong className="text-gold">Portfolio demo</strong>
        <span className="text-muted">
          Independent redesign concept — not affiliated with{" "}
          <a
            href="https://thelistinghub.com/"
            className="text-purple-light underline-offset-2 hover:text-gold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            thelistinghub.com
          </a>
          . Stripe test mode only — use card{" "}
          <code className="rounded bg-background/60 px-1.5 py-0.5 text-xs">4242 4242 4242 4242</code>.
        </span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="ml-1 rounded-lg px-2 py-1 text-xs text-muted hover:bg-background/40 hover:text-foreground"
          aria-label="Dismiss demo banner"
        >
          Dismiss
        </button>
      </span>
    </div>
  );
}
