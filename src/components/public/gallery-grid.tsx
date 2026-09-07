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
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                filter === cat.key
                  ? "bg-forest text-white shadow-lg shadow-forest/25"
                  : "bg-white text-gray-600 hover:bg-forest/5 hover:text-forest border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
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
            <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
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
                  <p className="text-white/70 text-xs mt-1">{item.description}</p>
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
