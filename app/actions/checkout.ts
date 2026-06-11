"use server";

import { createListingCheckoutSession } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const checkoutSchema = z.object({
  listingTitle: z.string().trim().min(3, "Title must be at least 3 characters").max(200),
});

export async function startListingCheckout(
  listingTitle: string,
): Promise<{ success: true; url: string } | { success: false; error: string }> {
  const parsed = checkoutSchema.safeParse({ listingTitle });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { success: false, error: "Stripe is not configured." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { success: false, error: "You must be signed in." };
  }

  try {
    const session = await createListingCheckoutSession({
      userId: user.id,
      email: user.email,
      listingTitle: parsed.data.listingTitle,
    });

    if (!session.url) {
      return { success: false, error: "Could not create checkout session." };
    }

    const { error } = await supabase.from("listing_payments").insert({
      user_id: user.id,
      stripe_checkout_session_id: session.id,
      listing_title: parsed.data.listingTitle,
      status: "pending",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, url: session.url };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return { success: false, error: message };
  }
}

export async function getListingPaymentBySessionId(sessionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("listing_payments")
    .select("*")
    .eq("stripe_checkout_session_id", sessionId)
    .eq("user_id", user.id)
    .maybeSingle();

  return data;
}
