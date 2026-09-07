"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = isScrolled || pathname !== "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isSolid
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Kebon Gede Venue"
              width={44}
              height={44}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg group-hover:scale-105 transition-transform"
            />
            <div>
              <span
                className={`font-heading text-lg sm:text-xl font-bold tracking-tight transition-colors block leading-tight ${
                  isSolid ? "text-forest-dark" : "text-white"
                }`}
              >
                Kebon Gede
              </span>
              <span
                className={`block text-[10px] sm:text-xs font-accent tracking-widest uppercase transition-colors ${
                  isSolid ? "text-gold" : "text-gold-light"
                }`}
              >
                Venue
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/10 ${
                  isSolid
                    ? "text-charcoal hover:text-forest hover:bg-forest/5"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gold hover:bg-gold-light text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Booking Inquiry</span>
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isSolid ? "text-charcoal hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 text-charcoal font-medium rounded-lg hover:bg-forest/5 hover:text-forest transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="block mx-4 mt-3 px-4 py-3 bg-gold text-white text-center font-semibold rounded-full hover:bg-gold-light transition-colors"
              >
                Booking Inquiry
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
