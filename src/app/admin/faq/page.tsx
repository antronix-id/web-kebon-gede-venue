"use client";

import { useState } from "react";
import { PlusCircle, CheckCircle2, XCircle, Trash2, HelpCircle } from "lucide-react";
import { faqs as initialFaqs } from "@/lib/seed-data";
import type { FAQ } from "@/types";

export default function AdminFAQPage() {
  const [faqList, setFaqList] = useState<FAQ[]>(initialFaqs);
  const [showModal, setShowModal] = useState(false);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "general",
  });

  const toggleActive = (id: string) => {
    setFaqList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, is_active: !f.is_active } : f))
    );
  };

  const deleteFaq = (id: string) => {
    setFaqList((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item: FAQ = {
      id: `faq-${Date.now()}`,
      question: newFaq.question,
      answer: newFaq.answer,
      category: newFaq.category,
      display_order: faqList.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setFaqList([...faqList, item]);
    setShowModal(false);
    setNewFaq({ question: "", answer: "", category: "general" });
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
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Pertanyaan FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqList.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-forest/10 text-forest text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {item.category}
                </span>
              </div>
              <h3 className="font-bold text-sm text-charcoal">
                {item.question}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <button
                onClick={() => toggleActive(item.id)}
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
                onClick={() => deleteFaq(item.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Hapus FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <h3 className="font-heading text-xl font-bold text-charcoal mb-4">
              Tambah Pertanyaan FAQ
            </h3>
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
                  placeholder="Contoh: Apakah tersedia fasilitas genset cadangan?"
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
                  placeholder="Ya, kami menyediakan genset backup berdaya besar..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest"
                />
              </div>

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
                  Simpan FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
