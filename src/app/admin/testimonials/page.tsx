"use client";

import { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2, ShieldCheck, ShieldAlert } from "lucide-react";
import { testimonials as initialTestimonials } from "@/lib/seed-data";
import type { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const [list, setList] = useState<Testimonial[]>(initialTestimonials);

  const toggleApproved = (id: string) => {
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_approved: !t.is_approved } : t))
    );
  };

  const toggleFeatured = (id: string) => {
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_featured: !t.is_featured } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setList((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-charcoal">
          Kelola Ulasan & Testimoni Klien
        </h2>
        <p className="text-gray-500 text-xs mt-0.5">
          Verifikasi ulasan kepuasan dari pasangan pengantin dan penyelenggara event
        </p>
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
              {list.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-charcoal">{item.client_name}</p>
                    <p className="text-xs text-gray-400">{item.client_title}</p>
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
                      onClick={() => toggleFeatured(item.id)}
                      className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                        item.is_featured
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-gray-50 text-gray-400 border-gray-200"
                      }`}
                    >
                      <Star className={`w-4 h-4 ${item.is_featured ? "fill-current" : ""}`} />
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleApproved(item.id)}
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

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteTestimonial(item.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus Testimoni"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
