"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, Award, Calendar } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: typeof Sparkles;
}

const defaultStats: StatItem[] = [
  {
    value: "1 Hektar",
    label: "Luas Area Venue",
    description: "Ruang terbuka hijau alami yang asri & luas",
    icon: Sparkles,
  },
  {
    value: "2,000+",
    label: "Kapasitas Maksimal",
    description: "Mampu menampung tamu dalam skala besar",
    icon: Users,
  },
  {
    value: "500+",
    label: "Event Terselenggara",
    description: "Pernikahan, gathering, outbound, & konser",
    icon: Calendar,
  },
  {
    value: "100%",
    label: "Kepuasan Klien",
    description: "Didukung fasilitas lengkap & tim profesional",
    icon: Award,
  },
];

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
      {defaultStats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl text-center text-white relative group hover:bg-white/15 transition-all"
          >
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-3 sm:mb-5 text-gold group-hover:scale-110 transition-transform">
              <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1 sm:mb-2">
              {stat.value}
            </div>
            <div className="font-semibold text-gold-light text-xs sm:text-base mb-1">
              {stat.label}
            </div>
            <p className="text-gray-200 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
              {stat.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
