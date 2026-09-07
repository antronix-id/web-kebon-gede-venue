"use client";

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
  LogOut,
  ExternalLink,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Venues", href: "/admin/venues", icon: Building2 },
  { label: "Galeri", href: "/admin/gallery", icon: ImageIcon },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Pesan Masuk", href: "/admin/messages", icon: MessageSquare },
  { label: "Hero Slides", href: "/admin/hero-slides", icon: Sliders },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Pengaturan", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal text-white flex flex-col shrink-0 min-h-screen border-r border-white/10 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo & Close Button */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin/dashboard" onClick={onClose} className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Kebon Gede Admin"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div>
              <span className="font-heading text-base font-bold text-white block">
                Kebon Gede
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-accent block">
                CMS Admin
              </span>
            </div>
          </Link>

          {/* Close button on mobile/tablet */}
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
        {menuItems.map((item) => {
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
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile & Actions */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-gold" />
          <span>Lihat Website Publik</span>
        </Link>

        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-forest text-gold font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">Admin KG</p>
              <p className="text-[10px] text-gray-400">Super Admin</p>
            </div>
          </div>
          <Link
            href="/admin/login"
            className="text-gray-400 hover:text-red-400 transition-colors"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
    </>
  );
}
