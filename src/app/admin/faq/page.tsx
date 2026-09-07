"use client";

import { useState, useEffect } from "react";
import {
  PlusCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  HelpCircle,
  Pencil,
  Loader2,
  X,
} from "lucide-react";
import { faqs as fallbackFaqs } from "@/lib/seed-data";
import { getFaqs, createFaq, updateFaq, deleteFaq } from "@/actions/faq";
import type { FAQ } from "@/types";

export default function AdminFAQPage() {
  const [faqList, setFaqList] = useState<FAQ[]>(fallbackFaqs);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New FAQ Form State
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "general",
    display_order: 1,
  });

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await getFaqs(false);
        if (data && data.length > 0) {
          setFaqList(data);
        }
      } catch (err) {
        console.error("Error loading faqs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, []);

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setFaqList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, is_active: nextStatus } : f))
    );
    try {
      await updateFaq(id, { is_active: nextStatus });
    } catch (err) {
      console.error("Failed to toggle FAQ active status:", err);
    }
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus pertanyaan FAQ:\n"${question}"?`)) return;

    try {
      const res = await deleteFaq(id);
      if (res.success) {
        setFaqList((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert(res.error || "Gagal menghapus FAQ");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus FAQ");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await createFaq({
        question: newFaq.question,
        answer: newFaq.answer,
        category: newFaq.category,
        display_order: Number(newFaq.display_order) || faqList.length + 1,
        is_active: true,
      });

      if (res.success && res.data) {
        setFaqList([...faqList, res.data as FAQ]);
        setShowAddModal(false);
        setNewFaq({
          question: "",
          answer: "",
          category: "general",
          display_order: faqList.length + 2,
        });
      } else {
        alert(res.error || "Gagal menambahkan FAQ baru");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan FAQ baru");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSubmitting(true);
    try {
      const res = await updateFaq(editingItem.id, {
        question: editingItem.question,
        answer: editingItem.answer,
        category: editingItem.category,
        display_order: Number(editingItem.display_order) || 1,
        is_active: editingItem.is_active,
      });

      if (res.success) {
        setFaqList((prev) =>
          prev.map((f) => (f.id === editingItem.id ? { ...f, ...editingItem } : f))
        );
        setEditingItem(null);
      } else {
        alert(res.error || "Gagal memperbarui FAQ");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan perubahan FAQ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Pertanyaan FAQ
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Daftar pertanyaan yang ditampilkan di accordion bagian bawah beranda
          </p>
        </div>

        <button
          onClick={() => {
            setNewFaq((prev) => ({ ...prev, display_order: faqList.length + 1 }));
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Pertanyaan FAQ</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-forest" />
          <p className="text-xs">Memuat daftar FAQ...</p>
        </div>
      ) : faqList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 text-gray-400 text-xs">
          Belum ada pertanyaan FAQ. Silakan klik &quot;Tambah Pertanyaan FAQ&quot;.
        </div>
      ) : (
        <div className="space-y-3">
          {faqList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-forest/20 transition-all"
            >
              <div className="space-y-1.5 flex-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-forest/10 text-forest">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-400">Order: {item.display_order}</span>
                </div>
                <h4 className="font-semibold text-sm text-charcoal">{item.question}</h4>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {item.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => toggleActive(item.id, item.is_active)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    item.is_active
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {item.is_active ? (
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
                  onClick={() => setEditingItem(item)}
                  className="p-2 rounded-lg text-gray-500 hover:text-forest hover:bg-forest/10 transition-colors"
                  title="Edit FAQ"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.question)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Hapus FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tambah FAQ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Tambah Pertanyaan FAQ
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
                  Pertanyaan *
                </label>
                <input
                  type="text"
                  required
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  placeholder="Contoh: Apakah tersedia genset cadangan?"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Jawaban *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  placeholder="Ya, kami menyediakan backup genset otomatis..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={newFaq.category}
                    onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value="general">General (Umum)</option>
                    <option value="wedding">Wedding (Pernikahan)</option>
                    <option value="pricing">Harga & Booking</option>
                    <option value="facilities">Fasilitas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newFaq.display_order}
                    onChange={(e) =>
                      setNewFaq({ ...newFaq, display_order: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  />
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
                  <span>Simpan FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit FAQ */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Edit Pertanyaan FAQ
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
                  Pertanyaan *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.question}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, question: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Jawaban *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.answer}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, answer: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                  >
                    <option value="general">General (Umum)</option>
                    <option value="wedding">Wedding (Pernikahan)</option>
                    <option value="pricing">Harga & Booking</option>
                    <option value="facilities">Fasilitas</option>
                  </select>
                </div>

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
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Status Keaktifan
                </label>
                <select
                  value={editingItem.is_active ? "true" : "false"}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_active: e.target.value === "true",
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                >
                  <option value="true">Aktif (Tampil)</option>
                  <option value="false">Nonaktif (Sembunyi)</option>
                </select>
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
