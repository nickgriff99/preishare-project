import { getListingPaymentBySessionId } from "@/app/actions/checkout";
import { PageTransition } from "@/components/layout/page-transition";
import { LinkButton } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type SearchParams = Promise<{ session_id?: string }>;

export const metadata = {
  title: "Payment Successful",
  robots: { index: false, follow: false },
};

export default async function GetListedSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id: sessionId } = await searchParams;
  const payment = sessionId ? await getListingPaymentBySessionId(sessionId) : null;
  const isPaid = payment?.status === "paid";
  const isPending = payment?.status === "pending";

  return (
    <PageTransition>
      <section className="page-section !pt-8 sm:!pt-10">
        <div className="page-container">
          <div className="mx-auto max-w-lg text-center stack-lg">
            <div className="stack-sm">
              <p className="text-sm font-medium uppercase tracking-wider text-gold">
                {isPaid ? "Payment confirmed" : isPending ? "Payment processing" : "Checkout complete"}
              </p>
              <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                {isPaid ? "You're on the list!" : "Thanks for your payment"}
              </h1>
              <p className="text-base leading-relaxed text-muted">
                {isPaid
                  ? "Your sponsor listing fee is confirmed. Our team will review your deal details and publish your listing within one business day."
                  : isPending
                    ? "We're confirming your payment. This usually takes a few seconds — refresh shortly or check your email for a receipt from Stripe."
                    : "If you completed checkout, your payment receipt will arrive by email."}
              </p>
            </div>

            {payment?.listing_title && (
              <div className="glass-purple panel rounded-xl text-left stack-sm">
                <p className="text-sm text-muted">Listing</p>
                <p className="font-medium">{payment.listing_title}</p>
                <p className="text-sm text-muted">
                  Amount: {formatCurrency(payment.amount_cents / 100)}
                </p>
                <p className="text-sm text-muted capitalize">Status: {payment.status}</p>
              </div>
            )}

            <div className="btn-group mx-auto w-full max-w-sm sm:btn-group-row sm:max-w-none sm:justify-center">
              <LinkButton href="/account" variant="purple" fullWidth className="sm:min-w-[11rem]">
                View account
              </LinkButton>
              <LinkButton href="/listings" variant="secondary" fullWidth className="sm:min-w-[11rem]">
                Browse listings
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
