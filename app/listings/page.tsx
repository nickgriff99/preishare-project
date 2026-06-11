import { ListingsFilters } from "@/components/listings/listings-filters";
import { ListingCard } from "@/components/listings/listing-card";
import { PageTransition } from "@/components/layout/page-transition";
import { LinkButton } from "@/components/ui/button";
import {
  getDemoListings,
  getPublishedListings,
  isSupabaseConfigured,
} from "@/lib/listings";
import type { AssetClass } from "@/types/database";
import { Suspense } from "react";

export const metadata = {
  title: "Listings",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{
  asset?: string;
  state?: string;
  q?: string;
}>;

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filters = {
    assetClass: params.asset as AssetClass | undefined,
    state: params.state,
    search: params.q,
  };

  let listings = isSupabaseConfigured()
    ? await getPublishedListings(filters)
    : getDemoListings();

  if (filters.assetClass) {
    listings = listings.filter((l) => l.asset_class === filters.assetClass);
  }
  if (filters.state) {
    listings = listings.filter(
      (l) => l.state.toUpperCase() === filters.state!.toUpperCase(),
    );
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    listings = listings.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q),
    );
  }

  return (
    <PageTransition>
      <section className="page-section !pt-8 sm:!pt-10">
        <div className="page-container stack-lg">
          <header className="min-w-0 stack-sm">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              Investment Listings
            </h1>
            <p className="text-base leading-relaxed text-muted">
              Browse active passive CRE opportunities from verified sponsors
            </p>
          </header>

          <div className="callout border border-gold/30 bg-purple-muted/40">
            <p className="min-w-0 flex-1 text-base leading-relaxed">
              <strong className="text-gold">You&apos;re in.</strong>{" "}
              <span className="text-muted">Express interest on any deal, or </span>
              <a href="/pricing" className="text-purple-light hover:text-gold">
                list your raise
              </a>
              <span className="text-muted"> from $499.</span>
            </p>
            <LinkButton
              href="/get-listed"
              className="w-full shrink-0 sm:w-auto"
            >
              Get listed
            </LinkButton>
          </div>

          <Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-card" />}>
            <ListingsFilters />
          </Suspense>

          {listings.length === 0 ? (
            <p className="py-16 text-center text-base text-muted">
              No listings match your filters.
            </p>
          ) : (
            <div className="card-grid card-grid-balanced">
              {listings.map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
