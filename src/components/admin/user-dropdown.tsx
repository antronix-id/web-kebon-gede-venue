"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  ShieldCheck,
  Mail,
  ExternalLink,
  MessageSquare,
  X,
  Clock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { getCurrentAdminUser, logoutAdminAction } from "@/actions/auth";

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string | null;
}

export default function AdminUserDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser>({
    id: "admin",
    email: "admin@kebongede.com",
    full_name: "Administrator",
    role: "super_admin",
  });
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch logged in admin user info
  useEffect(() => {
    let isMounted = true;
    async function loadUser() {
      try {
        const user = await getCurrentAdminUser();
        if (isMounted && user) {
          setAdminUser(user);
        }
      } catch (err) {
        console.error("Error fetching admin user:", err);
      } finally {
        if (isMounted) setIsLoadingUser(false);
      }
    }
    loadUser();
    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowProfileModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAdminAction();
    } catch (err) {
      // If Next.js redirect triggers as error/navigation
      router.push("/admin/login");
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest/20"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* Avatar Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center ring-2 ring-forest/30 transition-transform group-hover:scale-105 overflow-hidden shadow-sm">
              <Image
                src={adminUser.avatar_url || "/icon1.avif"}
                alt={adminUser.full_name || "Administrator"}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online Indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          {/* User Name & Role */}
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-charcoal leading-tight truncate max-w-[130px]">
              {adminUser.full_name || "Administrator"}
            </span>
            <span className="text-[10px] text-gray-500 capitalize leading-tight">
              {adminUser.role === "super_admin" ? "Super Admin" : "Admin"}
            </span>
          </div>

          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-forest" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
            {/* Header: Profile Card Preview */}
            <div className="px-4 py-3.5 border-b border-gray-100 bg-gradient-to-br from-cream/40 to-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md shadow-forest/20 overflow-hidden ring-2 ring-gold/40">
                    <Image
                      src={adminUser.avatar_url || "/icon1.avif"}
                      alt={adminUser.full_name || "Administrator"}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-charcoal truncate">
                    {adminUser.full_name || "Administrator"}
                  </p>
                  <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{adminUser.email || "admin@kebongede.com"}</span>
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <ShieldCheck className="w-3 h-3" />
                      {adminUser.role === "super_admin" ? "Super Admin" : "Administrator"}
                    </span>
                    <span className="text-[10px] text-gray-400">• Aktif</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-1.5 space-y-0.5">
              {/* Option: View Profile Modal */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setShowProfileModal(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-charcoal hover:bg-forest/5 hover:text-forest transition-colors text-left group"
              >
                <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-forest/10 flex items-center justify-center text-gray-600 group-hover:text-forest transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span>Lihat Profil Admin</span>
                  <p className="text-[10px] font-normal text-gray-400">Informasi detail akun & peran</p>
                </div>
              </button>

              {/* Option: Settings */}
              <Link
                href="/admin/settings"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-charcoal hover:bg-forest/5 hover:text-forest transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-forest/10 flex items-center justify-center text-gray-600 group-hover:text-forest transition-colors">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span>Pengaturan Sistem & SEO</span>
                  <p className="text-[10px] font-normal text-gray-400">Kontak, sosial media & meta</p>
                </div>
              </Link>

              {/* Option: Messages */}
              <Link
                href="/admin/messages"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-charcoal hover:bg-forest/5 hover:text-forest transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-forest/10 flex items-center justify-center text-gray-600 group-hover:text-forest transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span>Pesan Masuk Klien</span>
                  <p className="text-[10px] font-normal text-gray-400">Inquiry booking & pertanyaan</p>
                </div>
              </Link>

              {/* Option: Public Site */}
              <Link
                href="/"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-charcoal transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <span>Lihat Website Publik</span>
                  <p className="text-[10px] font-normal text-gray-400">Buka halaman utama venue</p>
                </div>
              </Link>
            </div>

            {/* Divider */}
            <div className="my-1 border-t border-gray-100" />

            {/* Logout Action */}
            <div className="p-1.5">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50 group"
              >
                <div className="w-7 h-7 rounded-lg bg-red-100/60 group-hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors">
                  {isLoggingOut ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <span>{isLoggingOut ? "Sedang Keluar..." : "Keluar dari Panel (Logout)"}</span>
                  <p className="text-[10px] font-normal text-red-400">Akhiri sesi administrator</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Admin Profile Detail Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-forest to-forest-dark p-6 text-white">
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Tutup Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-gold overflow-hidden">
                    <Image
                      src={adminUser.avatar_url || "/icon1.avif"}
                      alt={adminUser.full_name || "Administrator"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-forest rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-snug">{adminUser.full_name}</h3>
                  <p className="text-xs text-white/80">{adminUser.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gold/20 text-gold border border-gold/40">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {adminUser.role === "super_admin" ? "Super Administrator" : "Administrator"}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Informasi Akun Administrator
              </h4>

              <div className="grid grid-cols-1 gap-3">
                <div className="p-3.5 rounded-2xl bg-cream/30 border border-gray-100 flex items-start gap-3">
                  <User className="w-4 h-4 text-forest mt-0.5" />
                  <div>
                    <span className="text-[11px] font-medium text-gray-500">Nama Tampilan</span>
                    <p className="text-sm font-semibold text-charcoal">{adminUser.full_name}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream/30 border border-gray-100 flex items-start gap-3">
                  <Mail className="w-4 h-4 text-forest mt-0.5" />
                  <div>
                    <span className="text-[11px] font-medium text-gray-500">Alamat Email</span>
                    <p className="text-sm font-semibold text-charcoal">{adminUser.email}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream/30 border border-gray-100 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-forest mt-0.5" />
                  <div>
                    <span className="text-[11px] font-medium text-gray-500">Tingkat Hak Akses</span>
                    <p className="text-sm font-semibold text-charcoal">
                      {adminUser.role === "super_admin"
                        ? "Super Administrator (Full Access CRUD)"
                        : "Administrator"}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream/30 border border-gray-100 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-forest mt-0.5" />
                  <div>
                    <span className="text-[11px] font-medium text-gray-500">Status Sesi Saat Ini</span>
                    <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Aktif & Terautentikasi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-charcoal hover:bg-gray-200/70 transition-colors"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href="/admin/settings"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest text-white hover:bg-forest-dark transition-colors flex items-center gap-1.5 shadow-md shadow-forest/20"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Pengaturan Akun
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
