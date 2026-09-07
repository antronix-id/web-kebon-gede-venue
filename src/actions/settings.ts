"use server";

import { revalidatePath } from "next/cache";
import { createClient, createPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { siteSettings as seedSettings } from "@/lib/seed-data";
import type { SiteSetting } from "@/types";

export async function getSettings(): Promise<SiteSetting[]> {
  if (!isSupabaseConfigured()) {
    return seedSettings;
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase.from("site_settings").select("*");

  if (error || !data || data.length === 0) {
    return seedSettings;
  }

  return data as SiteSetting[];
}

export async function getSettingByKey(key: string): Promise<string> {
  if (!isSupabaseConfigured()) {
    const found = seedSettings.find((s) => s.key === key);
    return found ? found.value : "";
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error || !data) {
    const found = seedSettings.find((s) => s.key === key);
    return found ? found.value : "";
  }

  return data.value || "";
}

export async function updateSetting(key: string, value: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function updateMultipleSettings(settings: Record<string, string>) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const records = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("site_settings").upsert(records, { onConflict: "key" });
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}
