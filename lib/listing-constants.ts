import type { AssetClass, Listing } from "@/types/database";

export const ASSET_CLASS_LABELS: Record<AssetClass, string> = {
  multifamily: "Multifamily",
  industrial: "Industrial",
  medical_office: "Medical Office",
  retail: "Retail",
  data_center: "Data Center",
  self_storage: "Self Storage",
  office: "Office",
  hospitality: "Hospitality",
  other: "Other",
};

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project"),
  );
}

export function getDemoListings(): Listing[] {
  const sponsors = [
    { id: "1", name: "Apex Capital Partners", slug: "apex", verified: true, description: null, created_at: "" },
    { id: "2", name: "Meridian Investments", slug: "meridian", verified: true, description: null, created_at: "" },
    { id: "3", name: "Starlight Equity Group", slug: "starlight", verified: true, description: null, created_at: "" },
    { id: "4", name: "Summit Ridge Capital", slug: "summit", verified: true, description: null, created_at: "" },
    { id: "5", name: "Coastal Harbor Partners", slug: "coastal", verified: true, description: null, created_at: "" },
    { id: "6", name: "Praxis Health RE", slug: "praxis", verified: true, description: null, created_at: "" },
    { id: "7", name: "Northstar Infrastructure", slug: "northstar", verified: true, description: null, created_at: "" },
    { id: "8", name: "FrontRange Storage", slug: "frontrange", verified: true, description: null, created_at: "" },
  ];

  const items: Omit<Listing, "sponsors">[] = [
    { id: "1", slug: "sunset-valley-multifamily", title: "Sunset Valley Multifamily", asset_class: "multifamily", city: "Austin", state: "TX", investment_amount: 12500000, target_equity: 4200000, projected_irr: 18.5, minimum_investment: 50000, description: "Class A multifamily opportunity in Austin's growing suburban corridor.", status: "published", featured: true, sponsor_id: "1", created_by: null, created_at: "", updated_at: "" },
    { id: "2", slug: "harbor-point-industrial", title: "Harbor Point Industrial", asset_class: "industrial", city: "Dallas", state: "TX", investment_amount: 8750000, target_equity: 3100000, projected_irr: 16.2, minimum_investment: 50000, description: "Last-mile industrial logistics asset with long-term tenant demand.", status: "published", featured: true, sponsor_id: "2", created_by: null, created_at: "", updated_at: "" },
    { id: "3", slug: "downtown-medical-office", title: "Downtown Medical Office", asset_class: "medical_office", city: "Houston", state: "TX", investment_amount: 6200000, target_equity: 2480000, projected_irr: 14.8, minimum_investment: 25000, description: "Medical office building anchored by regional healthcare provider.", status: "published", featured: true, sponsor_id: "3", created_by: null, created_at: "", updated_at: "" },
    { id: "4", slug: "highland-ridge-apartments", title: "Highland Ridge Apartments", asset_class: "multifamily", city: "Phoenix", state: "AZ", investment_amount: 10800000, target_equity: 3600000, projected_irr: 17.1, minimum_investment: 50000, description: "Sunbelt multifamily acquisition with interior renovation plan.", status: "published", featured: true, sponsor_id: "4", created_by: null, created_at: "", updated_at: "" },
    { id: "5", slug: "seaside-retail-promenade", title: "Seaside Retail Promenade", asset_class: "retail", city: "Tampa", state: "FL", investment_amount: 7400000, target_equity: 2960000, projected_irr: 15.4, minimum_investment: 25000, description: "Open-air retail promenade with diverse tenant mix.", status: "published", featured: true, sponsor_id: "5", created_by: null, created_at: "", updated_at: "" },
    { id: "6", slug: "crescent-health-campus", title: "Crescent Health Campus", asset_class: "medical_office", city: "Nashville", state: "TN", investment_amount: 9650000, target_equity: 3500000, projected_irr: 16.9, minimum_investment: 50000, description: "Multi-building health campus with credit-rated tenancy.", status: "published", featured: true, sponsor_id: "6", created_by: null, created_at: "", updated_at: "" },
    { id: "7", slug: "silverline-data-center", title: "Silverline Data Center", asset_class: "data_center", city: "Ashburn", state: "VA", investment_amount: 18000000, target_equity: 6500000, projected_irr: 19.2, minimum_investment: 100000, description: "Hyperscale-adjacent data center colocation asset.", status: "published", featured: true, sponsor_id: "7", created_by: null, created_at: "", updated_at: "" },
    { id: "8", slug: "boulder-creek-self-storage", title: "Boulder Creek Self Storage", asset_class: "self_storage", city: "Denver", state: "CO", investment_amount: 5300000, target_equity: 2100000, projected_irr: 13.6, minimum_investment: 25000, description: "Self-storage facility with rate optimization upside.", status: "published", featured: true, sponsor_id: "8", created_by: null, created_at: "", updated_at: "" },
  ];

  return items.map((item, i) => ({
    ...item,
    sponsors: sponsors[i],
  })) as Listing[];
}
