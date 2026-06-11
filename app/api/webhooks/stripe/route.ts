import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const runtime = "nodejs";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const admin = createAdminClient();
  const userId = session.metadata?.user_id;
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const { error: paymentError } = await admin
    .from("listing_payments")
    .update({
      status: "paid",
      stripe_payment_intent_id: paymentIntentId,
    })
    .eq("stripe_checkout_session_id", session.id);

  if (paymentError) {
    console.error("webhook listing_payments update:", paymentError.message);
    throw new Error(paymentError.message);
  }

  if (userId) {
    const { error: profileError } = await admin
      .from("profiles")
      .update({ role: "sponsor" })
      .eq("id", userId);

    if (profileError) {
      console.error("webhook profile update:", profileError.message);
    }
  }
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const admin = createAdminClient();

  await admin
    .from("listing_payments")
    .update({ status: "failed" })
    .eq("stripe_checkout_session_id", session.id)
    .eq("status", "pending");
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.expired":
        await handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
        break;
      default:
        break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook handler failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
