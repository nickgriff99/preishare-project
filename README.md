# TheListingHub

Investment classifieds platform for passive CRE — rebuilt with Next.js, Supabase, and premium motion UX.

## Stack

- **Next.js 16** (App Router) + React + TypeScript
- **Tailwind CSS v4** + Framer Motion
- **Supabase** — Auth (Google + email), PostgreSQL, RLS
- **Vercel** — deployment
- **Phase 2:** Stripe (listing payments), GoHighLevel (CRM)

## Quick start

```bash
npm install
cp .env.example .env.local
# Add Supabase URL and anon key from https://supabase.com/dashboard
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase credentials, the app runs in **demo mode** with seeded listing data from `lib/listings.ts`.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run migrations:

   ```bash
   npx supabase link --project-ref YOUR_REF
   npx supabase db push
   npx supabase db seed
   ```

   Or apply [`supabase/migrations/20250604000000_initial_schema.sql`](supabase/migrations/20250604000000_initial_schema.sql) and [`supabase/seed.sql`](supabase/seed.sql) in the SQL editor.

3. Enable **Google** auth provider in Authentication → Providers
4. Set redirect URL: `http://localhost:3000/auth/callback` (and production URL)

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (prod) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (prod) | Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | e.g. `https://your-domain.vercel.app` |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Server-only admin tasks |
| `GHL_API_KEY` | Phase 2 | GoHighLevel API |
| `STRIPE_SECRET_KEY` | Phase 2 | Stripe payments |

## MVP routes

| Route | Description |
|-------|-------------|
| `/` | Marketing home |
| `/listings` | Catalog (auth when Supabase configured) |
| `/listings/[slug]` | Listing detail + express interest |
| `/login` | Sign in / sign up |
| `/contact` | Contact form |
| `/privacy`, `/terms`, `/legal` | Legal pages |
| `/coming-soon` | Phase 2 feature placeholders |

## Deploy (Vercel)

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables from `.env.example`
4. Deploy — `main` → production

See [docs/MVP_LAUNCH_CHECKLIST.md](docs/MVP_LAUNCH_CHECKLIST.md) for pre-launch checks.

## Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run lint     # ESLint
```

## License

Private — TheListingHub.
