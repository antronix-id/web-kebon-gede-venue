"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Trash2, CheckCircle2, XCircle, Calendar as CalendarIcon } from "lucide-react";
import { events as initialEvents, venues } from "@/lib/seed-data";
import { formatDate, getEventTypeBadge } from "@/lib/utils";
import type { EventItem } from "@/types";

export default function AdminEventsPage() {
  const [eventsList, setEventsList] = useState<EventItem[]>(initialEvents);

  const togglePublished = (id: string) => {
    setEventsList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, is_published: !e.is_published } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setEventsList((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Portofolio Events
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Daftar perhelatan yang ditampilkan di halaman publik website
          </p>
        </div>

        <Link
          href="/admin/events/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Event Baru</span>
        </Link>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Event & Cover</th>
                <th className="px-6 py-4">Tipe Acara</th>
                <th className="px-6 py-4">Tanggal Pelaksanaan</th>
                <th className="px-6 py-4">Lokasi Venue</th>
                <th className="px-6 py-4">Status Publikasi</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {eventsList.map((evt) => {
                const venue = venues.find((v) => v.id === evt.venue_id);
                return (
                  <tr key={evt.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                          <Image
                            src={evt.cover_image_url}
                            alt={evt.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal">{evt.title}</p>
                          <p className="text-xs text-gray-400">slug: /{evt.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getEventTypeBadge(evt.event_type)}`}>
                        {evt.event_type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-gray-600">
                      {formatDate(evt.event_date)}
                    </td>

                    <td className="px-6 py-4 text-xs text-charcoal font-medium">
                      {venue ? venue.name : "Kebon Gede Area"}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublished(evt.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          evt.is_published
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {evt.is_published ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Terpublikasi</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Draft / Sembunyi</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteEvent(evt.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
