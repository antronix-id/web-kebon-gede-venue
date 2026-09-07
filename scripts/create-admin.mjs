import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Read .env.local
const envContent = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
let supabaseUrl = "";
let serviceRoleKey = "";

for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (trimmed.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) {
    supabaseUrl = trimmed.substring("NEXT_PUBLIC_SUPABASE_URL=".length).trim();
  }
  if (trimmed.startsWith("SUPABASE_SERVICE_ROLE_KEY=")) {
    serviceRoleKey = trimmed.substring("SUPABASE_SERVICE_ROLE_KEY=".length).trim();
  }
}

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di .env.local");
  process.exit(1);
}

// Parse command line arguments
// Usage: node scripts/create-admin.mjs [email] [password] [fullName] [role]
const args = process.argv.slice(2);
const email = args[0] || "admin@kebongede.com";
const password = args[1] || "admin12345";
const fullName = args[2] || "Administrator Kebon Gede";
const role = args[3] || "super_admin";

console.log("==========================================");
console.log("  KEBON GEDE VENUE - CREATE ADMIN SCRIPT  ");
console.log("==========================================");
console.log(`Connecting to: ${supabaseUrl}`);
console.log(`Email    : ${email}`);
console.log(`Role     : ${role}`);
console.log(`Nama     : ${fullName}`);
console.log("------------------------------------------");

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  try {
    // 1. Check if user already exists in auth.users
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
      throw new Error(`Gagal membaca list user: ${listError.message}`);
    }

    const existingUser = usersData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    let userId = "";

    if (existingUser) {
      console.log(`User ${email} sudah terdaftar di Supabase Auth (ID: ${existingUser.id}).`);
      console.log("Memperbarui kata sandi dan metadata user...");
      
      const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        {
          password,
          email_confirm: true,
          user_metadata: {
            full_name: fullName,
            role,
          },
        }
      );

      if (updateError) {
        throw new Error(`Gagal mengupdate user auth: ${updateError.message}`);
      }

      userId = updatedUser.user.id;
      console.log("Kata sandi berhasil diperbarui!");
    } else {
      console.log(`Membuat user baru ${email} di Supabase Auth...`);
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          role,
        },
      });

      if (createError) {
        throw new Error(`Gagal membuat user auth: ${createError.message}`);
      }

      userId = newUser.user.id;
      console.log(`User berhasil dibuat di Supabase Auth (ID: ${userId})!`);
    }

    // 2. Upsert record in public.admin_users
    console.log("Mendaftarkan profil ke tabel public.admin_users...");
    const { error: profileError } = await supabase
      .from("admin_users")
      .upsert(
        {
          id: userId,
          email,
          full_name: fullName,
          role,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (profileError) {
      throw new Error(`Gagal menyimpan ke tabel admin_users: ${profileError.message}`);
    }

    console.log("Profil di tabel public.admin_users berhasil disimpan/diperbarui!");
    console.log("------------------------------------------");
    console.log("STATUS: SUKSES!");
    console.log(`Anda sekarang dapat login ke /admin/login dengan:`);
    console.log(`Email   : ${email}`);
    console.log(`Password: ${password}`);
    console.log("==========================================");
  } catch (err) {
    console.error("TERJADI KESALAHAN:", err.message || err);
    process.exit(1);
  }
}

main();
