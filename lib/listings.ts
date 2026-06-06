import { createClient } from "@/lib/supabase/server";
import { getDemoListings } from "@/lib/listing-constants";
import type { AssetClass, Listing } from "@/types/database";

export {
  ASSET_CLASS_LABELS,
  getDemoListings,
  isSupabaseConfigured,
} from "@/lib/listing-constants";

export async function getFeaturedListings(limit = 8) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, sponsors(*)")
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedListings:", error.message);
    return [] as Listing[];
  }
  return (data ?? []) as Listing[];
}

export async function getPublishedListings(filters?: {
  assetClass?: AssetClass;
  state?: string;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("listings")
    .select("*, sponsors(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (filters?.assetClass) {
    query = query.eq("asset_class", filters.assetClass);
  }
  if (filters?.state) {
    query = query.eq("state", filters.state);
  }
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,city.ilike.%${filters.search}%`,
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("getPublishedListings:", error.message);
    return getDemoListings();
  }
  return (data ?? []) as Listing[];
}

export async function getListingBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, sponsors(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as Listing;
}
