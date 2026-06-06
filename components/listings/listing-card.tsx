"use client";

import { ListingImage } from "@/components/listings/listing-image";
import { ASSET_CLASS_LABELS } from "@/lib/listing-constants";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import type { Listing } from "@/types/database";
import { motion } from "framer-motion";
import Link from "next/link";

type ListingCardProps = {
  listing: Listing;
  className?: string;
  index?: number;
};

function MetricRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-1">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className={cn("text-right text-sm font-medium tabular-nums sm:text-base", valueClassName)}>
        {value}
      </dd>
    </div>
  );
}

export function ListingCard({ listing, className, index = 0 }: ListingCardProps) {
  const sponsor = listing.sponsors;
  const minInvest = listing.minimum_investment ?? listing.target_equity * 0.01;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -24px 0px" }}
      transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.35 }}
      className={cn("h-full min-w-0", className)}
    >
      <Link
        href={`/listings/${listing.slug}`}
        className="hover-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-card-border bg-card"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 bg-purple-surface">
          <ListingImage
            assetClass={listing.asset_class}
            title={listing.title}
            width={640}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
            <span className="max-w-[70%] truncate rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-purple-light backdrop-blur-sm">
              {ASSET_CLASS_LABELS[listing.asset_class]}
            </span>
            <span className="shrink-0 rounded-full bg-background/80 px-2.5 py-1 text-xs text-muted backdrop-blur-sm">
              Example
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col card-surface">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
          {listing.title}
        </h3>
        <p className="mt-2 text-sm text-muted sm:text-base">
          {listing.city}, {listing.state}
        </p>

        <dl className="mt-6 space-y-1 border-t border-card-border/60 pt-5">
          <MetricRow label="Min. investment" value={formatCurrency(minInvest)} />
          <MetricRow label="Investment" value={formatCurrency(listing.investment_amount)} />
          <MetricRow label="Target equity" value={formatCurrency(listing.target_equity)} />
          <MetricRow
            label="Projected IRR"
            value={formatPercent(listing.projected_irr)}
            valueClassName="text-success"
          />
        </dl>

        {sponsor && (
          <p className="mt-5 border-t border-card-border pt-4 text-sm text-muted">
            Listed by <span className="font-medium text-foreground">{sponsor.name}</span>
            {sponsor.verified && <span className="ml-1 text-gold">✓</span>}
          </p>
        )}

        <span className="mt-5 text-sm font-medium text-gold sm:text-base">View deal →</span>
        </div>
      </Link>
    </motion.article>
  );
}
