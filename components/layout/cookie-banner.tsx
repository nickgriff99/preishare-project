"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "tlh-cookie-consent";

function hasConsentChoice() {
  if (typeof window === "undefined") return true;
  return Boolean(localStorage.getItem(CONSENT_KEY));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasConsentChoice()) return;
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.setAttribute("data-cookie-visible", "true");
    } else {
      document.body.removeAttribute("data-cookie-visible");
    }
    return () => document.body.removeAttribute("data-cookie-visible");
  }, [visible]);

  function closeBanner(choice: "essential" | "all" | "dismissed") {
    localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          className="cookie-dock fixed z-50"
        >
          <div className="glass panel-lg relative shadow-2xl">
            <button
              type="button"
              onClick={() => closeBanner("dismissed")}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-purple-muted/60 hover:text-foreground"
              aria-label="Close cookie notice"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="pr-10 text-lg font-semibold leading-snug">This site uses cookies</h3>
            <p className="mt-4 pr-2 text-sm leading-relaxed text-muted">
              We use cookies to improve your experience. See our{" "}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="btn-group mt-6">
              <Button variant="secondary" fullWidth onClick={() => closeBanner("essential")}>
                Essential only
              </Button>
              <Button fullWidth onClick={() => closeBanner("all")}>
                Accept cookies
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
