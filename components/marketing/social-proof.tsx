"use client";

import { CountUp } from "@/components/motion/count-up";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

const stats = [
  { label: "Active listings", value: 120, suffix: "+", prefix: "", decimals: 0 },
  { label: "Verified sponsors", value: 85, suffix: "+", prefix: "", decimals: 0 },
  { label: "Investors", value: 847, suffix: "+", prefix: "", decimals: 0 },
  { label: "Capital marketed", value: 2.4, suffix: "B", prefix: "$", decimals: 1 },
];

export function SocialProof() {
  return (
    <section className="relative isolate overflow-hidden border-y border-card-border bg-purple-muted/20 py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(91,33,182,0.18),transparent)]"
      />
      <div className="relative z-10 page-container stack">
        <FadeIn className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-purple-light">
            Trusted by CRE investors nationwide
          </p>
        </FadeIn>
        <StaggerChildren className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="min-w-0 text-center stack-sm">
              <p className="text-2xl font-bold tabular-nums text-gold sm:text-3xl lg:text-4xl">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="text-sm leading-snug text-muted">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
