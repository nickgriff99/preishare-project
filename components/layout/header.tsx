"use client";

import { LinkButton } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/listings", label: "Listings" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <LinkButton href="/login" variant="ghost" className="!min-h-11 !px-4 !py-2.5">
              Sign in
            </LinkButton>
            <LinkButton href="/login" variant="purple" className="!min-h-11">
              Get access
            </LinkButton>
          </div>

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
            <div className="btn-group border-t border-card-border pt-6">
              <LinkButton href="/login" variant="ghost" fullWidth>
                Sign in
              </LinkButton>
              <LinkButton href="/login" variant="purple" fullWidth>
                Get free access
              </LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
