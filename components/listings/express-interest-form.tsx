"use client";

import { expressInterest } from "@/app/actions/listings";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ExpressInterestFormProps = {
  listingId: string;
  listingTitle: string;
};

export function ExpressInterestForm({
  listingId,
  listingTitle,
}: ExpressInterestFormProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    const result = await expressInterest(listingId, message || undefined);
    if (result.success) {
      setStatus("success");
      setMessage("");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="panel rounded-xl border border-success/30 bg-success/10 text-sm leading-relaxed text-success">
        Interest recorded for {listingTitle}. The sponsor will be notified.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 stack">
      <div className="min-w-0">
        <label htmlFor="interest-message" className="text-sm text-muted">
          Message (optional)
        </label>
        <textarea
          id="interest-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell the sponsor about your investment criteria..."
          className="form-field"
        />
      </div>
      {errorMsg && <p className="text-sm text-danger">{errorMsg}</p>}
      <Button type="submit" disabled={status === "loading"} fullWidth>
        {status === "loading" ? "Submitting..." : "Express interest"}
      </Button>
    </form>
  );
}
