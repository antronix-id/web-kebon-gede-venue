"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { getSetting } from "@/lib/seed-data";

export default function CTASection() {
  const whatsappUrl = `https://wa.me/${
    getSetting("whatsapp")?.replace(/[^0-9]/g, "") || "6281234567890"
  }?text=Halo%20Kebon%20Gede%20Venue,%20saya%20ingin%20konsultasi%20mengenai%20sewa%20venue.`;

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-primary text-primary-foreground">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/18.png"
          alt="Kebon Gede Venue Senja"
          fill
          className="object-cover opacity-20 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/25 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 sm:mb-6">
            Reservasi & Konsultasi
          </span>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
            Siap Wujudkan Acara Impian Anda?
          </h2>

          <p className="text-primary-foreground/85 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Dapatkan pengalaman terbaik menyelenggarakan pernikahan, gathering, seminar, atau pesta di venue outdoor & indoor nomor satu di Palembang. Konsultasikan tanggal dan paket Anda sekarang.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-card hover:bg-card/90 text-card-foreground font-bold shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground font-semibold backdrop-blur-sm border border-primary-foreground/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
