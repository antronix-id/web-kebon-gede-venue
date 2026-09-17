"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import ThemeToggle from "@/components/shared/theme-toggle";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Venue", href: "/venues" },
  { label: "Galeri", href: "/gallery" },
  { label: "Event", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Kontak", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Auto close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  const isSolid = isScrolled || pathname !== "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid
            ? "bg-card/95 backdrop-blur-md shadow-md border-b border-border/80 text-foreground"
            : "bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <Image
                src="/images/logo.png"
                alt="Kebon Gede Venue"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg group-hover:scale-105 transition-transform"
              />
              <div>
                <span
                  className={`font-heading text-base sm:text-lg lg:text-xl font-bold tracking-tight transition-colors block leading-tight ${
                    isSolid ? "text-foreground" : "text-white"
                  }`}
                >
                  Kebon Gede
                </span>
                <span
                  className={`block text-[9px] sm:text-[11px] font-accent tracking-widest uppercase transition-colors ${
                    isSolid ? "text-primary font-semibold" : "text-gold-light"
                  }`}
                >
                  Venue
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? isSolid
                          ? "text-primary bg-primary/15 font-bold"
                          : "text-gold-light bg-white/10 font-bold"
                        : isSolid
                        ? "text-foreground/80 hover:text-primary hover:bg-primary/5"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Theme Toggle + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle className="shrink-0" />

              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Booking Inquiry</span>
              </Link>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden p-2 rounded-xl transition-colors ${
                  isSolid
                    ? "text-foreground hover:bg-accent/30"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label={isMobileOpen ? "Tutup menu" : "Buka menu"}
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-card/98 backdrop-blur-xl border-t border-border shadow-2xl overflow-hidden max-h-[calc(100dvh-4rem)] overflow-y-auto"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-primary/15 text-primary font-bold"
                          : "text-foreground hover:bg-accent/20 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-3 pb-1 border-t border-border/60 flex items-center justify-between px-2">
                  <span className="text-xs text-muted-foreground font-medium">Mode Tampilan:</span>
                  <ThemeToggle showLabel />
                </div>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileOpen(false)}
                    className="block w-full py-3 bg-primary text-primary-foreground text-center font-bold text-sm rounded-xl shadow-md hover:bg-primary/90 transition-colors"
                  >
                    Booking Inquiry Sekarang
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </>
  );
}
