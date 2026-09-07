"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function uploadImageAction(
  formData: FormData,
  bucket: string = "general"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "Tidak ada file yang diunggah" };
    }

    if (!isSupabaseConfigured()) {
      // Demo fallback: Return a local placeholder or blob URL
      return {
        success: true,
        url: "/images/1.png",
      };
    }

    const supabase = await createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (err: any) {
    console.error("Storage upload error:", err);
    return { success: false, error: err.message || "Gagal mengunggah gambar" };
  }
}

export async function deleteImageAction(
  filePath: string,
  bucket: string = "general"
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
