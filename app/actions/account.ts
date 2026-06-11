"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  display_name: z.string().trim().min(1, "Name is required").max(100),
  company_name: z.string().trim().max(100).optional(),
  title: z.string().trim().max(100).optional(),
});

export async function updateProfile(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const parsed = profileSchema.safeParse({
    display_name: formData.get("display_name"),
    company_name: formData.get("company_name") || undefined,
    title: formData.get("title") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: parsed.data.display_name,
      company_name: parsed.data.company_name ?? null,
      title: parsed.data.title ?? null,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/account");
  return { success: true };
}
