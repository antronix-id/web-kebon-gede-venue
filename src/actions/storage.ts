"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function uploadImageAction(
  formData: FormData,
  bucket: string = "general"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, error: "Tidak ada file valid yang diunggah" };
    }

    if (!isSupabaseConfigured()) {
      // Demo fallback: Return a local placeholder or blob URL
      return {
        success: true,
        url: "/images/1.png",
      };
    }

    const supabase = createAdminClient();
    const rawExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileExt = ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(rawExt)
      ? rawExt
      : "jpg";

    const cleanBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 35);

    const fileName = `${Date.now()}-${cleanBase || "upload"}.${fileExt}`;
    const filePath = fileName;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type || `image/${fileExt === "jpg" ? "jpeg" : fileExt}`,
        upsert: true,
      });

    if (uploadError) {
      console.error(`Storage upload error in bucket ${bucket}:`, uploadError);
      return { success: false, error: uploadError.message };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (err: any) {
    console.error("Storage upload exception:", err);
    return { success: false, error: err.message || "Gagal mengunggah gambar" };
  }
}

export async function deleteImageAction(
  filePath: string,
  bucket: string = "general"
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !filePath) {
    return { success: true };
  }

  try {
    const supabase = createAdminClient();
    let targetPath = filePath;

    // Handle full public URL extraction
    const publicUrlPrefix = `/storage/v1/object/public/${bucket}/`;
    if (targetPath.includes(publicUrlPrefix)) {
      targetPath = targetPath.split(publicUrlPrefix)[1];
    } else if (targetPath.startsWith("http://") || targetPath.startsWith("https://")) {
      const parts = targetPath.split("/");
      targetPath = parts[parts.length - 1];
    }

    const { error } = await supabase.storage.from(bucket).remove([targetPath]);
    if (error) {
      console.error("Delete image error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Delete image exception:", err);
    return { success: false, error: err.message || "Gagal menghapus gambar" };
  }
}
