"use client";

import { AmbientBackground } from "@/components/layout/ambient-background";
import { PortfolioMock } from "@/components/marketing/portfolio-mock";
import { FadeIn } from "@/components/motion/fade-in";
import { LinkButton } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const bullets = [
  "Buy, sell passive CRE investments",
  "Market your CRE syndicated capital raise",
  "Connect with new LPs and GPs",
  "Get notified of latest CRE opportunities",
  "Connect with funds",
  "Learn from leaders in syndicated private equity CRE",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [ambientOpacity, setAmbientOpacity] = useState(1);

  useEffect(() => {
    const updateOpacity = () => {
      const heroHeight = sectionRef.current?.offsetHeight ?? 900;
      const fadeDistance = Math.min(heroHeight * 0.5, 480);
      const progress = Math.min(window.scrollY / fadeDistance, 1);
      setAmbientOpacity(1 - progress);
    };

    updateOpacity();
    window.addEventListener("scroll", updateOpacity, { passive: true });
    window.addEventListener("resize", updateOpacity);

    return () => {
      window.removeEventListener("scroll", updateOpacity);
      window.removeEventListener("resize", updateOpacity);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="gradient-hero hero-fade-bottom relative isolate overflow-hidden"
    >
      <AmbientBackground variant="hero" opacity={ambientOpacity} />

      <div className="relative z-10 page-container page-section-tight !pb-16 sm:!pb-20">
        <div className="grid min-w-0 grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
          <div className="stack stack-xl min-w-0">
            <FadeIn>
              <p className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-purple-light/30 bg-purple-muted px-4 py-2 text-xs font-medium text-purple-light sm:text-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                120+ active CRE opportunities
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="stack stack-sm">
                <p className="text-xs font-medium uppercase tracking-widest text-gold sm:text-sm">
                  Investment Classifieds
                </p>
                <h1 className="text-[1.875rem] font-bold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                  BUY. SELL. <span className="gradient-text-brand">RAISE.</span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
                  The marketplace where LPs find passive CRE deals and GPs fill syndications
                  faster. Create a free account to access every listing.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ul className="bullet-list text-sm sm:text-base">
                {bullets.map((item) => (
                  <li key={item}>
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <span className="min-w-0 flex-1 text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="btn-group sm:btn-group-row">
                <LinkButton href="/login" variant="purple" fullWidth className="sm:min-w-[14rem]">
                  Get free investor access
                </LinkButton>
                <LinkButton
                  href="/get-listed"
                  variant="outline"
                  fullWidth
                  className="sm:min-w-[14rem]"
                >
                  List your deal — from $499
                </LinkButton>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="link-group text-sm sm:text-base">
                <Link href="/login" className="text-purple-light hover:text-gold hover:underline">
                  Sign in to browse every listing
                </Link>
                <Link href="#pricing" className="text-muted hover:text-gold">
                  See pricing
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="min-w-0 w-full pt-2 lg:pt-0">
            <PortfolioMock />
          </div>
        </div>
      </div>
    </section>
  );
}
