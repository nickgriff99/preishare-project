"use client";

import { startListingCheckout } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function GetListedForm() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "1";
  const [listingTitle, setListingTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const title = listingTitle.trim() || "Untitled listing";
    const result = await startListingCheckout(
      description.trim() ? `${title} — ${description.trim()}` : title,
    );

    if (result.success) {
      window.location.href = result.url;
      return;
    }

    setStatus("error");
    setError(result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      {canceled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-muted"
        >
          Checkout was canceled. You can try again when you&apos;re ready.
        </motion.div>
      )}

      <div>
        <label htmlFor="listingTitle" className="text-sm text-muted">
          Deal title
        </label>
        <input
          id="listingTitle"
          required
          minLength={3}
          maxLength={200}
          value={listingTitle}
          onChange={(e) => setListingTitle(e.target.value)}
          placeholder="e.g. 240-Unit Multifamily — Austin, TX"
          className="form-field"
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm text-muted">
          Short description <span className="text-muted/70">(optional)</span>
        </label>
        <textarea
          id="description"
          rows={4}
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Asset class, target raise, or key highlights for investors."
          className="form-field"
        />
      </div>

      <div className="rounded-xl border border-card-border bg-purple-surface/50 px-4 py-3">
        <p className="text-sm font-medium">Sponsor Listing — $499</p>
        <p className="mt-1 text-sm text-muted">
          30-day listing visibility, featured hub placement, and lead notifications.
        </p>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button type="submit" variant="purple" fullWidth disabled={status === "loading"}>
        {status === "loading" ? "Redirecting to checkout..." : "Pay $499 — Continue to Stripe"}
      </Button>

      <p className="text-center text-xs text-muted">
        Secure payment via Stripe. Use test card 4242 4242 4242 4242 in test mode.
      </p>
    </form>
  );
}
