# TheListingHub

Investment classifieds platform for passive CRE — rebuilt with Next.js, Supabase, Stripe, and premium motion UX.

**Live demo:** Deploy to Netlify and set `NEXT_PUBLIC_SITE_URL` to your production URL (see Deploy below).

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** + Framer Motion
- **Supabase** — Auth (Google + email), PostgreSQL, RLS
- **Stripe** — Checkout Sessions + webhooks for sponsor listing fees
- **Netlify** — deployment

## Quick start

```bash
npm install
cp .env.example .env.local
# Add Supabase URL and anon key from https://supabase.com/dashboard
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase credentials, the app runs in **demo mode** with seeded listing data from `lib/listing-constants.ts`.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run migrations:

   ```bash
   npx supabase link --project-ref YOUR_REF
   npx supabase db push
   npx supabase db seed
   ```

   Or apply migrations in the SQL editor:
   - [`supabase/migrations/20250604000000_initial_schema.sql`](supabase/migrations/20250604000000_initial_schema.sql)
   - [`supabase/migrations/20250610000000_listing_payments.sql`](supabase/migrations/20250610000000_listing_payments.sql)
   - [`supabase/seed.sql`](supabase/seed.sql)

3. Enable **Google** auth provider in Authentication → Providers
4. Set redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR-SITE.netlify.app/auth/callback`

## Stripe setup (test mode)

1. Create keys at [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Add to `.env.local`:
   - `STRIPE_SECRET_KEY=sk_test_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...` (optional)
3. For local webhooks:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

4. In production, add a webhook endpoint in Stripe Dashboard:
   - URL: `https://YOUR-SITE.netlify.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`

**Test card:** `4242 4242 4242 4242` — any future expiry, any CVC.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (prod) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (prod) | Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | e.g. `https://thelistinghub.netlify.app` |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (prod) | Server-only — Stripe webhooks |
| `STRIPE_SECRET_KEY` | Yes (prod) | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Yes (prod) | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional | Client-side Stripe.js |
| `GHL_API_KEY` | Phase 2 | GoHighLevel API |

See [`.env.example`](.env.example) for a copy-paste template.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing home |
| `/listings` | Catalog (auth when Supabase configured) |
| `/listings/[slug]` | Listing detail + express interest |
| `/login` | Sign in / sign up |
| `/account` | Profile settings (authenticated) |
| `/get-listed` | Sponsor listing checkout — $499 (authenticated) |
| `/get-listed/success` | Post-checkout confirmation |
| `/pricing` | Pricing plans |
| `/contact` | Contact form |
| `/privacy`, `/terms`, `/legal` | Legal pages |
| `/coming-soon` | Phase 2 feature placeholders |

## Deploy (Netlify)

1. Push to GitHub
2. Import repo in [app.netlify.com](https://app.netlify.com)
3. Build settings (auto-detected via [`netlify.toml`](netlify.toml)):
   - Build command: `npm run build`
   - Plugin: `@netlify/plugin-nextjs`
4. Add environment variables from `.env.example`
5. Deploy — `main` → production
6. Update Supabase OAuth redirect URLs and Stripe webhook URL to your Netlify domain

See [docs/MVP_LAUNCH_CHECKLIST.md](docs/MVP_LAUNCH_CHECKLIST.md) for pre-launch checks.

## Demo script (portfolio walkthrough)

1. Open live URL → home page with featured listings
2. **Sign in** (Google or email) → header shows your name + sign out
3. Browse `/listings` → open a deal → **Express interest** (writes to Supabase)
4. Go to `/pricing` → **Get your deal listed** → `/get-listed`
5. Enter deal title → **Pay $499** → Stripe test checkout → success page
6. Show Supabase dashboard: `listing_interests` + `listing_payments` rows

## Scripts

```bash
npm run dev       # Development
npm run build     # Production build
npm run lint      # ESLint
npm run typecheck # TypeScript
```

## License

Private — TheListingHub.
