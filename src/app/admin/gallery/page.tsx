"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  PlusCircle,
  Trash2,
  Star,
  Filter,
  Pencil,
  Loader2,
  X,
} from "lucide-react";
import { galleryItems as fallbackGallery } from "@/lib/seed-data";
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  toggleGalleryFeatured,
} from "@/actions/gallery";
import { ImageUpload } from "@/components/admin/image-upload";
import { STORAGE_BUCKETS, GALLERY_CATEGORIES } from "@/lib/constants";
import type { GalleryCategory, GalleryItem } from "@/types";

const categories = [
  { label: "Semua Kategori", value: "all" as const },
  ...GALLERY_CATEGORIES,
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(fallbackGallery);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Item State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<GalleryCategory>("wedding");
  const [newImageUrl, setNewImageUrl] = useState("/images/1.png");
  const [newDisplayOrder, setNewDisplayOrder] = useState(1);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getGalleryItems("all");
        if (data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    const nextFeatured = !currentFeatured;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_featured: nextFeatured } : item
      )
    );
    try {
      await toggleGalleryFeatured(id, nextFeatured);
    } catch (err) {
      console.error("Error toggling featured:", err);
    }
  };

  const handleDelete = async (id: string, title?: string | null) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus foto "${title || "ini"}"?`)) return;

    try {
      const res = await deleteGalleryItem(id);
      if (res.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.error || "Gagal menghapus item galeri");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus foto");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await createGalleryItem({
        title: newTitle || "Foto Galeri Kebon Gede",
        description: "Dokumentasi acara di Kebon Gede Venue",
        category: newCategory,
        image_url: newImageUrl,
        is_featured: false,
        display_order: Number(newDisplayOrder) || items.length + 1,
      });

      if (res.success && res.data) {
        setItems([res.data as GalleryItem, ...items]);
        setShowUploadModal(false);
        setNewTitle("");
        setNewImageUrl("/images/1.png");
      } else {
        alert(res.error || "Gagal menambahkan foto ke galeri");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan foto galeri");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSubmitting(true);
    try {
      const res = await updateGalleryItem(editingItem.id, {
        title: editingItem.title || null,
        category: editingItem.category,
        image_url: editingItem.image_url,
        display_order: Number(editingItem.display_order) || 1,
        is_featured: editingItem.is_featured,
      });

      if (res.success) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? { ...item, ...editingItem } : item
          )
        );
        setEditingItem(null);
      } else {
        alert(res.error || "Gagal memperbarui item galeri");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan perubahan galeri");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Galeri Dokumentasi
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Kumpulan foto-foto momen wedding, event, dan fasilitas Kebon Gede
          </p>
        </div>

        <button
          onClick={() => {
            setNewDisplayOrder(items.length + 1);
            setShowUploadModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Foto Baru</span>
        </button>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100">
        <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setActiveCategory(c.value as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === c.value
                ? "bg-forest text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-forest" />
          <p className="text-xs">Memuat galeri...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 text-gray-400 text-xs">
          Tidak ada foto dalam kategori ini. Silakan klik &quot;Tambah Foto Baru&quot;.
        </div>
      ) : (
        /* Gallery Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:border-forest/30 transition-all"
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
                  onClick={() => handleToggleFeatured(item.id, item.is_featured)}
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

              <div className="p-3 flex items-center justify-between gap-1">
                <div className="truncate mr-2 flex-1">
                  <p className="text-xs font-semibold text-charcoal truncate">
                    {item.title || "Tanpa Judul"}
                  </p>
                  <p className="text-[10px] text-gray-400">Order: {item.display_order}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-1.5 text-gray-500 hover:text-forest hover:bg-forest/10 rounded-lg transition-colors"
                    title="Edit Foto"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus Foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tambah Foto */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Tambah Foto Galeri Baru
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Judul Foto / Acara
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Resepsi Sarah & Dimas"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Kategori
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <ImageUpload
                label="Unggah Foto Galeri"
                value={newImageUrl}
                onChange={(url) => setNewImageUrl(url)}
                bucket={STORAGE_BUCKETS.GALLERY}
                aspectRatio="video"
                required
              />

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Urutan Tampilan (Display Order)
                </label>
                <input
                  type="number"
                  min={1}
                  value={newDisplayOrder}
                  onChange={(e) => setNewDisplayOrder(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-forest hover:bg-forest-dark rounded-xl transition-colors flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Simpan ke Galeri</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Foto */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Edit Foto Galeri
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Judul Foto / Acara
                </label>
                <input
                  type="text"
                  value={editingItem.title || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Kategori
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      category: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <ImageUpload
                label="Foto Galeri"
                value={editingItem.image_url}
                onChange={(url) => setEditingItem({ ...editingItem, image_url: url })}
                bucket={STORAGE_BUCKETS.GALLERY}
                aspectRatio="video"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingItem.display_order}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        display_order: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Featured
                  </label>
                  <select
                    value={editingItem.is_featured ? "true" : "false"}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        is_featured: e.target.value === "true",
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value="false">Biasa</option>
                    <option value="true">Featured (Unggulan)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-forest hover:bg-forest-dark rounded-xl transition-colors flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
