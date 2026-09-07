"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations";
import { contactMessages as seedMessages } from "@/lib/seed-data";
import type { ContactMessage } from "@/types";

export async function submitContactMessage(input: ContactFormInput) {
  const result = contactFormSchema.safeParse(input);
  if (!result.success) {
    return {
      success: false,
      error: "Data form kontak tidak valid",
      issues: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
      .from("contact_messages")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        event_type: data.event_type || null,
        preferred_date: data.preferred_date || null,
        venue_preference: data.venue_preference || null,
        estimated_guests: data.estimated_guests || 0,
        message: data.message,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/messages");
    revalidatePath("/admin/dashboard");
    return { success: true, data: created };
  }

  return { success: true, data: { id: "msg-" + Date.now(), ...data, status: "new" } };
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured()) {
    return seedMessages;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error fetching messages:", error);
    return seedMessages;
  }

  return data as ContactMessage[];
}

export async function updateMessageStatus(id: string, status: "new" | "read" | "responded" | "archived") {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/messages");
    revalidatePath("/admin/dashboard");
    return { success: true, data };
  }

  return { success: true, data: { id, status } };
}

export async function updateAdminNotes(id: string, notes: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .update({ admin_notes: notes, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/messages");
    return { success: true, data };
  }

  return { success: true, data: { id, admin_notes: notes } };
}

export async function deleteMessage(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
  return { success: true };
}
