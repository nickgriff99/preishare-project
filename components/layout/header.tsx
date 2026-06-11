"use client";

import { LinkButton } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/listings", label: "Listings" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

function getUserLabel(user: User) {
  return (
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "Account"
  );
}

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(() => {
    if (typeof window === "undefined") return false;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return !url || url.includes("your-project");
  });

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const configured = url && !url.includes("your-project");
    if (!configured) {
      return;
    }

    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  }

  const authButtons = !authReady ? (
    <div className="hidden h-11 w-32 animate-pulse rounded-xl bg-card lg:block" />
  ) : user ? (
    <>
      <Link
        href="/account"
        className="hidden max-w-[10rem] truncate text-sm text-muted transition-colors hover:text-gold lg:inline"
      >
        {getUserLabel(user)}
      </Link>
      <LinkButton href="/listings" variant="ghost" className="!min-h-11 !px-4 !py-2.5">
        Listings
      </LinkButton>
      <button
        type="button"
        onClick={handleSignOut}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-card-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-gold/40 hover:text-foreground"
      >
        Sign out
      </button>
    </>
  ) : (
    <>
      <LinkButton href="/login" variant="ghost" className="!min-h-11 !px-4 !py-2.5">
        Sign in
      </LinkButton>
      <LinkButton href="/login" variant="purple" className="!min-h-11">
        Get access
      </LinkButton>
    </>
  );

  const mobileAuthButtons = !authReady ? null : user ? (
    <div className="btn-group border-t border-card-border pt-6">
      <LinkButton href="/account" variant="ghost" fullWidth onClick={() => setMobileOpen(false)}>
        {getUserLabel(user)}
      </LinkButton>
      <LinkButton href="/listings" variant="secondary" fullWidth onClick={() => setMobileOpen(false)}>
        Browse listings
      </LinkButton>
      <button
        type="button"
        onClick={handleSignOut}
        className={cn(
          "inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-card-border px-4 py-2.5 text-sm font-medium text-muted",
        )}
      >
        Sign out
      </button>
    </div>
  ) : (
    <div className="btn-group border-t border-card-border pt-6">
      <LinkButton href="/login" variant="ghost" fullWidth>
        Sign in
      </LinkButton>
      <LinkButton href="/login" variant="purple" fullWidth>
        Get free access
      </LinkButton>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full min-w-0 border-b border-card-border/40 bg-background/90 backdrop-blur-md">
      <div className="page-container">
        <div className="flex h-16 min-w-0 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <span className="gradient-purple-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white sm:h-11 sm:w-11">
              TL
            </span>
            <span className="truncate text-base font-semibold sm:text-lg">
              TheListing<span className="text-gold">Hub</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">{authButtons}</div>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-foreground lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-card-border bg-background lg:hidden">
          <nav className="page-container stack py-6" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-lg text-muted hover:text-gold"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {mobileAuthButtons}
          </nav>
        </div>
      )}
    </header>
  );
}
