-- Seed sponsors and listings (mirrors thelistinghub.com homepage examples)

INSERT INTO public.sponsors (name, slug, verified) VALUES
  ('Apex Capital Partners', 'apex-capital-partners', TRUE),
  ('Meridian Investments', 'meridian-investments', TRUE),
  ('Starlight Equity Group', 'starlight-equity-group', TRUE),
  ('Summit Ridge Capital', 'summit-ridge-capital', TRUE),
  ('Coastal Harbor Partners', 'coastal-harbor-partners', TRUE),
  ('Praxis Health RE', 'praxis-health-re', TRUE),
  ('Northstar Infrastructure', 'northstar-infrastructure', TRUE),
  ('FrontRange Storage', 'frontrange-storage', TRUE);

INSERT INTO public.listings (
  slug, title, asset_class, city, state,
  investment_amount, target_equity, projected_irr, minimum_investment,
  status, featured, sponsor_id, description
) VALUES
  (
    'sunset-valley-multifamily',
    'Sunset Valley Multifamily',
    'multifamily', 'Austin', 'TX',
    12500000, 4200000, 18.5, 50000,
    'published', TRUE,
    (SELECT id FROM public.sponsors WHERE slug = 'apex-capital-partners'),
    'Class A multifamily opportunity in Austin''s growing suburban corridor. Value-add strategy with strong rent growth fundamentals.'
  ),
  (
    'harbor-point-industrial',
    'Harbor Point Industrial',
    'industrial', 'Dallas', 'TX',
    8750000, 3100000, 16.2, 50000,
    'published', TRUE,
    (SELECT id FROM public.sponsors WHERE slug = 'meridian-investments'),
    'Last-mile industrial logistics asset with long-term tenant demand and below-replacement-cost basis.'
  ),
  (
    'downtown-medical-office',
    'Downtown Medical Office',
    'medical_office', 'Houston', 'TX',
    6200000, 2480000, 14.8, 25000,
    'published', TRUE,
    (SELECT id FROM public.sponsors WHERE slug = 'starlight-equity-group'),
    'Medical office building anchored by regional healthcare provider with stable NOI profile.'
  ),
  (
    'highland-ridge-apartments',
    'Highland Ridge Apartments',
    'multifamily', 'Phoenix', 'AZ',
    10800000, 3600000, 17.1, 50000,
    'published', TRUE,
    (SELECT id FROM public.sponsors WHERE slug = 'summit-ridge-capital'),
    'Sunbelt multifamily acquisition with interior renovation and amenity upgrade plan.'
  ),
  (
    'seaside-retail-promenade',
    'Seaside Retail Promenade',
    'retail', 'Tampa', 'FL',
    7400000, 2960000, 15.4, 25000,
    'published', TRUE,
    (SELECT id FROM public.sponsors WHERE slug = 'coastal-harbor-partners'),
    'Open-air retail promenade with diverse tenant mix and strong foot traffic drivers.'
  ),
  (
    'crescent-health-campus',
    'Crescent Health Campus',
    'medical_office', 'Nashville', 'TN',
    9650000, 3500000, 16.9, 50000,
    'published', TRUE,
    (SELECT id FROM public.sponsors WHERE slug = 'praxis-health-re'),
    'Multi-building health campus with credit-rated tenancy and expansion potential.'
  ),
  (
    'silverline-data-center',
    'Silverline Data Center',
    'data_center', 'Ashburn', 'VA',
    18000000, 6500000, 19.2, 100000,
    'published', TRUE,
    (SELECT id FROM public.sponsors WHERE slug = 'northstar-infrastructure'),
    'Hyperscale-adjacent data center colocation asset in Northern Virginia power corridor.'
  ),
  (
    'boulder-creek-self-storage',
    'Boulder Creek Self Storage',
    'self_storage', 'Denver', 'CO',
    5300000, 2100000, 13.6, 25000,
    'published', TRUE,
    (SELECT id FROM public.sponsors WHERE slug = 'frontrange-storage'),
    'Self-storage facility with below-market occupancy and rate optimization upside.'
  );
