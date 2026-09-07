"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import type { EventItem, Venue } from "@/types";
import { updateEvent } from "@/actions/events";
import { ImageUpload } from "@/components/admin/image-upload";
import { STORAGE_BUCKETS, EVENT_TYPES } from "@/lib/constants";

interface AdminEditEventFormProps {
  event: EventItem;
  venues: Venue[];
}

export default function AdminEditEventForm({ event, venues }: AdminEditEventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: event.title,
    slug: event.slug,
    description: event.description,
    content: event.content,
    cover_image_url: event.cover_image_url,
    event_date: event.event_date ? event.event_date.split("T")[0] : new Date().toISOString().split("T")[0],
    event_type: event.event_type,
    venue_id: event.venue_id || (venues[0]?.id ?? ""),
    is_published: event.is_published,
  });

  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await updateEvent(event.id, {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        content: formData.content,
        cover_image_url: formData.cover_image_url,
        event_date: formData.event_date,
        event_type: formData.event_type as any,
        venue_id: formData.venue_id,
        is_published: formData.is_published,
      });

      if (res.success) {
        setIsSaved(true);
        setTimeout(() => {
          router.push("/admin/events");
        }, 800);
      } else {
        setErrorMessage(res.error || "Gagal memperbarui event");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan saat menyimpan event");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6"
    >
      {isSaved && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
          Data event berhasil diperbarui! Mengalihkan ke halaman daftar event...
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-charcoal border-b border-gray-100 pb-2">
          Informasi Utama Acara
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Judul Acara *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Tipe Acara
            </label>
            <select
              value={formData.event_type}
              onChange={(e) => setFormData({ ...formData, event_type: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            >
              {EVENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Lokasi Ruang / Venue
            </label>
            <select
              value={formData.venue_id}
              onChange={(e) => setFormData({ ...formData, venue_id: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            >
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Tanggal Pelaksanaan
            </label>
            <input
              type="date"
              value={formData.event_date}
              onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            />
          </div>
        </div>

        <ImageUpload
          label="Foto Cover Event"
          value={formData.cover_image_url}
          onChange={(url) => setFormData({ ...formData, cover_image_url: url })}
          bucket={STORAGE_BUCKETS.EVENT_COVERS}
          aspectRatio="wide"
          required
        />

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Ringkasan Deskripsi *
          </label>
          <input
            type="text"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Konten Cerita Acara Lengkap
          </label>
          <textarea
            rows={6}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Status Publikasi
          </label>
          <select
            value={formData.is_published ? "true" : "false"}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.value === "true" })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50 max-w-xs"
          >
            <option value="true">Terpublikasi (Tampil)</option>
            <option value="false">Draft / Sembunyi</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
        <Link
          href="/admin/events"
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-xs transition-colors"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
