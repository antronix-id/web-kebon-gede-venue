"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  PlusCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Pencil,
  Sliders,
  Loader2,
  X,
} from "lucide-react";
import { heroSlides as fallbackSlides } from "@/lib/seed-data";
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "@/actions/hero-slides";
import { ImageUpload } from "@/components/admin/image-upload";
import { STORAGE_BUCKETS } from "@/lib/constants";
import type { HeroSlide } from "@/types";

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>(fallbackSlides);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newSlide, setNewSlide] = useState({
    title: "",
    subtitle: "",
    image_url: "/images/1.png",
    cta_text: "Explore Venues",
    cta_link: "/venues",
    display_order: 1,
  });

  useEffect(() => {
    async function loadSlides() {
      try {
        const data = await getHeroSlides(false);
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch (err) {
        console.error("Error loading hero slides:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSlides();
  }, []);

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_active: nextStatus } : s))
    );
    try {
      await updateHeroSlide(id, { is_active: nextStatus });
    } catch (err) {
      console.error("Failed to toggle slide status:", err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus slide "${title}"?`)) return;

    try {
      const res = await deleteHeroSlide(id);
      if (res.success) {
        setSlides((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(res.error || "Gagal menghapus slide");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus slide");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createHeroSlide({
        title: newSlide.title,
        subtitle: newSlide.subtitle || null,
        image_url: newSlide.image_url,
        cta_text: newSlide.cta_text || null,
        cta_link: newSlide.cta_link || null,
        display_order: Number(newSlide.display_order) || slides.length + 1,
        is_active: true,
      });

      if (res.success && res.data) {
        setSlides([...slides, res.data as HeroSlide]);
        setShowAddModal(false);
        setNewSlide({
          title: "",
          subtitle: "",
          image_url: "/images/1.png",
          cta_text: "Explore Venues",
          cta_link: "/venues",
          display_order: slides.length + 2,
        });
      } else {
        alert(res.error || "Gagal menambahkan slide baru");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan slide baru");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    setIsSubmitting(true);
    try {
      const res = await updateHeroSlide(editingSlide.id, {
        title: editingSlide.title,
        subtitle: editingSlide.subtitle || null,
        image_url: editingSlide.image_url,
        cta_text: editingSlide.cta_text || null,
        cta_link: editingSlide.cta_link || null,
        display_order: Number(editingSlide.display_order) || 1,
        is_active: editingSlide.is_active,
      });

      if (res.success) {
        setSlides((prev) =>
          prev.map((s) => (s.id === editingSlide.id ? { ...s, ...editingSlide } : s))
        );
        setEditingSlide(null);
      } else {
        alert(res.error || "Gagal memperbarui slide");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan perubahan slide");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Hero Slider Homepage
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Atur gambar slide banner utama di halaman beranda depan website
          </p>
        </div>

        <button
          onClick={() => {
            setNewSlide((prev) => ({ ...prev, display_order: slides.length + 1 }));
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Slide Baru</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-forest" />
          <p className="text-xs">Memuat hero slides...</p>
        </div>
      ) : slides.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 text-gray-400 text-xs">
          Belum ada slide banner. Silakan klik &quot;Tambah Slide Baru&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:border-forest/30 transition-all"
            >
              <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                <Image
                  src={slide.image_url}
                  alt={slide.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold-light">
                    Slide {idx + 1} (Urutan: {slide.display_order})
                  </span>
                  <p className="font-heading text-base font-bold leading-tight truncate">
                    {slide.title}
                  </p>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Subtitle
                  </p>
                  <p className="text-xs text-gray-700 italic line-clamp-2">
                    {slide.subtitle || "-"}
                  </p>

                  <div className="pt-2 text-xs flex items-center justify-between text-gray-500">
                    <span>
                      Tombol: <strong>{slide.cta_text || "-"}</strong>
                    </span>
                    <span>
                      Link: <code className="text-[11px]">{slide.cta_link || "-"}</code>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleActive(slide.id, slide.is_active)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      slide.is_active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {slide.is_active ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Aktif</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Nonaktif</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingSlide(slide)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-forest hover:bg-forest/10 transition-colors"
                      title="Edit Slide"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id, slide.title)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tambah Slide */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Tambah Slide Banner Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Judul Slide (Heading) *
                </label>
                <input
                  type="text"
                  required
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  placeholder="Contoh: Nuansa Asri & Megah di Jantung Kota"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Sub-tagline
                </label>
                <input
                  type="text"
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                  placeholder="Best Venue for Your Event"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <ImageUpload
                label="Gambar Slide (Hero Background)"
                value={newSlide.image_url}
                onChange={(url) => setNewSlide({ ...newSlide, image_url: url })}
                bucket={STORAGE_BUCKETS.HERO_SLIDES}
                aspectRatio="wide"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Label Tombol CTA
                  </label>
                  <input
                    type="text"
                    value={newSlide.cta_text}
                    onChange={(e) => setNewSlide({ ...newSlide, cta_text: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Link Tujuan CTA
                  </label>
                  <input
                    type="text"
                    value={newSlide.cta_link}
                    onChange={(e) => setNewSlide({ ...newSlide, cta_link: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Urutan Tampil (Display Order)
                </label>
                <input
                  type="number"
                  min={1}
                  value={newSlide.display_order}
                  onChange={(e) =>
                    setNewSlide({ ...newSlide, display_order: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
                  <span>Simpan Slide</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Slide */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Edit Slide Banner
              </h3>
              <button
                onClick={() => setEditingSlide(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Judul Slide (Heading) *
                </label>
                <input
                  type="text"
                  required
                  value={editingSlide.title}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Sub-tagline
                </label>
                <input
                  type="text"
                  value={editingSlide.subtitle || ""}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, subtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <ImageUpload
                label="Gambar Slide (Hero Background)"
                value={editingSlide.image_url}
                onChange={(url) => setEditingSlide({ ...editingSlide, image_url: url })}
                bucket={STORAGE_BUCKETS.HERO_SLIDES}
                aspectRatio="wide"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Label Tombol CTA
                  </label>
                  <input
                    type="text"
                    value={editingSlide.cta_text || ""}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, cta_text: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Link Tujuan CTA
                  </label>
                  <input
                    type="text"
                    value={editingSlide.cta_link || ""}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, cta_link: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingSlide.display_order}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        display_order: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Status Tampil
                  </label>
                  <select
                    value={editingSlide.is_active ? "true" : "false"}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        is_active: e.target.value === "true",
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value="true">Aktif (Tampil)</option>
                    <option value="false">Nonaktif (Sembunyi)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
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
