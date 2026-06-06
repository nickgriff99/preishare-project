import type { ButtonVariant } from "@/components/ui/button";

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  variant: ButtonVariant;
  highlighted: boolean;
  badge: string | null;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "investor",
    name: "Investor Access",
    price: "Free",
    period: "to start",
    description: "Browse deals, express interest, and get alerts on new passive CRE listings.",
    features: [
      "Full listing catalog",
      "Express interest to sponsors",
      "Saved searches & alerts",
      "Verified sponsor profiles",
    ],
    cta: "Create free account",
    href: "/login",
    variant: "primary",
    highlighted: false,
    badge: null,
  },
  {
    id: "sponsor-listing",
    name: "Sponsor Listing",
    price: "$499",
    period: "/ listing",
    description: "Market your syndication to qualified LPs actively seeking CRE.",
    features: [
      "Featured placement on hub",
      "Lead notifications from LPs",
      "Sponsor profile & track record",
      "30-day listing visibility",
    ],
    cta: "Get your deal listed",
    href: "/coming-soon?feature=get-listed",
    variant: "purple",
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "sponsor-pro",
    name: "Sponsor Pro",
    price: "$1,299",
    period: "/ quarter",
    description: "Unlimited listings, priority placement, and dedicated GP support.",
    features: [
      "Unlimited active listings",
      "Priority homepage placement",
      "Analytics & lead dashboard",
      "Dedicated account support",
    ],
    cta: "Talk to sales",
    href: "/contact?subject=sponsor-pro",
    variant: "outline",
    highlighted: false,
    badge: null,
  },
];

export const FEATURED_PRICING_PLAN = PRICING_PLANS.find((plan) => plan.highlighted)!;

/** Mobile carousel: Most popular → Sponsor Pro → Investor Access. */
export const PRICING_CAROUSEL_PLANS: PricingPlan[] = [
  FEATURED_PRICING_PLAN,
  PRICING_PLANS.find((plan) => plan.id === "sponsor-pro")!,
  PRICING_PLANS.find((plan) => plan.id === "investor")!,
];

