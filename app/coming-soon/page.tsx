import { LinkButton } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/page-transition";

const featureLabels: Record<string, string> = {
  "sponsor-profiles": "Sponsor Profiles",
  "get-listed": "Get Listed",
  "sponsor-application": "Sponsor Application",
};

type SearchParams = Promise<{ feature?: string }>;

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { feature } = await searchParams;
  const label = feature ? featureLabels[feature] ?? "This feature" : "This feature";

  return (
    <PageTransition>
      <section className="page-container flex min-h-[50vh] min-w-0 flex-col items-center justify-center py-20 text-center sm:py-24">
        <div className="stack max-w-lg">
          <p className="text-sm font-medium uppercase tracking-wider text-gold">Coming soon</p>
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{label}</h1>
          <p className="text-base leading-relaxed text-muted">
            We&apos;re building {label.toLowerCase()} for phase 2. Browse listings or contact
            our team in the meantime.
          </p>
          <div className="btn-group mx-auto w-full max-w-sm sm:btn-group-row sm:max-w-none sm:justify-center">
            <LinkButton href="/contact" fullWidth className="sm:min-w-[11rem]">
              Contact us
            </LinkButton>
            <LinkButton href="/listings" variant="secondary" fullWidth className="sm:min-w-[11rem]">
              Browse listings
            </LinkButton>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
