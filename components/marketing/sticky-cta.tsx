"use client";

import { LinkButton } from "@/components/ui/button";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 400);
  });

  useEffect(() => {
    if (visible) {
      document.body.setAttribute("data-dock", "sticky-cta");
    } else {
      document.body.removeAttribute("data-dock");
    }
    return () => document.body.removeAttribute("data-dock");
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-purple-light/20 bg-purple-deep sm:hidden"
          aria-label="Quick sign up"
        >
          <div className="page-container flex flex-col gap-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug text-gold">
                Unlock full access
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted">
                Free · All listings
              </p>
            </div>
            <LinkButton href="/login" fullWidth className="!min-h-11">
              Get access
            </LinkButton>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
