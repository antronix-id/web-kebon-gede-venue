"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  PlusCircle,
  Shield,
  ShieldCheck,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Lock,
} from "lucide-react";
import { getAdminUsers, deleteAdminUserAction, type AdminUserData } from "@/actions/users";
import { getCurrentAdminUser } from "@/actions/auth";
import { ADMIN_MENU_PERMISSIONS } from "@/lib/validations";
import { formatDateShort } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: string; role: string; permissions?: string[] } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const [userData, usersRes] = await Promise.all([
          getCurrentAdminUser(),
          getAdminUsers(),
        ]);

        if (userData) {
          setCurrentUser({ id: userData.id, role: userData.role, permissions: userData.permissions });
        }

        if (usersRes.success && usersRes.data) {
          setUsers(usersRes.data);
        }
      } catch (err) {
        console.error("Error loading users page:", err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  const handleDelete = async (user: AdminUserData) => {
    if (currentUser?.id === user.id) {
      alert("Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif!");
      return;
    }

    const confirmMsg = `Apakah Anda yakin ingin menghapus akun admin "${user.full_name}" (${user.email})? Tindakan ini tidak dapat dibatalkan.`;
    if (!confirm(confirmMsg)) return;

    setDeletingId(user.id);
    try {
      const res = await deleteAdminUserAction(user.id);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      } else {
        alert(res.error || "Gagal menghapus admin.");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus admin.");
    } finally {
      setDeletingId(null);
    }
  };

  // Check access permission
  const canAccessUsers = currentUser?.role === "super_admin" || (Array.isArray(currentUser?.permissions) && currentUser.permissions.includes("users"));
  if (!loading && currentUser && !canAccessUsers) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal mb-2">Akses Terbatas</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
          Menu <strong>Manajemen Pengguna</strong> memerlukan hak akses khusus dari Super Administrator.
        </p>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white text-sm font-semibold rounded-xl hover:bg-forest-dark transition-colors shadow-md shadow-forest/20"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalSuperAdmins = users.filter((u) => u.role === "super_admin").length;
  const totalRegularAdmins = users.filter((u) => u.role !== "super_admin").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
            <Users className="w-6 h-6 text-forest" />
            Manajemen Pengguna & Hak Akses
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Kelola akun administrator, atur peran, dan tentukan akses modul menu untuk setiap user.
          </p>
        </div>

        <Link
          href="/admin/users/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-forest text-white rounded-xl text-sm font-semibold hover:bg-forest-dark transition-all shadow-md shadow-forest/20 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-gold" />
          <span>Tambah Admin Baru</span>
        </Link>
      </div>

      {/* Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Total Administrator</span>
            <span className="text-2xl font-bold text-charcoal">{users.length}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-gold" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Super Admin (Full Access)</span>
            <span className="text-2xl font-bold text-charcoal">{totalSuperAdmins}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Admin Khusus (Custom Access)</span>
            <span className="text-2xl font-bold text-charcoal">{totalRegularAdmins}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau email admin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 rounded-xl border border-transparent focus:border-forest focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400 hidden sm:inline">Peran:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-forest text-charcoal font-medium"
          >
            <option value="all">Semua Peran</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin Biasa</option>
            <option value="editor">Editor</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-forest" />
            <p className="text-sm">Memuat data pengguna admin...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-charcoal">Tidak ada pengguna ditemukan</p>
            <p className="text-xs text-gray-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter peran.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Administrator</th>
                  <th className="py-3.5 px-5">Peran</th>
                  <th className="py-3.5 px-5">Hak Akses Modul Menu</th>
                  <th className="py-3.5 px-5">Terdaftar</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredUsers.map((user) => {
                  const isCurrent = currentUser?.id === user.id;
                  const isSuper = user.role === "super_admin";
                  const permCount = user.permissions?.length || 0;

                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* User Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-white ring-2 ring-forest/20 shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <Image
                              src={user.avatar_url || "/icon1.avif"}
                              alt={user.full_name}
                              width={36}
                              height={36}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-charcoal truncate block">
                                {user.full_name}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                                  Anda
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400 block truncate">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-5">
                        {isSuper ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gold/15 text-gold-dark border border-gold/30">
                            <ShieldCheck className="w-3 h-3 text-gold" />
                            Super Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            <Shield className="w-3 h-3" />
                            Admin
                          </span>
                        )}
                      </td>

                      {/* Permissions Breakdown */}
                      <td className="py-4 px-5">
                        {isSuper ? (
                          <div className="flex items-center gap-1.5 text-xs text-forest font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Akses Penuh (Seluruh Modul)</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-charcoal">
                                {permCount} dari {ADMIN_MENU_PERMISSIONS.length} Modul Aktif
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {user.permissions?.slice(0, 4).map((pKey) => {
                                const found = ADMIN_MENU_PERMISSIONS.find((m) => m.key === pKey);
                                return (
                                  <span
                                    key={pKey}
                                    className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium"
                                  >
                                    {found ? found.label.replace("Kelola ", "") : pKey}
                                  </span>
                                );
                              })}
                              {permCount > 4 && (
                                <span className="text-[10px] bg-forest/10 text-forest font-semibold px-1.5 py-0.5 rounded">
                                  +{permCount - 4} lainnya
                                </span>
                              )}
                              {permCount === 0 && (
                                <span className="text-[10px] text-red-500 italic">
                                  Tidak ada akses modul
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Created Date */}
                      <td className="py-4 px-5 text-xs text-gray-500">
                        {formatDateShort(user.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/users/${user.id}/edit`}
                            className="p-2 text-gray-500 hover:text-forest hover:bg-forest/10 rounded-lg transition-colors"
                            title="Edit Akun & Hak Akses"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            disabled={isCurrent || deletingId === user.id}
                            onClick={() => handleDelete(user)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                            title={isCurrent ? "Tidak dapat menghapus akun sendiri" : "Hapus Akun"}
                          >
                            {deletingId === user.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
