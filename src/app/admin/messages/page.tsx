"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, Users, MessageSquare, X, Check, Clock } from "lucide-react";
import StatusBadge from "@/components/admin/status-badge";
import { contactMessages as initialMessages } from "@/lib/seed-data";
import { formatDate } from "@/lib/utils";
import type { ContactMessage } from "@/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredMessages =
    filterStatus === "all"
      ? messages
      : messages.filter((m) => m.status === filterStatus);

  const updateStatus = (id: string, newStatus: ContactMessage["status"]) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
    if (selectedMsg && selectedMsg.id === id) {
      setSelectedMsg({ ...selectedMsg, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kotak Masuk Pesan & Inquiry
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Daftar formulir booking dan konsultasi yang dikirimkan calon klien
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          {["all", "new", "read", "responded"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                filterStatus === st
                  ? "bg-forest text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {st === "all" ? "Semua" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nama Klien</th>
                <th className="px-6 py-4">Acara & Venue</th>
                <th className="px-6 py-4">Rencana Tanggal</th>
                <th className="px-6 py-4">Tamu</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMessages.map((msg) => (
                <tr
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-charcoal">{msg.name}</p>
                    <p className="text-xs text-gray-400">{msg.email}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal capitalize">{msg.event_type}</p>
                    <p className="text-xs text-gray-400 capitalize">{msg.venue_preference}</p>
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-600">
                    {formatDate(msg.preferred_date)}
                  </td>

                  <td className="px-6 py-4 text-xs text-charcoal font-semibold">
                    {msg.estimated_guests} Tamu
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={msg.status} />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMsg(msg);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-forest/10 text-forest hover:bg-forest hover:text-white text-xs font-semibold transition-colors"
                    >
                      Buka Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal / Drawer */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-charcoal">
                  Detail Inquiry Booking
                </h3>
                <p className="text-xs text-gray-400">
                  Diterima pada {formatDate(selectedMsg.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Nama Pengirim</p>
                  <p className="font-bold text-charcoal">{selectedMsg.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
                  <p className="font-medium text-charcoal">{selectedMsg.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">No. Telepon</p>
                  <p className="font-medium text-charcoal">{selectedMsg.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Tipe Acara</p>
                  <p className="font-bold text-forest capitalize">{selectedMsg.event_type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Pilihan Ruang</p>
                  <p className="font-medium text-charcoal capitalize">{selectedMsg.venue_preference}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Rencana Tanggal</p>
                  <p className="font-medium text-charcoal">{formatDate(selectedMsg.preferred_date)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Pesan / Keperluan Klien:
                </p>
                <div className="p-4 rounded-2xl bg-cream text-gray-700 leading-relaxed border border-gold/20">
                  {selectedMsg.message}
                </div>
              </div>

              {selectedMsg.admin_notes && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Catatan Internal:
                  </p>
                  <div className="p-3 rounded-xl bg-gray-100 text-gray-600 text-xs italic">
                    {selectedMsg.admin_notes}
                  </div>
                </div>
              )}
            </div>

            {/* Status Changer Buttons */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedMsg.id, "read")}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Tandai Dibaca
                </button>
                <button
                  onClick={() => updateStatus(selectedMsg.id, "responded")}
                  className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
                >
                  Sudah Dibalas
                </button>
              </div>

              <button
                onClick={() => setSelectedMsg(null)}
                className="px-4 py-1.5 rounded-lg bg-charcoal text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
