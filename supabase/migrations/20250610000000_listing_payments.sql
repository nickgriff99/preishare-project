-- Listing payments (Stripe Checkout for Get Listed)

CREATE TABLE public.listing_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_checkout_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id TEXT,
  amount_cents INT NOT NULL DEFAULT 49900,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  listing_title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX listing_payments_user_id_idx ON public.listing_payments(user_id);
CREATE INDEX listing_payments_status_idx ON public.listing_payments(status);

ALTER TABLE public.listing_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "listing_payments_select_own"
  ON public.listing_payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "listing_payments_insert_own"
  ON public.listing_payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
