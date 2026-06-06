"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function expressInterest(
  listingId: string,
  message?: string,
): Promise<{ success: boolean; error?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url.includes("your-project")) {
    console.info("[demo] express interest:", listingId, message);
    return { success: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const { error } = await supabase.from("listing_interests").insert({
    listing_id: listingId,
    user_id: user.id,
    message: message ?? null,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: true };
    }
    return { success: false, error: error.message };
  }

  revalidatePath(`/listings`);
  return { success: true };
}
