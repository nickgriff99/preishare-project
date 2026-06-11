"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import Link from "next/link";

const hubs = [
  {
    title: "Sponsor Profiles",
    description: "Explore verified sponsor profiles behind each opportunity.",
    href: "/coming-soon?feature=sponsor-profiles",
    icon: "👤",
    cta: "View sponsors",
  },
  {
    title: "Listings",
    description: "Browse active passive CRE investment opportunities.",
    href: "/listings",
    icon: "📋",
    cta: "Browse now — free",
    highlight: true,
  },
  {
    title: "Get Listed",
    description: "Submit your opportunity and reach qualified investors.",
    href: "/get-listed",
    icon: "📈",
    cta: "From $499",
    sell: true,
  },
  {
    title: "Sponsor Application",
    description: "Apply to create a sponsor profile and showcase your track record.",
    href: "/coming-soon?feature=sponsor-application",
    icon: "✓",
    cta: "Apply today",
  },
  {
    title: "Contact Us",
    description: "Connect with our team for support or next steps.",
    href: "/contact",
    icon: "✉",
    cta: "Talk to sales",
  },
];

export function HubGrid() {
  return (
    <section className="page-section border-t border-card-border bg-purple-deep/40">
      <div className="page-container stack-lg">
        <FadeIn className="mx-auto max-w-2xl text-center stack-sm">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Everything you need to{" "}
            <span className="gradient-text-brand">close your next deal</span>
          </h2>
          <p className="text-base leading-relaxed text-muted">
            One hub for investors and sponsors in syndicated private equity CRE
          </p>
        </FadeIn>

        <StaggerChildren className="hub-grid-3-2">
          {hubs.map((hub) => (
            <StaggerItem key={hub.title} className="h-full">
              <Link href={hub.href} className="hover-card block h-full min-w-0">
                <div
                  className={cn(
                    "relative flex h-full min-w-0 flex-col rounded-2xl border card-surface",
                    hub.highlight
                      ? "border-gold/40 bg-gradient-to-br from-purple-muted/50 to-card"
                      : hub.sell
                        ? "border-purple-light/30 bg-card"
                        : "border-card-border bg-card",
                  )}
                >
                  {hub.sell && (
                    <span className="absolute right-5 top-5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold text-purple-deep">
                      PAID
                    </span>
                  )}
                  <span className="text-2xl" aria-hidden>
                    {hub.icon}
                  </span>
                  <h3 className={cn("mt-5 text-xl font-semibold leading-snug", hub.sell && "pr-16")}>
                    {hub.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                    {hub.description}
                  </p>
                  <span className="mt-6 text-sm font-medium text-purple-light sm:text-base">
                    {hub.cta} →
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
