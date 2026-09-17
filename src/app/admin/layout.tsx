"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import AdminSidebar from "@/components/admin/sidebar";
import AdminTopbar from "@/components/admin/topbar";
import { getCurrentAdminUser } from "@/actions/auth";

interface AdminUserSession {
  id: string;
  email: string;
  full_name: string;
  role: string;
  permissions: string[];
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUserSession | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    let isMounted = true;
    async function loadUser() {
      try {
        const user = await getCurrentAdminUser();
        if (isMounted && user) {
          setCurrentUser(user);
        }
      } catch (err) {
        console.error("Error checking admin user permissions:", err);
      } finally {
        if (isMounted) setLoadingUser(false);
      }
    }

    loadUser();
    return () => {
      isMounted = false;
    };
  }, [isLoginPage]);

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        {children}
      </div>
    );
  }

  // Determine if current route is allowed for the user
  const checkAccess = (): { allowed: boolean; moduleName?: string } => {
    if (loadingUser || !currentUser) return { allowed: true };

    // Super Admin has unrestricted access to everything
    if (currentUser.role === "super_admin") return { allowed: true };

    const routeModuleMap: { prefix: string; key: string; name: string }[] = [
      { prefix: "/admin/users", key: "users", name: "Manajemen Pengguna" },
      { prefix: "/admin/venues", key: "venues", name: "Kelola Venues" },
      { prefix: "/admin/gallery", key: "gallery", name: "Kelola Galeri" },
      { prefix: "/admin/events", key: "events", name: "Kelola Events" },
      { prefix: "/admin/blog", key: "blog", name: "Kelola Blog & Artikel" },
      { prefix: "/admin/testimonials", key: "testimonials", name: "Kelola Testimonials" },
      { prefix: "/admin/messages", key: "messages", name: "Pesan Masuk" },
      { prefix: "/admin/hero-slides", key: "hero-slides", name: "Kelola Hero Slides" },
      { prefix: "/admin/faq", key: "faq", name: "Kelola FAQ" },
      { prefix: "/admin/settings", key: "settings", name: "Pengaturan Sistem" },
      { prefix: "/admin/dashboard", key: "dashboard", name: "Dashboard Overview" },
    ];

    for (const item of routeModuleMap) {
      if (pathname === item.prefix || pathname.startsWith(`${item.prefix}/`)) {
        const hasPerm = currentUser.permissions.includes(item.key);
        if (!hasPerm) {
          return { allowed: false, moduleName: item.name };
        }
      }
    }

    return { allowed: true };
  };

  const access = checkAccess();

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      {/* Admin Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {!access.allowed ? (
            <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-50/50">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-charcoal">Akses Menu Dibatasi</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                  Akun Anda tidak memiliki hak akses untuk modul{" "}
                  <strong className="text-charcoal font-semibold">{access.moduleName}</strong>.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Silakan hubungi Super Administrator untuk meminta penambahan izin pada akun Anda.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-forest-dark transition-all shadow-md shadow-forest/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Halaman Utama</span>
                </Link>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
