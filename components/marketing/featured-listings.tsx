"use client";

import { AmbientBackground } from "@/components/layout/ambient-background";
import { ListingCard } from "@/components/listings/listing-card";
import { FadeIn } from "@/components/motion/fade-in";
import { LinkButton } from "@/components/ui/button";
import type { Listing } from "@/types/database";

type FeaturedListingsProps = {
  listings: Listing[];
};

export function FeaturedListings({ listings }: FeaturedListingsProps) {
  return (
    <section className="page-section relative isolate overflow-hidden">
      <AmbientBackground variant="section" />
      <div className="relative z-10 page-container stack-lg">
        <FadeIn className="section-header">
          <div className="min-w-0 stack-sm">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              Featured <span className="text-gold">opportunities</span>
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Sign in free to express interest and contact sponsors directly.
            </p>
          </div>
          <LinkButton href="/login" variant="purple" className="w-full md:w-auto md:shrink-0">
            Unlock all listings
          </LinkButton>
        </FadeIn>

        <div className="card-grid card-grid-balanced">
          {listings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        <FadeIn className="callout border border-purple-light/25 bg-purple-muted/40">
          <p className="min-w-0 flex-1 text-base leading-relaxed">
            <span className="font-semibold text-gold">Investors: </span>
            <span className="text-muted">
              Free account unlocks the full catalog and interest submissions.
            </span>
          </p>
          <LinkButton href="/login" className="w-full shrink-0 sm:w-auto">
            Create free account
          </LinkButton>
        </FadeIn>
      </div>
    </section>
  );
}
