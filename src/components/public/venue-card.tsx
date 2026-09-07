"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import type { Venue } from "@/types";
import { getVenueTypeBadge, formatNumber } from "@/lib/utils";

interface VenueCardProps {
  venue: Venue;
  index?: number;
}

export default function VenueCard({ venue, index = 0 }: VenueCardProps) {
  const badge = getVenueTypeBadge(venue.venue_type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link href={`/venues/${venue.slug}`} className="group block h-full">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-gray-100 flex flex-col h-full">
          {/* Image */}
          <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden shrink-0">
            <Image
              src={venue.hero_image_url}
              alt={venue.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full shadow-sm ${badge.color}`}>
              {badge.label}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal mb-1.5 sm:mb-2 group-hover:text-forest transition-colors">
                {venue.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                {venue.short_description}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest shrink-0" />
                <span>{formatNumber(venue.capacity_min)} - {formatNumber(venue.capacity_max)} orang</span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gold group-hover:text-forest transition-colors">
                Detail
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
