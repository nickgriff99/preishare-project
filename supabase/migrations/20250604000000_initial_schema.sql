-- TheListingHub MVP schema

CREATE TYPE public.asset_class AS ENUM (
  'multifamily',
  'industrial',
  'medical_office',
  'retail',
  'data_center',
  'self_storage',
  'office',
  'hospitality',
  'other'
);

CREATE TYPE public.listing_status AS ENUM (
  'draft',
  'published',
  'archived'
);

CREATE TYPE public.user_role AS ENUM (
  'investor',
  'sponsor',
  'admin'
);

-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  role public.user_role NOT NULL DEFAULT 'investor',
  company_name TEXT,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sponsors
CREATE TABLE public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Listings
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  asset_class public.asset_class NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  investment_amount NUMERIC(14, 2) NOT NULL,
  target_equity NUMERIC(14, 2) NOT NULL,
  projected_irr NUMERIC(5, 2) NOT NULL,
  minimum_investment NUMERIC(14, 2),
  description TEXT,
  status public.listing_status NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sponsor_id UUID NOT NULL REFERENCES public.sponsors(id) ON DELETE RESTRICT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX listings_status_idx ON public.listings(status);
CREATE INDEX listings_featured_idx ON public.listings(featured) WHERE featured = TRUE;
CREATE INDEX listings_asset_class_idx ON public.listings(asset_class);

-- Listing media
CREATE TABLE public.listing_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  storage_path TEXT,
  alt_text TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Listing interests (express interest)
CREATE TABLE public.listing_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (listing_id, user_id)
);

-- Contact submissions (MVP)
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'investor'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles: own row only
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Sponsors: authenticated read
CREATE POLICY "sponsors_select_authenticated"
  ON public.sponsors FOR SELECT
  TO authenticated
  USING (TRUE);

-- Listings: published only for authenticated
CREATE POLICY "listings_select_published"
  ON public.listings FOR SELECT
  TO authenticated
  USING (status = 'published');

-- Anon can read featured listings for home teaser (public preview)
CREATE POLICY "listings_select_featured_anon"
  ON public.listings FOR SELECT
  TO anon
  USING (status = 'published' AND featured = TRUE);

-- Listing media: follow listing visibility
CREATE POLICY "listing_media_select"
  ON public.listing_media FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id
      AND (
        (auth.role() = 'authenticated' AND l.status = 'published')
        OR (auth.role() = 'anon' AND l.status = 'published' AND l.featured = TRUE)
      )
    )
  );

-- Listing interests
CREATE POLICY "listing_interests_select_own"
  ON public.listing_interests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "listing_interests_insert_own"
  ON public.listing_interests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Contact: anyone can submit (anon + authenticated)
CREATE POLICY "contact_insert_all"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);
