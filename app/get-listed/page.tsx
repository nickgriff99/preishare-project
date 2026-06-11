import { GetListedForm } from "@/components/get-listed/get-listed-form";
import { PageTransition } from "@/components/layout/page-transition";
import { Suspense } from "react";

export const metadata = {
  title: "Get Listed",
  description: "List your CRE syndication on TheListingHub for $499.",
  robots: { index: false, follow: false },
};

export default function GetListedPage() {
  return (
    <PageTransition>
      <section className="page-section !pt-8 sm:!pt-10">
        <div className="page-container">
          <div className="mx-auto grid min-w-0 max-w-xl grid-cols-1 gap-10">
            <header className="stack-sm text-center sm:text-left">
              <p className="text-sm font-medium uppercase tracking-wider text-gold">
                Sponsor listing
              </p>
              <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                Get your deal listed
              </h1>
              <p className="text-base leading-relaxed text-muted">
                Reach qualified LPs actively browsing passive CRE opportunities. One flat fee,
                30 days of visibility.
              </p>
            </header>

            <div className="glass-purple panel-lg">
              <Suspense
                fallback={
                  <div className="h-64 animate-pulse rounded-xl bg-card" aria-hidden />
                }
              >
                <GetListedForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
