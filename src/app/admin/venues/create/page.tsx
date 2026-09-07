"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { createVenue } from "@/actions/venues";

export default function AdminCreateVenuePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    venue_type: "semi_outdoor",
    capacity_min: 500,
    capacity_max: 1000,
    short_description: "",
    full_description: "",
    facilities: "Toilet AC, Ruang Tunggu, Sound System, Parkir Luas",
    hero_image_url: "/images/6.png",
    is_active: true,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await createVenue({
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        venue_type: formData.venue_type as any,
        capacity_min: Number(formData.capacity_min),
        capacity_max: Number(formData.capacity_max),
        short_description: formData.short_description,
        full_description: formData.full_description,
        facilities: formData.facilities.split(",").map((s) => s.trim()).filter(Boolean),
        hero_image_url: formData.hero_image_url,
        is_active: formData.is_active,
        display_order: 0,
      });

      if (res.success) {
        setIsSaved(true);
        setTimeout(() => {
          router.push("/admin/venues");
        }, 800);
      } else {
        setErrorMessage(res.error || "Gagal menyimpan venue");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Terjadi kesalahan pada server");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/venues"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-charcoal hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Tambah Venue Baru
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Lengkapi spesifikasi ruangan atau area perhelatan baru
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
          Data venue berhasil disimpan! Mengalihkan ke daftar venue...
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Nama Venue *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                setFormData({ ...formData, name, slug });
              }}
              placeholder="Contoh: Venue Cempaka"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Slug URL
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="venue-cempaka"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Tipe Ruang
            </label>
            <select
              value={formData.venue_type}
              onChange={(e) => setFormData({ ...formData, venue_type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            >
              <option value="indoor">Indoor (Gedung Tertutup)</option>
              <option value="semi_outdoor">Semi Outdoor</option>
              <option value="outdoor">Outdoor (Taman Terbuka)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Min Tamu
              </label>
              <input
                type="number"
                value={formData.capacity_min}
                onChange={(e) => setFormData({ ...formData, capacity_min: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Maks Tamu
              </label>
              <input
                type="number"
                value={formData.capacity_max}
                onChange={(e) => setFormData({ ...formData, capacity_max: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Deskripsi Singkat *
          </label>
          <input
            type="text"
            required
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            placeholder="Ringkasan 1-2 kalimat tentang keistimewaan venue..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Deskripsi Lengkap
          </label>
          <textarea
            rows={5}
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            placeholder="Penjelasan detail suasana, dekorasi, kelebihan pencahayaan, dll..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Fasilitas (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            value={formData.facilities}
            onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
            placeholder="Contoh: AC, Sound System, Panggung, Toilet, Mushola"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Foto Hero Venue (URL / Asset)
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={formData.hero_image_url}
              onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            />
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4" />
              <span>Browse</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <Link
            href="/admin/venues"
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-xs transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Venue</span>
          </button>
        </div>
      </form>
    </div>
  );
}
