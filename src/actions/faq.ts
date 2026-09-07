"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { faqSchema, type FAQInput } from "@/lib/validations";
import { faqs as seedFaqs } from "@/lib/seed-data";
import type { FAQ } from "@/types";

export async function getFaqs(onlyActive = true): Promise<FAQ[]> {
  if (!isSupabaseConfigured()) {
    return onlyActive ? seedFaqs.filter((f) => f.is_active) : seedFaqs;
  }

  const supabase = await createClient();
  let query = supabase.from("faqs").select("*").order("display_order", { ascending: true });

  if (onlyActive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("Error fetching FAQs:", error);
    return onlyActive ? seedFaqs.filter((f) => f.is_active) : seedFaqs;
  }

  return data as FAQ[];
}

export async function createFaq(input: FAQInput) {
  const result = faqSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: "Validasi FAQ gagal", issues: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
      .from("faqs")
      .insert(data)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true, data: created };
  }

  return { success: true, data: { id: "faq-" + Date.now(), ...data } };
}

export async function updateFaq(id: string, input: Partial<FAQInput>) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true, data };
  }

  return { success: true, data: { id, ...input } };
}

export async function deleteFaq(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { success: true };
}
