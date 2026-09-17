"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { contactMessages } from "@/lib/seed-data";
import AdminSearchBar from "./search-bar";
import AdminUserDropdown from "./user-dropdown";
import ThemeToggle from "@/components/shared/theme-toggle";

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
    if (pathname.includes("/admin/users")) return "Admin";
    if (pathname.includes("/admin/settings")) return "Pengaturan Sistem";
    return "Admin CMS";
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30 transition-colors">
      {/* Left: Hamburger & Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="p-2 -ml-1 text-muted-foreground hover:text-foreground hover:bg-accent/30 rounded-xl lg:hidden transition-colors"
          aria-label="Buka Menu Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="truncate">
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-foreground truncate">{getPageTitle()}</h1>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Admin</span>
            <span>/</span>
            <span className="text-primary font-medium">{getPageTitle()}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Interactive Search Bar */}
        <AdminSearchBar />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Link
          href="/admin/messages"
          className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent/30 rounded-full transition-colors"
          title={`${unreadMessagesCount} Pesan Baru`}
        >
          <Bell className="w-4 h-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
          )}
        </Link>

        {/* User Profile & Dropdown */}
        <div className="pl-1 sm:pl-2 border-l border-border">
          <AdminUserDropdown />
        </div>
      </div>
    </header>
  );
}
