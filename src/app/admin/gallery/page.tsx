"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusCircle, Trash2, Star, Filter, Upload } from "lucide-react";
import { galleryItems as initialGallery } from "@/lib/seed-data";
import type { GalleryCategory, GalleryItem } from "@/types";

const categories: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Wedding", value: "wedding" },
  { label: "Meeting", value: "meeting" },
  { label: "Outbound", value: "outbound" },
  { label: "Graduation", value: "graduation" },
  { label: "Corporate", value: "corporate" },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(initialGallery);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<GalleryCategory>("wedding");
  const [newImageUrl, setNewImageUrl] = useState("/images/1.png");

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const toggleFeatured = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_featured: !item.is_featured } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: GalleryItem = {
      id: `gallery-${Date.now()}`,
      title: newTitle || "Foto Galeri Baru",
      description: "Dokumentasi acara di Kebon Gede Venue",
      category: newCategory,
      image_url: newImageUrl,
      is_featured: false,
      display_order: items.length + 1,
      created_at: new Date().toISOString(),
    };
    setItems([newItem, ...items]);
    setShowUploadModal(false);
    setNewTitle("");
  };

  return (
    <div className="space-y-6">
      {/* Header & Upload CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Galeri Media
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Total {items.length} foto terdaftar di database galeri
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Foto Baru</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeCategory === cat.value
                ? "bg-forest text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"
          >
            <div className="relative h-44 overflow-hidden bg-gray-100">
              <Image
                src={item.image_url}
                alt={item.title || "Foto Galeri"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
              <button
                onClick={() => toggleFeatured(item.id)}
                className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-colors ${
                  item.is_featured
                    ? "bg-gold text-white"
                    : "bg-black/40 text-white hover:bg-gold/80"
                }`}
                title={item.is_featured ? "Hapus dari Featured" : "Jadikan Featured"}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div className="truncate mr-2">
                <p className="text-xs font-semibold text-charcoal truncate">
                  {item.title || "Tanpa Judul"}
                </p>
                <p className="text-[10px] text-gray-400">order: {item.display_order}</p>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus Foto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <h3 className="font-heading text-xl font-bold text-charcoal mb-4">
              Tambah Foto ke Galeri
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Judul Foto
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Resepsi Adat Palembang"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Kategori
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as GalleryCategory)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                >
                  <option value="wedding">Wedding</option>
                  <option value="meeting">Meeting</option>
                  <option value="outbound">Outbound</option>
                  <option value="graduation">Graduation</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Path File / URL Gambar
                </label>
                <input
                  type="text"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="/images/1.png"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-forest hover:bg-forest-dark rounded-xl"
                >
                  Simpan ke Galeri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
