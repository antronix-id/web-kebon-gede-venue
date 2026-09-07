"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { eventSchema, type EventInput } from "@/lib/validations";
import { events as seedEvents } from "@/lib/seed-data";
import type { EventItem } from "@/types";

export async function getEvents(onlyPublished = false): Promise<EventItem[]> {
  if (!isSupabaseConfigured()) {
    return onlyPublished ? seedEvents.filter((e) => e.is_published) : seedEvents;
  }

  const supabase = await createClient();
  let query = supabase
    .from("events")
    .select("*, venues(name)")
    .order("event_date", { ascending: false });

  if (onlyPublished) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("Error fetching events:", error);
    return onlyPublished ? seedEvents.filter((e) => e.is_published) : seedEvents;
  }

  return data.map((item: any) => ({
    ...item,
    description: item.description || "",
    content: item.content || "",
    cover_image_url: item.cover_image_url || "",
    event_date: item.event_date || "",
    venue_name: item.venues?.name || undefined,
  }));
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  if (!isSupabaseConfigured()) {
    return seedEvents.find((e) => e.slug === slug) || null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*, venues(name)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return seedEvents.find((e) => e.slug === slug) || null;
  }

  const item = data as any;
  return {
    ...item,
    description: item.description || "",
    content: item.content || "",
    cover_image_url: item.cover_image_url || "",
    event_date: item.event_date || "",
    venue_name: item.venues?.name || undefined,
  };
}

export async function getEventById(id: string): Promise<EventItem | null> {
  if (!isSupabaseConfigured()) {
    return seedEvents.find((e) => e.id === id) || null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*, venues(name)")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  const item = data as any;
  return {
    ...item,
    description: item.description || "",
    content: item.content || "",
    cover_image_url: item.cover_image_url || "",
    event_date: item.event_date || "",
    venue_name: item.venues?.name || undefined,
  };
}

export async function createEvent(input: EventInput) {
  const result = eventSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: "Validasi data event gagal", issues: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
      .from("events")
      .insert({
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        content: data.content || null,
        cover_image_url: data.cover_image_url || null,
        event_date: data.event_date || null,
        event_type: data.event_type,
        venue_id: data.venue_id || null,
        is_published: data.is_published,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/events");
    revalidatePath("/admin/events");
    revalidatePath("/");
    return { success: true, data: created };
  }

  return { success: true, data: { id: "event-" + Date.now(), ...data } };
}

export async function updateEvent(id: string, input: Partial<EventInput>) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
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

    revalidatePath("/events");
    revalidatePath(`/events/${data.slug}`);
    revalidatePath("/admin/events");
    revalidatePath("/");
    return { success: true, data };
  }

  return { success: true, data: { id, ...input } };
}

export async function deleteEvent(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/events");
  revalidatePath("/admin/events");
  revalidatePath("/");
  return { success: true };
}
