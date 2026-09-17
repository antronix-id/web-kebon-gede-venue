"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/types";
import Lightbox from "./lightbox";

interface GalleryGridProps {
  items: GalleryItem[];
  showFilter?: boolean;
}

const categories = [
  { key: "all", label: "Semua" },
  { key: "wedding", label: "Wedding" },
  { key: "meeting", label: "Meeting" },
  { key: "outbound", label: "Outbound" },
  { key: "graduation", label: "Graduation" },
  { key: "corporate", label: "Corporate" },
];

export default function GalleryGrid({ items, showFilter = true }: GalleryGridProps) {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <>
      {/* Filter Tabs */}
      {showFilter && (
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center items-center gap-2 mb-8 sm:mb-10 px-2 pb-2 -mx-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 shrink-0 ${
                filter === cat.key
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105 font-bold"
                  : "bg-card text-card-foreground hover:bg-accent/20 hover:text-primary border border-border shadow-xs"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => setLightboxIndex(i)}
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/80 shadow-sm hover:shadow-xl transition-all duration-300">
              <Image
                src={item.image_url}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                  <p className="text-white/80 text-xs mt-1">{item.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered.map((item) => ({ src: item.image_url, alt: item.title, caption: item.description }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev! - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex((prev) => (prev! + 1) % filtered.length)}
        />
      )}
    </>
  );
}
