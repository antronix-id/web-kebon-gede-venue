"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { venueSchema, type VenueInput } from "@/lib/validations";
import { venues as seedVenues } from "@/lib/seed-data";
import type { Venue } from "@/types";

export async function getVenues(onlyActive = false): Promise<Venue[]> {
  if (!isSupabaseConfigured()) {
    return onlyActive ? seedVenues.filter((v) => v.is_active) : seedVenues;
  }

  const supabase = await createClient();
  let query = supabase.from("venues").select("*, venue_images(*)").order("display_order", { ascending: true });

  if (onlyActive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("Error fetching venues:", error);
    return onlyActive ? seedVenues.filter((v) => v.is_active) : seedVenues;
  }

  return data.map((item: any) => ({
    ...item,
    short_description: item.short_description || "",
    full_description: item.full_description || "",
    hero_image_url: item.hero_image_url || "",
    images: item.venue_images ? item.venue_images.map((img: any) => img.image_url) : [],
  }));
}

export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  if (!isSupabaseConfigured()) {
    return seedVenues.find((v) => v.slug === slug) || null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("venues")
    .select("*, venue_images(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return seedVenues.find((v) => v.slug === slug) || null;
  }

  const item = data as any;
  return {
    ...item,
    short_description: item.short_description || "",
    full_description: item.full_description || "",
    hero_image_url: item.hero_image_url || "",
    images: item.venue_images ? item.venue_images.map((img: any) => img.image_url) : [],
  };
}

export async function getVenueById(id: string): Promise<Venue | null> {
  if (!isSupabaseConfigured()) {
    return seedVenues.find((v) => v.id === id) || null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("venues")
    .select("*, venue_images(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    return seedVenues.find((v) => v.id === id) || null;
  }

  const item = data as any;
  return {
    ...item,
    short_description: item.short_description || "",
    full_description: item.full_description || "",
    hero_image_url: item.hero_image_url || "",
    images: item.venue_images ? item.venue_images.map((img: any) => img.image_url) : [],
  };
}

export async function createVenue(input: VenueInput) {
  const result = venueSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: "Validasi data venue gagal", issues: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
      .from("venues")
      .insert({
        name: data.name,
        slug: data.slug,
        short_description: data.short_description || null,
        full_description: data.full_description || null,
        venue_type: data.venue_type,
        capacity_min: data.capacity_min,
        capacity_max: data.capacity_max,
        facilities: data.facilities,
        hero_image_url: data.hero_image_url || null,
        is_active: data.is_active,
        display_order: data.display_order,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/venues");
    revalidatePath("/admin/venues");
    revalidatePath("/");
    return { success: true, data: created };
  }

  // Fallback
  return { success: true, data: { ...data, id: "venue-" + Date.now() } };
}

export async function updateVenue(id: string, input: Partial<VenueInput>) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("venues")
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/venues");
    revalidatePath(`/venues/${data.slug}`);
    revalidatePath("/admin/venues");
    revalidatePath("/");
    return { success: true, data };
  }

  return { success: true, data: { id, ...input } };
}

export async function deleteVenue(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("venues").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/venues");
  revalidatePath("/admin/venues");
  revalidatePath("/");
  return { success: true };
}

export async function toggleVenueStatus(id: string, isActive: boolean) {
  return updateVenue(id, { is_active: isActive });
}
