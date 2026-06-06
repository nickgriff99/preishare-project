import { LinkButton } from "@/components/ui/button";
import type { PricingPlan } from "@/lib/pricing-plans";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  plan: PricingPlan;
  className?: string;
};

export function PricingCard({ plan, className }: PricingCardProps) {
  return (
    <div
      className={cn(
        "hover-card flex h-full min-w-0 flex-col rounded-2xl border card-surface",
        plan.highlighted
          ? "border-gold/50 bg-gradient-to-b from-purple-muted/40 to-card shadow-lg shadow-purple/15"
          : "border-card-border bg-card",
        className,
      )}
    >
      {plan.badge && (
        <p className="mb-5 text-center">
          <span className="inline-block rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-purple-deep">
            {plan.badge}
          </span>
        </p>
      )}
      <h3 className="text-xl font-semibold text-purple-light">{plan.name}</h3>
      <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-3xl font-bold leading-none text-gold sm:text-4xl">
          {plan.price}
        </span>
        <span className="text-sm text-muted">{plan.period}</span>
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted">{plan.description}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-relaxed sm:text-base">
            <span className="shrink-0 text-gold" aria-hidden>
              ✓
            </span>
            <span className="min-w-0">{feature}</span>
          </li>
        ))}
      </ul>
      <LinkButton href={plan.href} variant={plan.variant} fullWidth className="mt-8">
        {plan.cta}
      </LinkButton>
    </div>
  );
}
