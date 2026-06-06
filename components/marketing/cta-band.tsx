"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { LinkButton } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="page-section">
      <div className="page-container">
        <FadeIn>
          <div className="glass-purple panel-lg text-center stack">
            <div className="stack-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-gold sm:text-sm">
                Limited sponsor slots this quarter
              </p>
              <h2 className="mx-auto max-w-2xl text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">
                Don&apos;t miss investors already browsing your asset class
              </h2>
              <p className="mx-auto max-w-lg text-base leading-relaxed text-muted">
                Join 847+ investors. Free for LPs. Sponsor listings from $499.
              </p>
            </div>
            <div className="btn-group mx-auto w-full max-w-md sm:btn-group-row sm:max-w-none sm:justify-center">
              <LinkButton href="/login" variant="purple" fullWidth className="sm:min-w-[12rem]">
                Get free access
              </LinkButton>
              <LinkButton href="/coming-soon?feature=get-listed" variant="primary" fullWidth className="sm:min-w-[12rem]">
                List my opportunity
              </LinkButton>
            </div>
            <p className="text-sm text-muted">
              No credit card for investors · Sponsor plans billed at listing
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
