/**
 * Stripe integration stub (Phase 2).
 * Use Checkout Sessions for listing purchases per Stripe best practices.
 */

export async function createListingCheckoutSession(listingId: string) {
  void listingId;
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe is not configured");
  }
  // Phase 2: stripe.checkout.sessions.create(...)
  return null;
}
