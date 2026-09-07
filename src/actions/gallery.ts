"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { galleryItemSchema, type GalleryItemInput } from "@/lib/validations";
import { galleryItems as seedGallery } from "@/lib/seed-data";
import type { GalleryItem, GalleryCategory } from "@/types";

export async function getGalleryItems(category?: GalleryCategory | "all"): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) {
    if (!category || category === "all") return seedGallery;
    return seedGallery.filter((item) => item.category === category);
  }

  const supabase = await createClient();
  let query = supabase.from("gallery_items").select("*").order("display_order", { ascending: true });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("Error fetching gallery items:", error);
    if (!category || category === "all") return seedGallery;
    return seedGallery.filter((item) => item.category === category);
  }

  return data as GalleryItem[];
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  if (!isSupabaseConfigured()) {
    return seedGallery.find((g) => g.id === id) || null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("gallery_items").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data as GalleryItem;
}

export async function createGalleryItem(input: GalleryItemInput) {
  const result = galleryItemSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: "Validasi item galeri gagal", issues: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
      .from("gallery_items")
      .insert({
        image_url: data.image_url,
        title: data.title || null,
        description: data.description || null,
        category: data.category,
        venue_id: data.venue_id || null,
        is_featured: data.is_featured,
        display_order: data.display_order,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath("/");
    return { success: true, data: created };
  }

  return { success: true, data: { id: "gallery-" + Date.now(), ...data } };
}

export async function updateGalleryItem(id: string, input: Partial<GalleryItemInput>) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_items")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath("/");
    return { success: true, data };
  }

  return { success: true, data: { id, ...input } };
}

export async function deleteGalleryItem(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGalleryItemsBulk(ids: string[]) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("gallery_items").delete().in("id", ids);
    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  return { success: true };
}
