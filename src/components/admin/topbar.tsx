"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Search, User, Menu } from "lucide-react";
import { contactMessages } from "@/lib/seed-data";

interface AdminTopbarProps {
  onOpenSidebar?: () => void;
}

export default function AdminTopbar({ onOpenSidebar }: AdminTopbarProps) {
  const pathname = usePathname();
  const unreadMessagesCount = contactMessages.filter((m) => m.status === "new").length;

  const getPageTitle = () => {
    if (pathname.includes("/admin/dashboard")) return "Dashboard Overview";
    if (pathname.includes("/admin/venues")) return "Kelola Venues";
    if (pathname.includes("/admin/gallery")) return "Kelola Galeri";
    if (pathname.includes("/admin/events")) return "Kelola Events";
    if (pathname.includes("/admin/blog")) return "Kelola Blog & Artikel";
    if (pathname.includes("/admin/testimonials")) return "Kelola Testimonials";
    if (pathname.includes("/admin/messages")) return "Pesan Masuk (Inbox)";
    if (pathname.includes("/admin/hero-slides")) return "Kelola Hero Slides";
    if (pathname.includes("/admin/faq")) return "Kelola FAQ";
    if (pathname.includes("/admin/settings")) return "Pengaturan Sistem";
    return "Admin CMS";
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
      {/* Left: Hamburger & Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="p-2 -ml-1 text-gray-600 hover:text-charcoal hover:bg-gray-100 rounded-xl lg:hidden"
          aria-label="Buka Menu Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="truncate">
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-charcoal truncate">{getPageTitle()}</h1>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
            <span>Admin</span>
            <span>/</span>
            <span className="text-forest font-medium">{getPageTitle()}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari di CMS..."
            className="pl-9 pr-4 py-1.5 text-xs rounded-full border border-gray-200 focus:outline-none focus:border-forest w-48 transition-all"
          />
        </div>

        {/* Notifications */}
        <Link
          href="/admin/messages"
          className="relative p-2 text-gray-500 hover:text-charcoal hover:bg-gray-100 rounded-full transition-colors"
          title={`${unreadMessagesCount} Pesan Baru`}
        >
          <Bell className="w-4 h-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          )}
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-charcoal hidden md:inline">
            Administrator
          </span>
        </div>
      </div>
    </header>
  );
}
