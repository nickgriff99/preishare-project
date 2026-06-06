"use client";

import { PricingCarousel } from "@/components/marketing/pricing-carousel";
import { FadeIn } from "@/components/motion/fade-in";
import { PRICING_CAROUSEL_PLANS } from "@/lib/pricing-plans";

export function PricingSection() {
  return (
    <section id="pricing" className="page-section overflow-visible scroll-mt-24">
      <div className="page-container stack stack-xl overflow-visible">
        <FadeIn className="mx-auto max-w-3xl text-center stack stack-sm">
          <p className="text-sm font-medium uppercase tracking-wider text-purple-light">
            Simple, transparent pricing
          </p>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Start free. <span className="gradient-text-brand">Scale when ready.</span>
          </h2>
          <p className="text-base leading-relaxed text-muted">
            Investors browse at no cost. Sponsors pay when ready to raise capital.
          </p>
        </FadeIn>

        <FadeIn className="min-w-0 overflow-visible py-2 sm:py-4">
          <PricingCarousel plans={PRICING_CAROUSEL_PLANS} />
        </FadeIn>

        <FadeIn className="text-center text-base text-muted">
          All sponsor plans include verified profile setup.{" "}
          <a href="/contact" className="text-gold hover:underline">
            Contact sales
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
