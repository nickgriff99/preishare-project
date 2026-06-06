# MVP launch checklist

## Supabase

- [ ] Project created and linked
- [ ] Migration `20250604000000_initial_schema.sql` applied
- [ ] Seed data loaded (`supabase/seed.sql`)
- [ ] Google OAuth enabled with correct redirect URLs
- [ ] RLS policies verified (authenticated listings, anon featured on home)

## Vercel

- [ ] Repository connected
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Production deploy successful (`npm run build` passes locally)

## Smoke tests

- [ ] Home loads with hero, featured listings, hub grid
- [ ] Cookie banner accepts / dismisses
- [ ] `/login` — email sign up/in works
- [ ] `/login` — Google OAuth completes callback
- [ ] `/listings` redirects to login when unauthenticated (with Supabase configured)
- [ ] `/listings` shows grid after auth
- [ ] `/listings/[slug]` detail and express interest submits
- [ ] `/contact` form submits
- [ ] Legal pages render
- [ ] Mobile responsive (featured carousel swipe)
- [ ] `prefers-reduced-motion` respected

## SEO

- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` disallows `/listings`
- [ ] Open Graph metadata on home

## Phase 2 (not MVP)

- [ ] Stripe Checkout for listing fees
- [ ] GoHighLevel contact sync
- [ ] Sponsor profiles / Get Listed / Sponsor Application flows
- [ ] Admin moderation panel
