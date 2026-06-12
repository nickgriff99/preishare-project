# Deploy guide — TheListingHub portfolio demo

Step-by-step instructions to push code, deploy on Netlify, and wire Supabase + Stripe **test mode**.

**Time estimate:** 45–90 minutes the first time.

---

## Part 1 — Push code to GitHub

### 1.1 Review local changes

```powershell
cd c:\coding\preishare-project
git status
git diff
```

### 1.2 Commit and push

```powershell
git add .
git commit -m "Add portfolio README, demo banner, and deploy docs"
git push origin master
```

Your remote is already set: `https://github.com/nickgriff99/preishare-project.git`

If GitHub asks you to use `main` instead of `master`, either push to `main` or rename the default branch in GitHub settings to match.

---

## Part 2 — Supabase

### 2.1 Create or open your project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a project (or use an existing one)
3. Save these from **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret — server only)

### 2.2 Run database migrations

**Option A — Supabase CLI (recommended)**

```powershell
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

Then seed data via SQL editor: paste contents of `supabase/seed.sql` and run.

**Option B — SQL editor**

In Supabase → **SQL Editor**, run in order:

1. `supabase/migrations/20250604000000_initial_schema.sql`
2. `supabase/migrations/20250610000000_listing_payments.sql`
3. `supabase/seed.sql`

### 2.3 Configure auth

1. **Authentication → Providers → Email** — enable (already default)
2. **Authentication → Providers → Google** — enable and add OAuth client ID/secret from [Google Cloud Console](https://console.cloud.google.com/)
3. **Authentication → URL Configuration** — add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR-SITE.netlify.app/auth/callback` _(update after Netlify deploy)_

4. **Authentication → Providers → Google** — authorized redirect URIs in Google Console must include:
   - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

---

## Part 3 — Stripe (test mode only)

### 3.1 Get test API keys

1. Open [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy:
   - Secret key → `STRIPE_SECRET_KEY` (`sk_test_...`)
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (`pk_test_...`)

**Do not use live keys** (`sk_live_...`) for this portfolio demo.

### 3.2 Register production webhook (after Netlify URL exists)

1. [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/test/webhooks) (ensure **Test mode** toggle is on)
2. **Add endpoint**
   - URL: `https://YOUR-SITE.netlify.app/api/webhooks/stripe`
   - Events:
     - `checkout.session.completed`
     - `checkout.session.expired`
3. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET` (`whsec_...`)

---

## Part 4 — Netlify deploy

### 4.1 Connect repository

1. Go to [app.netlify.com](https://app.netlify.com)
2. **Add new site → Import an existing project**
3. Choose **GitHub** → authorize → select `nickgriff99/preishare-project`
4. Branch: `master` (or `main`)
5. Build settings should auto-detect from `netlify.toml`:
   - Build command: `npm run build`
   - Plugin: `@netlify/plugin-nextjs`

### 4.2 Set environment variables

In **Site configuration → Environment variables**, add for **Production** (and Deploy Previews if you want):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-SITE.netlify.app` (your Netlify URL) |
| `NEXT_PUBLIC_DEMO_MODE` | `true` |
| `SUPABASE_SERVICE_ROLE_KEY` | your service role key |
| `STRIPE_SECRET_KEY` | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` from Stripe webhook |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (optional) |

### 4.3 Deploy

1. Click **Deploy site**
2. Wait for build to finish (check deploy log if it fails)
3. Note your URL, e.g. `https://random-name-123.netlify.app`
4. Optionally rename: **Site configuration → Domain management → Options → Edit site name**  
   Suggested: `thelistinghub-demo` → `https://thelistinghub-demo.netlify.app`

### 4.4 Update external services with final URL

Replace `YOUR-SITE.netlify.app` everywhere:

1. **Netlify** — update `NEXT_PUBLIC_SITE_URL` to exact URL (with `https://`), then **Trigger deploy**
2. **Supabase** — add `https://YOUR-SITE.netlify.app/auth/callback` to redirect URLs
3. **Stripe** — webhook endpoint URL (create or edit)
4. **README** — update the Live demo link at the top

---

## Part 5 — Smoke tests

Run through [MVP_LAUNCH_CHECKLIST.md](./MVP_LAUNCH_CHECKLIST.md). Minimum checks:

- [ ] Home page loads; demo banner visible
- [ ] Sign up / sign in works (email or Google)
- [ ] Header shows your name when logged in
- [ ] `/listings` loads after auth
- [ ] Express interest on a listing
- [ ] `/get-listed` → Stripe checkout with `4242 4242 4242 4242`
- [ ] Success page shows; Supabase `listing_payments` row status = `paid`
- [ ] Profile role updates to `sponsor` after payment

---

## Part 6 — Portfolio polish (optional, high impact)

### 6.1 Before/after screenshots

1. Screenshot [thelistinghub.com](https://thelistinghub.com/) → save as `docs/images/before.png`
2. Screenshot your Netlify home page → save as `docs/images/after.png`
3. Commit and push:

   ```powershell
   git add docs/images/before.png docs/images/after.png
   git commit -m "Add before/after portfolio screenshots"
   git push origin master
   ```

4. Update README live demo URL if not done yet

### 6.2 Resume / LinkedIn blurb

> Rebuilt TheListingHub (CRE investment classifieds) with Next.js 16, Supabase Auth + RLS, and Stripe Checkout (test mode). Live demo: [your URL]

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build fails on Netlify | Check deploy log; run `npm run build` locally with same env vars |
| Google OAuth redirect error | Supabase redirect URL + Google OAuth redirect URI must match |
| Stripe checkout works but status stays `pending` | Webhook not firing — verify `STRIPE_WEBHOOK_SECRET`, endpoint URL, and `SUPABASE_SERVICE_ROLE_KEY` |
| `/listings` open without login | Supabase env vars missing or placeholder — check Netlify env |
| Demo banner not showing | Set `NEXT_PUBLIC_DEMO_MODE=true` and redeploy |

---

## Local development with production services

Copy production env vars into `.env.local` (except use `NEXT_PUBLIC_SITE_URL=http://localhost:3000` locally). For Stripe webhooks locally:

```powershell
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Use the CLI signing secret in `.env.local` as `STRIPE_WEBHOOK_SECRET` while developing.
