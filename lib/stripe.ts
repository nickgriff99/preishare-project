import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Stripe is not configured");
  }
  return new Stripe(key);
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function createListingCheckoutSession({
  userId,
  email,
  listingTitle,
}: {
  userId: string;
  email: string;
  listingTitle: string;
}) {
  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Sponsor Listing — TheListingHub",
            description: `30-day listing visibility for: ${listingTitle}`,
          },
          unit_amount: 49900,
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: userId,
      listing_title: listingTitle,
    },
    success_url: `${siteUrl}/get-listed/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/get-listed?canceled=1`,
  });
}
