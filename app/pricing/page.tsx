import { PricingSection } from "@/components/marketing/pricing-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageTransition } from "@/components/layout/page-transition";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <PageTransition>
      <div className="page-container min-w-0 pt-8 text-center stack sm:pt-10">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
          Plans for <span className="gradient-text-brand">investors & sponsors</span>
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-muted">
          Investors start free. Sponsors choose the plan that fits their raise.
        </p>
      </div>
      <PricingSection />
      <CtaBand />
    </PageTransition>
  );
}
