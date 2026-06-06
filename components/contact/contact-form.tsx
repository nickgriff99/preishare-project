"use client";

import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);
    if (result.success) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setError(result.error ?? "Failed to send message");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="panel rounded-xl border border-success/30 bg-success/10 text-center stack-sm"
      >
        <p className="text-lg font-medium text-success">Message sent!</p>
        <p className="text-base leading-relaxed text-muted">
          We&apos;ll get back to you soon. You can also email{" "}
          <a href="mailto:support@thelistinghub.com" className="break-all text-gold">
            support@thelistinghub.com
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 stack">
      <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="name" className="text-sm text-muted">
            Name
          </label>
          <input id="name" name="name" required className="form-field" />
        </div>
        <div className="min-w-0">
          <label htmlFor="email" className="text-sm text-muted">
            Email
          </label>
          <input id="email" name="email" type="email" required className="form-field" />
        </div>
      </div>
      <div className="min-w-0">
        <label htmlFor="subject" className="text-sm text-muted">
          Subject
        </label>
        <input id="subject" name="subject" className="form-field" />
      </div>
      <div className="min-w-0">
        <label htmlFor="message" className="text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={10}
          className="form-field"
        />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <Button type="submit" disabled={status === "loading"} fullWidth>
        {status === "loading" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
