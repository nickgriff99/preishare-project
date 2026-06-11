"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Tab = "signin" | "signup";

export function AuthForm() {
  const [tab, setTab] = useState<Tab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/listings";
  const authError = searchParams.get("error");

  const supabaseConfigured =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseConfigured) {
      setError("Supabase is not configured. Add credentials to .env.local.");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    const supabase = createClient();

    if (tab === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
        },
      });
      if (signUpError) setError(signUpError.message);
      else setMessage("Check your email to confirm your account.");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) setError(signInError.message);
      else {
        router.push(redirect);
        router.refresh();
      }
    }
    setLoading(false);
  }

  async function handleGoogle() {
    if (!supabaseConfigured) {
      setError("Supabase is not configured. Add credentials to .env.local.");
      return;
    }
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });
    if (oauthError) setError(oauthError.message);
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-md stack-lg">
      <header className="text-center stack-sm">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
          Get <span className="text-gold">free</span> investor access
        </h1>
        <p className="text-base leading-relaxed text-muted">
          Sign in or create an account—unlock every listing and express interest.
        </p>
      </header>

      <div className="glass-purple panel-lg w-full min-w-0 stack">
        <div className="flex min-w-0 rounded-xl bg-purple-surface p-1.5">
          {(["signin", "signup"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "min-h-11 flex-1 rounded-lg px-3 text-sm font-medium transition-colors",
                tab === t ? "bg-gold text-purple-deep" : "text-muted hover:text-foreground",
              )}
            >
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleGoogle}
          disabled={loading}
          fullWidth
        >
          Continue with Google
        </Button>

        <p className="relative py-2 text-center text-xs text-muted">
          <span className="bg-transparent px-3">OR EMAIL</span>
        </p>

        <AnimatePresence mode="wait">
          <motion.form
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleEmailAuth}
            className="stack"
          >
            <div>
              <label htmlFor="email" className="text-sm text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-field"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-muted">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-field"
              />
            </div>
            {(error || authError) && (
              <p className="text-sm text-danger">
                {error ?? "Authentication failed. Please try again."}
              </p>
            )}
            {message && <p className="text-sm text-success">{message}</p>}
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
}
