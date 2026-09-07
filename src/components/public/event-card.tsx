"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { EventItem } from "@/types";

interface EventCardProps {
  event: EventItem;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const typeLabels: Record<string, string> = {
    wedding: "Wedding",
    meeting: "Meeting",
    outbound: "Outbound",
    graduation: "Graduation",
    corporate: "Corporate",
    other: "Other",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/events/${event.slug}`} className="group block h-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
          <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden shrink-0">
            <Image
              src={event.cover_image_url}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
              <span className="px-2.5 sm:px-3 py-1 bg-forest/90 text-white text-[11px] sm:text-xs font-semibold rounded-full backdrop-blur-sm shadow-sm">
                {typeLabels[event.event_type] || event.event_type}
              </span>
            </div>
          </div>
          <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 sm:mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold" />{formatDate(event.event_date)}</span>
                {event.venue_name && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gold" />{event.venue_name}</span>}
              </div>
              <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal mb-1.5 sm:mb-2 group-hover:text-forest transition-colors line-clamp-2">
                {event.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">{event.description}</p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gold group-hover:text-forest transition-colors">
                Selengkapnya <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
