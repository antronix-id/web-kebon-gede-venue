"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Image as ImageIcon,
  Calendar,
  FileText,
  Star,
  MessageSquare,
  Sliders,
  HelpCircle,
  Settings,
  Users,
  X,
} from "lucide-react";
import { getCurrentAdminUser } from "@/actions/auth";

interface MenuItem {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ALL_MENU_ITEMS: MenuItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { key: "venues", label: "Venues", href: "/admin/venues", icon: Building2 },
  { key: "gallery", label: "Galeri", href: "/admin/gallery", icon: ImageIcon },
  { key: "events", label: "Events", href: "/admin/events", icon: Calendar },
  { key: "blog", label: "Blog", href: "/admin/blog", icon: FileText },
  { key: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { key: "messages", label: "Pesan Masuk", href: "/admin/messages", icon: MessageSquare },
  { key: "hero-slides", label: "Hero Slides", href: "/admin/hero-slides", icon: Sliders },
  { key: "faq", label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { key: "settings", label: "Pengaturan", href: "/admin/settings", icon: Settings },
  { key: "users", label: "Admin", href: "/admin/users", icon: Users },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<{ role: string; permissions: string[] } | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadUser() {
      try {
        const user = await getCurrentAdminUser();
        if (isMounted && user) {
          setCurrentUser({
            role: user.role,
            permissions: user.permissions || [],
          });
        }
      } catch (err) {
        console.error("Error loading user in sidebar:", err);
      }
    }
    loadUser();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter menus based on user role and permissions
  const visibleMenuItems = ALL_MENU_ITEMS.filter((item) => {
    if (!currentUser) return true;
    // Super admin has unrestricted access to all menus
    if (currentUser.role === "super_admin") return true;
    // Regular admin/editor can see any module permitted in their permissions
    return currentUser.permissions.includes(item.key);
  });

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal text-white flex flex-col shrink-0 h-screen border-r border-white/10 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo & Close Button */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin/dashboard" onClick={onClose} className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Kebon Gede Logo"
              width={36}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <div>
              <span className="font-serif text-lg font-bold tracking-wide text-white block">
                KEBON GEDE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold block font-sans">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg lg:hidden"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-forest text-white shadow-md shadow-forest/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-gold" : "text-gray-400"}`} />
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
