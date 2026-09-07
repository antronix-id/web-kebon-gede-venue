"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusCircle, CheckCircle2, XCircle, Trash2, Sliders } from "lucide-react";
import { heroSlides as initialSlides } from "@/lib/seed-data";
import type { HeroSlide } from "@/types";

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
  const [showModal, setShowModal] = useState(false);
  const [newSlide, setNewSlide] = useState({
    title: "",
    subtitle: "",
    image_url: "/images/1.png",
    cta_text: "Explore Venues",
    cta_link: "/venues",
  });

  const toggleActive = (id: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s))
    );
  };

  const deleteSlide = (id: string) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item: HeroSlide = {
      id: `slide-${Date.now()}`,
      title: newSlide.title,
      subtitle: newSlide.subtitle,
      image_url: newSlide.image_url,
      cta_text: newSlide.cta_text,
      cta_link: newSlide.cta_link,
      display_order: slides.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setSlides([...slides, item]);
    setShowModal(false);
    setNewSlide({
      title: "",
      subtitle: "",
      image_url: "/images/1.png",
      cta_text: "Explore Venues",
      cta_link: "/venues",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Hero Slider Homepage
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Atur foto banner, tagline, dan tombol ajakan aksi utama beranda website
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Slide Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold-light">
                  Slide {idx + 1} (Order: {slide.display_order})
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
                <p className="text-xs text-gray-700 italic">{slide.subtitle}</p>

                <div className="pt-2 text-xs flex items-center justify-between text-gray-500">
                  <span>Tombol: <strong>{slide.cta_text}</strong></span>
                  <span>Link: <code>{slide.cta_link}</code></span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => toggleActive(slide.id)}
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

                <button
                  onClick={() => deleteSlide(slide.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Hapus Slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <h3 className="font-heading text-xl font-bold text-charcoal mb-4">
              Tambah Slide Baru
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Headline Slide *
                </label>
                <input
                  type="text"
                  required
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  placeholder="Contoh: KEBON GEDE VENUE"
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

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Path File / URL Gambar
                </label>
                <input
                  type="text"
                  required
                  value={newSlide.image_url}
                  onChange={(e) => setNewSlide({ ...newSlide, image_url: e.target.value })}
                  placeholder="/images/18.png"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Label CTA
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
                    Link CTA
                  </label>
                  <input
                    type="text"
                    value={newSlide.cta_link}
                    onChange={(e) => setNewSlide({ ...newSlide, cta_link: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-forest hover:bg-forest-dark rounded-xl"
                >
                  Simpan Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
