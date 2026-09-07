"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { heroSlideSchema, type HeroSlideInput } from "@/lib/validations";
import { heroSlides as seedHero } from "@/lib/seed-data";
import type { HeroSlide } from "@/types";

export async function getHeroSlides(onlyActive = true): Promise<HeroSlide[]> {
  if (!isSupabaseConfigured()) {
    return onlyActive ? seedHero.filter((s) => s.is_active) : seedHero;
  }

  const supabase = await createClient();
  let query = supabase.from("hero_slides").select("*").order("display_order", { ascending: true });

  if (onlyActive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("Error fetching hero slides:", error);
    return onlyActive ? seedHero.filter((s) => s.is_active) : seedHero;
  }

  return data as HeroSlide[];
}

export async function createHeroSlide(input: HeroSlideInput) {
  const result = heroSlideSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: "Validasi hero slide gagal", issues: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
      .from("hero_slides")
      .insert(data)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/hero-slides");
    return { success: true, data: created };
  }

  return { success: true, data: { id: "slide-" + Date.now(), ...data } };
}

export async function updateHeroSlide(id: string, input: Partial<HeroSlideInput>) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/hero-slides");
    return { success: true, data };
  }

  return { success: true, data: { id, ...input } };
}

export async function deleteHeroSlide(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("hero_slides").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
  return { success: true };
}

export async function reorderHeroSlides(orderedIds: string[]) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    for (let i = 0; i < orderedIds.length; i++) {
      await supabase.from("hero_slides").update({ display_order: i + 1 }).eq("id", orderedIds[i]);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
  return { success: true };
}
