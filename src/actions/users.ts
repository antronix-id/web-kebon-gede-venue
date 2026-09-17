"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentAdminUser } from "@/actions/auth";
import {
  createAdminUserSchema,
  updateAdminUserSchema,
  type CreateAdminUserInput,
  type UpdateAdminUserInput,
  ADMIN_MENU_KEYS,
} from "@/lib/validations";

export interface AdminUserData {
  id: string;
  email: string;
  full_name: string;
  role: "super_admin" | "admin" | "editor";
  avatar_url?: string | null;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

// Fallback demo users for preview or when Supabase is disconnected
let demoAdminUsers: AdminUserData[] = [
  {
    id: "demo-admin-id",
    email: "admin@kebongede.com",
    full_name: "Administrator Kebon Gede",
    role: "super_admin",
    avatar_url: "/icon1.avif",
    permissions: [...ADMIN_MENU_KEYS],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-editor-id",
    email: "editor@kebongede.com",
    full_name: "Staff Dokumentasi & Blog",
    role: "admin",
    avatar_url: "/icon1.avif",
    permissions: ["dashboard", "gallery", "blog", "events"],
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function canManageUsers(user: { role: string; permissions: string[] } | null | undefined): boolean {
  if (!user) return false;
  return user.role === "super_admin" || (Array.isArray(user.permissions) && user.permissions.includes("users"));
}

/**
 * Fetch all admin users
 */
export async function getAdminUsers(): Promise<{ success: boolean; data?: AdminUserData[]; error?: string }> {
  try {
    const currentUser = await getCurrentAdminUser();
    if (!currentUser || !canManageUsers(currentUser)) {
      return { success: false, error: "Akses ditolak. Anda tidak memiliki izin untuk mengelola pengguna." };
    }

    if (!isSupabaseConfigured()) {
      return { success: true, data: demoAdminUsers };
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching admin_users:", error);
      return { success: false, error: error.message };
    }

    const formattedUsers: AdminUserData[] = (data || []).map((u) => ({
      id: u.id,
      email: u.email,
      full_name: u.full_name,
      role: u.role,
      avatar_url: u.avatar_url || "/icon1.avif",
      permissions: Array.isArray(u.permissions) ? u.permissions : [...ADMIN_MENU_KEYS],
      created_at: u.created_at,
      updated_at: u.updated_at,
    }));

    return { success: true, data: formattedUsers };
  } catch (err: any) {
    console.error("getAdminUsers exception:", err);
    return { success: false, error: err.message || "Gagal memuat daftar admin." };
  }
}

/**
 * Get single admin user by ID
 */
export async function getAdminUserById(id: string): Promise<{ success: boolean; data?: AdminUserData; error?: string }> {
  try {
    const currentUser = await getCurrentAdminUser();
    if (!currentUser || !canManageUsers(currentUser)) {
      return { success: false, error: "Akses ditolak." };
    }

    if (!isSupabaseConfigured()) {
      const found = demoAdminUsers.find((u) => u.id === id);
      if (!found) return { success: false, error: "Pengguna tidak ditemukan." };
      return { success: true, data: found };
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return { success: false, error: error?.message || "Pengguna tidak ditemukan." };
    }

    return {
      success: true,
      data: {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        avatar_url: data.avatar_url || "/icon1.avif",
        permissions: Array.isArray(data.permissions) ? data.permissions : [...ADMIN_MENU_KEYS],
        created_at: data.created_at,
        updated_at: data.updated_at,
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Gagal mengambil data pengguna." };
  }
}

/**
 * Create a new admin user (Auth User + public.admin_users record)
 */
export async function createAdminUserAction(input: CreateAdminUserInput) {
  try {
    const currentUser = await getCurrentAdminUser();
    if (!currentUser || !canManageUsers(currentUser)) {
      return { success: false, error: "Akses ditolak. Anda tidak memiliki izin untuk menambah pengguna baru." };
    }

    const parsed = createAdminUserSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || "Input data tidak valid." };
    }

    const { email, password, full_name, role, permissions } = parsed.data;

    // Super admin always has full permissions
    const finalPermissions = role === "super_admin" ? [...ADMIN_MENU_KEYS] : permissions;

    if (!isSupabaseConfigured()) {
      const newUser: AdminUserData = {
        id: `demo-user-${Date.now()}`,
        email,
        full_name,
        role,
        permissions: finalPermissions,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      demoAdminUsers.unshift(newUser);
      revalidatePath("/admin/users");
      return { success: true, data: newUser };
    }

    const supabaseAdmin = createAdminClient();

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        role,
      },
    });

    if (authError || !authData.user) {
      return { success: false, error: authError?.message || "Gagal membuat akun autentikasi." };
    }

    const userId = authData.user.id;

    // 2. Insert into public.admin_users table
    const { error: profileError } = await supabaseAdmin.from("admin_users").upsert({
      id: userId,
      email,
      full_name,
      role,
      permissions: finalPermissions,
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      // Rollback auth user if profile insert failed
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return { success: false, error: `Gagal membuat profil admin: ${profileError.message}` };
    }

    revalidatePath("/admin/users");
    revalidatePath("/admin");
    return { success: true, userId };
  } catch (err: any) {
    console.error("createAdminUserAction exception:", err);
    return { success: false, error: err.message || "Gagal menambahkan admin baru." };
  }
}

/**
 * Update an existing admin user profile, role, permissions, and optional password
 */
export async function updateAdminUserAction(id: string, input: UpdateAdminUserInput) {
  try {
    const currentUser = await getCurrentAdminUser();
    if (!currentUser || !canManageUsers(currentUser)) {
      return { success: false, error: "Akses ditolak. Anda tidak memiliki izin untuk mengubah data pengguna." };
    }

    const parsed = updateAdminUserSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || "Data tidak valid." };
    }

    const { full_name, role, password, permissions } = parsed.data;
    const finalPermissions = role === "super_admin" ? [...ADMIN_MENU_KEYS] : permissions;

    if (!isSupabaseConfigured()) {
      const idx = demoAdminUsers.findIndex((u) => u.id === id);
      if (idx >= 0) {
        demoAdminUsers[idx] = {
          ...demoAdminUsers[idx],
          full_name,
          role,
          permissions: finalPermissions,
          updated_at: new Date().toISOString(),
        };
      }
      revalidatePath("/admin/users");
      return { success: true };
    }

    const supabaseAdmin = createAdminClient();

    // 1. Update public.admin_users
    const { error: profileError } = await supabaseAdmin
      .from("admin_users")
      .update({
        full_name,
        role,
        permissions: finalPermissions,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    // 2. Update auth user metadata or password if provided
    const authUpdatePayload: { password?: string; user_metadata: { full_name: string; role: string } } = {
      user_metadata: { full_name, role },
    };
    if (password && password.trim().length >= 6) {
      authUpdatePayload.password = password.trim();
    }

    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, authUpdatePayload);
    if (authError) {
      console.warn("Notice: Auth update returned error:", authError.message);
    }

    revalidatePath("/admin/users");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    console.error("updateAdminUserAction exception:", err);
    return { success: false, error: err.message || "Gagal memperbarui data admin." };
  }
}

/**
 * Delete an admin user
 */
export async function deleteAdminUserAction(id: string) {
  try {
    const currentUser = await getCurrentAdminUser();
    if (!currentUser || !canManageUsers(currentUser)) {
      return { success: false, error: "Akses ditolak. Anda tidak memiliki izin untuk menghapus pengguna." };
    }

    if (currentUser.id === id) {
      return { success: false, error: "Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif." };
    }

    if (!isSupabaseConfigured()) {
      demoAdminUsers = demoAdminUsers.filter((u) => u.id !== id);
      revalidatePath("/admin/users");
      return { success: true };
    }

    const supabaseAdmin = createAdminClient();

    // Delete from public.admin_users
    await supabaseAdmin.from("admin_users").delete().eq("id", id);

    // Delete from auth.users
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) {
      console.warn("Delete auth user error:", error.message);
    }

    revalidatePath("/admin/users");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    console.error("deleteAdminUserAction exception:", err);
    return { success: false, error: err.message || "Gagal menghapus pengguna." };
  }
}
