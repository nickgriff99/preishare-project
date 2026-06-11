"use client";

import { updateProfile } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import type { Database } from "@/types/database";
import { motion } from "framer-motion";
import { useState } from "react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const roleLabels: Record<Profile["role"], string> = {
  investor: "Investor",
  sponsor: "Sponsor",
  admin: "Admin",
};

export function AccountForm({ profile, email }: { profile: Profile; email: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setError(result.error ?? "Failed to update profile");
    }
  }

  return (
    <div className="stack-lg">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
          {roleLabels[profile.role]}
        </span>
        <p className="text-sm text-muted">{email}</p>
      </div>

      <form onSubmit={handleSubmit} className="stack">
        <div>
          <label htmlFor="display_name" className="text-sm text-muted">
            Display name
          </label>
          <input
            id="display_name"
            name="display_name"
            required
            defaultValue={profile.display_name ?? ""}
            className="form-field"
          />
        </div>
        <div>
          <label htmlFor="company_name" className="text-sm text-muted">
            Company
          </label>
          <input
            id="company_name"
            name="company_name"
            defaultValue={profile.company_name ?? ""}
            className="form-field"
          />
        </div>
        <div>
          <label htmlFor="title" className="text-sm text-muted">
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={profile.title ?? ""}
            className="form-field"
          />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-success"
          >
            Profile updated.
          </motion.p>
        )}
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
