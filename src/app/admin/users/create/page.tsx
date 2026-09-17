"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  UserPlus,
  Shield,
  ShieldCheck,
  CheckSquare,
  Square,
  Lock,
  Mail,
  User,
  Key,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { createAdminUserAction } from "@/actions/users";
import { ADMIN_MENU_PERMISSIONS, ADMIN_MENU_KEYS } from "@/lib/validations";

export default function CreateAdminUserPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "super_admin">("admin");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "dashboard",
    "gallery",
    "events",
    "blog",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const togglePermission = (key: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const selectAll = () => {
    setSelectedPermissions([...ADMIN_MENU_KEYS]);
  };

  const deselectAll = () => {
    setSelectedPermissions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Mohon lengkapi semua bidang yang bertanda bintang (*).");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Kata sandi minimal 6 karakter.");
      return;
    }

    if (role === "admin" && selectedPermissions.length === 0) {
      setErrorMsg("Pilih minimal satu hak akses modul menu untuk admin.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createAdminUserAction({
        full_name: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        role,
        permissions: role === "super_admin" ? [...ADMIN_MENU_KEYS] : selectedPermissions,
      });

      if (res.success) {
        router.push("/admin/users");
      } else {
        setErrorMsg(res.error || "Gagal membuat akun admin.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan saat memproses data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back Link & Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/users"
          className="p-2 text-gray-500 hover:text-charcoal hover:bg-gray-100 rounded-xl transition-colors"
          title="Kembali ke Daftar Pengguna"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-forest" />
            Tambah Administrator Baru
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Daftarkan user admin baru dan konfigurasikan izin akses modul menu yang dapat diakses.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Gagal Menyimpan:</p>
            <p className="text-xs mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: User Account Information */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
            1. Informasi Akun Administrator
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Nama Lengkap *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Anggara"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Alamat Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@kebongede.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Kata Sandi (Password) *
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50 focus:bg-white transition-all"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Gunakan kombinasi kata sandi yang aman untuk akun administrator.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Role Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
            2. Tingkat Hak Akses / Peran (Role)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option: Admin Biasa */}
            <label
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                role === "admin"
                  ? "border-forest bg-forest/5 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="mt-1 text-forest focus:ring-forest"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-charcoal">
                  <Shield className="w-4 h-4 text-forest" />
                  <span>Admin Biasa (Custom Access)</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Akses menu dibatasi sesuai daftar modul yang Anda centang pada bagian di bawah.
                </p>
              </div>
            </label>

            {/* Option: Super Admin */}
            <label
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                role === "super_admin"
                  ? "border-gold bg-gold/5 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="super_admin"
                checked={role === "super_admin"}
                onChange={() => setRole("super_admin")}
                className="mt-1 text-gold focus:ring-gold"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-charcoal">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>Super Admin (Full Access)</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Memiliki akses penuh ke seluruh menu dan dapat mengelola user admin lainnya.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Permission Matrix */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                3. Matriks Hak Akses Modul Menu
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {role === "super_admin"
                  ? "Super Admin otomatis memiliki izin untuk seluruh modul berikut."
                  : "Pilih modul apa saja yang diizinkan untuk diakses oleh user ini."}
              </p>
            </div>

            {role === "admin" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="px-3 py-1 text-xs font-semibold text-forest hover:bg-forest/10 rounded-lg transition-colors"
                >
                  Pilih Semua
                </button>
                <span className="text-gray-300">•</span>
                <button
                  type="button"
                  onClick={deselectAll}
                  className="px-3 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hapus Semua
                </button>
              </div>
            )}
          </div>

          {/* Grid of Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {ADMIN_MENU_PERMISSIONS.map((perm) => {
              const isChecked = role === "super_admin" || selectedPermissions.includes(perm.key);
              const isDisabled = role === "super_admin";

              return (
                <div
                  key={perm.key}
                  onClick={() => {
                    if (!isDisabled) togglePermission(perm.key);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    isDisabled
                      ? "bg-gray-50 border-gray-200 cursor-not-allowed opacity-80"
                      : isChecked
                      ? "bg-forest/5 border-forest/40 cursor-pointer shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-300 cursor-pointer"
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-forest" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-bold text-charcoal block leading-tight">
                      {perm.label}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {perm.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/users"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Batal
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-dark transition-all shadow-md shadow-forest/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Admin Baru</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
