import { ExpressInterestForm } from "@/components/listings/express-interest-form";
import { ListingImage } from "@/components/listings/listing-image";
import { PageTransition } from "@/components/layout/page-transition";
import {
  ASSET_CLASS_LABELS,
  getDemoListings,
  getListingBySlug,
  isSupabaseConfigured,
} from "@/lib/listings";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const listing = isSupabaseConfigured()
    ? await getListingBySlug(slug)
    : getDemoListings().find((l) => l.slug === slug);
  return {
    title: listing?.title ?? "Listing",
    robots: { index: false, follow: false },
  };
}

export default async function ListingDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const listing = isSupabaseConfigured()
    ? await getListingBySlug(slug)
    : getDemoListings().find((l) => l.slug === slug);

  if (!listing) notFound();

  const sponsor = listing.sponsors;
  const minInvest =
    listing.minimum_investment ?? listing.target_equity * 0.01;

  const metrics = [
    ["Investment amount", formatCurrency(listing.investment_amount)],
    ["Target equity", formatCurrency(listing.target_equity)],
    ["Projected IRR", formatPercent(listing.projected_irr)],
    ["Minimum investment", formatCurrency(minInvest)],
  ] as const;

  return (
    <PageTransition>
      <section className="page-section !pt-8 sm:!pt-10">
        <div className="page-container min-w-0 stack-lg">
          <Link
            href="/listings"
            className="inline-flex py-1 text-sm text-muted hover:text-gold"
          >
            ← Back to listings
          </Link>

          <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="min-w-0 stack-lg lg:col-span-2">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-card-border bg-purple-surface">
                <ListingImage
                  assetClass={listing.asset_class}
                  title={listing.title}
                  width={1200}
                  height={514}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="stack-sm">
                <span className="inline-flex w-fit rounded-full bg-purple-muted px-4 py-1.5 text-xs font-medium text-purple-light">
                  {ASSET_CLASS_LABELS[listing.asset_class]}
                </span>
                <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  {listing.title}
                </h1>
                <p className="text-base text-muted sm:text-lg">
                  {listing.city}, {listing.state}
                </p>
              </div>

              {listing.description && (
                <div className="min-w-0 stack-sm">
                  <h2 className="text-lg font-semibold sm:text-xl">Overview</h2>
                  <p className="text-base leading-relaxed text-muted">
                    {listing.description}
                  </p>
                </div>
              )}

              <dl className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {metrics.map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-xl border border-card-border bg-card card-surface"
                  >
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="mt-2 text-xl font-semibold tabular-nums sm:text-2xl">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="min-w-0 lg:sticky lg:top-[4.5rem] lg:self-start">
              <div className="glass-purple panel-lg stack">
                {sponsor && (
                  <div className="border-b border-purple-light/20 pb-5 stack-sm">
                    <p className="text-sm text-muted">Listed by</p>
                    <p className="break-words text-lg font-semibold leading-snug">
                      {sponsor.name}
                      {sponsor.verified && (
                        <span className="ml-2 text-sm text-gold">Verified</span>
                      )}
                    </p>
                  </div>
                )}
                <div className="stack-sm">
                  <h2 className="text-lg font-semibold text-gold">Express interest</h2>
                  <p className="text-base leading-relaxed text-muted">
                    Connect with the sponsor—free for investors.
                  </p>
                  <ExpressInterestForm
                    listingId={listing.id}
                    listingTitle={listing.title}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
