"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { testimonialSchema, type TestimonialInput } from "@/lib/validations";
import { testimonials as seedTestimonials } from "@/lib/seed-data";
import type { Testimonial } from "@/types";

export async function getTestimonials(onlyApproved = true): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return onlyApproved ? seedTestimonials.filter((t) => t.is_approved) : seedTestimonials;
  }

  const supabase = await createClient();
  let query = supabase.from("testimonials").select("*").order("created_at", { ascending: false });

  if (onlyApproved) {
    query = query.eq("is_approved", true);
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("Error fetching testimonials:", error);
    return onlyApproved ? seedTestimonials.filter((t) => t.is_approved) : seedTestimonials;
  }

  return data as Testimonial[];
}

export async function createTestimonial(input: TestimonialInput) {
  const result = testimonialSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: "Validasi testimonial gagal", issues: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
      .from("testimonials")
      .insert(data)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, data: created };
  }

  return { success: true, data: { id: "testi-" + Date.now(), ...data } };
}

export async function updateTestimonialStatus(id: string, isApproved: boolean) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .update({ is_approved: isApproved })
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, data };
  }

  return { success: true, data: { id, is_approved: isApproved } };
}

export async function toggleTestimonialFeatured(id: string, isFeatured: boolean) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .update({ is_featured: isFeatured })
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, data };
  }

  return { success: true, data: { id, is_featured: isFeatured } };
}

export async function deleteTestimonial(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true};
}
