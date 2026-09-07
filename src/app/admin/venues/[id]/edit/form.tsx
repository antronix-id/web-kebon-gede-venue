"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, Upload } from "lucide-react";
import type { Venue } from "@/types";
import { updateVenue } from "@/actions/venues";

interface AdminEditVenueFormProps {
  venue: Venue;
}

export default function AdminEditVenueForm({ venue }: AdminEditVenueFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: venue.name,
    slug: venue.slug,
    venue_type: venue.venue_type,
    capacity_min: venue.capacity_min,
    capacity_max: venue.capacity_max,
    short_description: venue.short_description,
    full_description: venue.full_description,
    facilities: venue.facilities.join(", "),
    hero_image_url: venue.hero_image_url,
    is_active: venue.is_active,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await updateVenue(venue.id, {
        name: formData.name,
        slug: formData.slug,
        venue_type: formData.venue_type as any,
        capacity_min: Number(formData.capacity_min),
        capacity_max: Number(formData.capacity_max),
        short_description: formData.short_description,
        full_description: formData.full_description,
        facilities: formData.facilities.split(",").map((s) => s.trim()).filter(Boolean),
        hero_image_url: formData.hero_image_url,
        is_active: formData.is_active,
      });

      if (res.success) {
        setIsSaved(true);
        setTimeout(() => {
          router.push("/admin/venues");
        }, 800);
      } else {
        setErrorMessage(res.error || "Gagal memperbarui venue");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Terjadi kesalahan pada server");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      {isSaved && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
          Perubahan venue berhasil disimpan! Mengalihkan...
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Nama Venue *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Tipe Ruang
          </label>
          <select
            value={formData.venue_type}
            onChange={(e) => setFormData({ ...formData, venue_type: e.target.value as any })}
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
          Deskripsi Singkat
        </label>
        <input
          type="text"
          value={formData.short_description}
          onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
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
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Foto Hero Venue URL
        </label>
        <input
          type="text"
          value={formData.hero_image_url}
          onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
        />
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
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </form>
  );
}
