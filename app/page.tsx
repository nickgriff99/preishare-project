import { CtaBand } from "@/components/marketing/cta-band";
import { FeaturedListings } from "@/components/marketing/featured-listings";
import { Hero } from "@/components/marketing/hero";
import { HubGrid } from "@/components/marketing/hub-grid";
import { PricingSection } from "@/components/marketing/pricing-section";
import { SocialProof } from "@/components/marketing/social-proof";
import { StickyCta } from "@/components/marketing/sticky-cta";
import { PageTransition } from "@/components/layout/page-transition";
import {
  getDemoListings,
  getFeaturedListings,
  isSupabaseConfigured,
} from "@/lib/listings";

export default async function HomePage() {
  const listings = isSupabaseConfigured()
    ? await getFeaturedListings()
    : getDemoListings();

  const featured =
    listings.length > 0 ? listings : getDemoListings();

  return (
    <PageTransition>
      <div className="relative isolate overflow-x-clip">
        <Hero />
        <div className="relative z-10">
          <SocialProof />
          <FeaturedListings listings={featured} />
          <PricingSection />
          <HubGrid />
          <CtaBand />
        </div>
        <StickyCta />
      </div>
    </PageTransition>
  );
}
