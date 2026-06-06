"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContact(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors.message?.[0] ?? "Invalid form data",
    };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url.includes("your-project")) {
    // Demo mode: log and succeed
    console.info("[contact]", parsed.data);
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_submissions")
    .insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject ?? null,
      message: parsed.data.message,
    });

  if (error) {
    return { success: false, error: error.message };
  }

  const { syncContactToGhl } = await import("@/lib/ghl");
  await syncContactToGhl({
    name: parsed.data.name,
    email: parsed.data.email,
    source: "contact-form",
    tags: ["website-contact"],
  });

  return { success: true };
}
