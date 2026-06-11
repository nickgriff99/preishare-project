# MVP launch checklist

## Supabase

- [ ] Project created and linked
- [ ] Migration `20250604000000_initial_schema.sql` applied
- [ ] Migration `20250610000000_listing_payments.sql` applied
- [ ] Seed data loaded (`supabase/seed.sql`)
- [ ] Google OAuth enabled with correct redirect URLs
- [ ] RLS policies verified (authenticated listings, anon featured on home)

## Netlify

- [ ] Repository connected
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] `STRIPE_SECRET_KEY` set (test or live)
- [ ] `STRIPE_WEBHOOK_SECRET` set
- [ ] Production deploy successful (`npm run build` passes locally)

## Stripe

- [ ] Webhook endpoint registered: `https://YOUR-SITE.netlify.app/api/webhooks/stripe`
- [ ] Events: `checkout.session.completed`, `checkout.session.expired`
- [ ] `/get-listed` redirects to login when unauthenticated
- [ ] Checkout opens in test mode
- [ ] Webhook updates `listing_payments` and sets profile role to `sponsor`

## Smoke tests

- [ ] Home loads with hero, featured listings, hub grid
- [ ] Cookie banner accepts / dismisses
- [ ] `/login` — email sign up/in works
- [ ] `/login` — Google OAuth completes callback
- [ ] Header shows user name + sign out when authenticated
- [ ] `/account` loads and profile saves
- [ ] `/listings` redirects to login when unauthenticated (with Supabase configured)
- [ ] `/listings` shows grid after auth
- [ ] `/listings/[slug]` detail and express interest submits
- [ ] `/get-listed` → Stripe Checkout → `/get-listed/success`
- [ ] `/contact` form submits
- [ ] Legal pages render
- [ ] Mobile responsive (featured carousel swipe)
- [ ] `prefers-reduced-motion` respected

## SEO

- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` disallows `/listings`
- [ ] Open Graph metadata on home

## Phase 2 (not MVP)

- [ ] GoHighLevel contact sync
- [ ] Sponsor profiles / Sponsor Application flows
- [ ] Sponsor Pro subscription ($1,299/qtr)
- [ ] Admin moderation panel
