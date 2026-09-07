"use client";

import { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  XCircle,
  Trash2,
  PlusCircle,
  Pencil,
  Loader2,
  X,
} from "lucide-react";
import { testimonials as fallbackTestimonials } from "@/lib/seed-data";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateTestimonialStatus,
  toggleTestimonialFeatured,
} from "@/actions/testimonials";
import { ImageUpload } from "@/components/admin/image-upload";
import { STORAGE_BUCKETS, EVENT_TYPES } from "@/lib/constants";
import type { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const [list, setList] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Testimonial State
  const [newTestimonial, setNewTestimonial] = useState({
    client_name: "",
    client_title: "",
    event_type: "wedding",
    rating: 5,
    content: "",
    avatar_url: "",
    is_approved: true,
    is_featured: false,
  });

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getTestimonials(false);
        if (data && data.length > 0) {
          setList(data);
        }
      } catch (err) {
        console.error("Error loading testimonials:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  const toggleApproved = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_approved: nextStatus } : t))
    );
    try {
      await updateTestimonialStatus(id, nextStatus);
    } catch (err) {
      console.error("Failed to toggle testimonial approval:", err);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    const nextFeatured = !currentFeatured;
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_featured: nextFeatured } : t))
    );
    try {
      await toggleTestimonialFeatured(id, nextFeatured);
    } catch (err) {
      console.error("Failed to toggle testimonial featured:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ulasan dari "${name}"?`)) return;

    try {
      const res = await deleteTestimonial(id);
      if (res.success) {
        setList((prev) => prev.filter((t) => t.id !== id));
      } else {
        alert(res.error || "Gagal menghapus testimoni");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus testimoni");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await createTestimonial({
        client_name: newTestimonial.client_name,
        client_title: newTestimonial.client_title || null,
        event_type: newTestimonial.event_type,
        rating: Number(newTestimonial.rating),
        content: newTestimonial.content,
        avatar_url: newTestimonial.avatar_url || null,
        is_approved: newTestimonial.is_approved,
        is_featured: newTestimonial.is_featured,
      });

      if (res.success && res.data) {
        setList([res.data as Testimonial, ...list]);
        setShowAddModal(false);
        setNewTestimonial({
          client_name: "",
          client_title: "",
          event_type: "wedding",
          rating: 5,
          content: "",
          avatar_url: "",
          is_approved: true,
          is_featured: false,
        });
      } else {
        alert(res.error || "Gagal menambahkan testimoni");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan testimoni");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSubmitting(true);
    try {
      const res = await updateTestimonial(editingItem.id, {
        client_name: editingItem.client_name,
        client_title: editingItem.client_title || null,
        event_type: editingItem.event_type,
        rating: Number(editingItem.rating),
        content: editingItem.content,
        avatar_url: editingItem.avatar_url || null,
        is_approved: editingItem.is_approved,
        is_featured: editingItem.is_featured,
      });

      if (res.success) {
        setList((prev) =>
          prev.map((t) => (t.id === editingItem.id ? { ...t, ...editingItem } : t))
        );
        setEditingItem(null);
      } else {
        alert(res.error || "Gagal memperbarui testimoni");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan perubahan testimoni");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Ulasan & Testimoni Klien
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Verifikasi ulasan kepuasan dari pasangan pengantin dan penyelenggara event
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Testimoni Baru</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Klien & Gelar</th>
                <th className="px-6 py-4">Rating & Tipe Acara</th>
                <th className="px-6 py-4">Isi Testimoni</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Status Persetujuan</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-forest" />
                    <span className="text-xs">Memuat ulasan testimoni...</span>
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-xs">
                    Belum ada ulasan klien. Silakan klik &quot;Tambah Testimoni Baru&quot;.
                  </td>
                </tr>
              ) : (
                list.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-charcoal">{item.client_name}</p>
                      <p className="text-xs text-gray-400">{item.client_title || "-"}</p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gold mb-1">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                        {item.event_type}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-sm">
                      <p className="text-xs text-gray-600 line-clamp-2 italic">
                        &quot;{item.content}&quot;
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFeatured(item.id, item.is_featured)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          item.is_featured
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : "bg-gray-50 text-gray-400 border-gray-200"
                        }`}
                        title={item.is_featured ? "Hapus dari featured" : "Jadikan featured"}
                      >
                        <Star className={`w-4 h-4 ${item.is_featured ? "fill-current" : ""}`} />
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleApproved(item.id, item.is_approved)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          item.is_approved
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {item.is_approved ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Disetujui</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Menunggu / Tolak</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-forest hover:bg-forest/10 transition-colors inline-block"
                        title="Edit Testimoni"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.client_name)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors inline-block"
                        title="Hapus Testimoni"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Testimoni */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Tambah Testimoni Klien Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Nama Klien *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTestimonial.client_name}
                    onChange={(e) =>
                      setNewTestimonial({ ...newTestimonial, client_name: e.target.value })
                    }
                    placeholder="Sarah & Dimas"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Gelar / Status
                  </label>
                  <input
                    type="text"
                    value={newTestimonial.client_title}
                    onChange={(e) =>
                      setNewTestimonial({ ...newTestimonial, client_title: e.target.value })
                    }
                    placeholder="Pengantin Resepsi 2025"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Tipe Acara
                  </label>
                  <select
                    value={newTestimonial.event_type}
                    onChange={(e) =>
                      setNewTestimonial({ ...newTestimonial, event_type: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Rating Bintang (1 - 5)
                  </label>
                  <select
                    value={newTestimonial.rating}
                    onChange={(e) =>
                      setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                    <option value={2}>⭐⭐ (2 Bintang)</option>
                    <option value={1}>⭐ (1 Bintang)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Isi Ulasan Testimoni *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newTestimonial.content}
                  onChange={(e) =>
                    setNewTestimonial({ ...newTestimonial, content: e.target.value })
                  }
                  placeholder="Pengalaman kami menikah di Kebon Gede sangat berkesan..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Status Persetujuan
                  </label>
                  <select
                    value={newTestimonial.is_approved ? "true" : "false"}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        is_approved: e.target.value === "true",
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value="true">Disetujui (Tampil di Website)</option>
                    <option value="false">Menunggu Persetujuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Featured
                  </label>
                  <select
                    value={newTestimonial.is_featured ? "true" : "false"}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        is_featured: e.target.value === "true",
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value="false">Biasa</option>
                    <option value="true">Featured (Beranda)</option>
                  </select>
                </div>
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
                  <span>Simpan Testimoni</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Testimoni */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Edit Ulasan Testimoni
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Nama Klien *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.client_name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, client_name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Gelar / Status
                  </label>
                  <input
                    type="text"
                    value={editingItem.client_title || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, client_title: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Tipe Acara
                  </label>
                  <select
                    value={editingItem.event_type}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, event_type: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Rating Bintang (1 - 5)
                  </label>
                  <select
                    value={editingItem.rating}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, rating: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                    <option value={2}>⭐⭐ (2 Bintang)</option>
                    <option value={1}>⭐ (1 Bintang)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Isi Ulasan Testimoni *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.content}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, content: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Status Persetujuan
                  </label>
                  <select
                    value={editingItem.is_approved ? "true" : "false"}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        is_approved: e.target.value === "true",
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value="true">Disetujui (Tampil di Website)</option>
                    <option value="false">Menunggu Persetujuan</option>
                  </select>
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
                    <option value="true">Featured (Beranda)</option>
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
