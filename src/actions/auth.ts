"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function loginAdminAction(input: LoginInput) {
  const result = loginSchema.safeParse(input);
  if (!result.success) {
    return {
      success: false,
      error: "Email atau kata sandi tidak valid.",
    };
  }

  const { email, password } = result.data;

  // If Supabase is configured, authenticate with Supabase Auth
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Gagal masuk. Periksa email dan password Anda.",
      };
    }

    return {
      success: true,
      user: data.user,
    };
  }

  // Graceful fallback for local demo mode
  if (email === "admin@kebongede.com" && password === "admin12345") {
    return {
      success: true,
      user: {
        id: "demo-admin-id",
        email: "admin@kebongede.com",
        user_metadata: { full_name: "Admin Kebon Gede" },
      },
    };
  }

  return {
    success: false,
    error: "Email atau password demo salah. Gunakan admin@kebongede.com / admin12345",
  };
}

export async function logoutAdminAction() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}

export async function getCurrentAdminUser() {
  if (!isSupabaseConfigured()) {
    return {
      id: "demo-admin-id",
      email: "admin@kebongede.com",
      full_name: "Administrator Demo",
      role: "super_admin",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch admin_users profile
  const { data: profile } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email || "",
    full_name: profile?.full_name || user.user_metadata?.full_name || "Admin",
    role: profile?.role || "admin",
    avatar_url: profile?.avatar_url || null,
  };
}
