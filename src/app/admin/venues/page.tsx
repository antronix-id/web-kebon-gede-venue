"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";
import StatusBadge from "@/components/admin/status-badge";
import { venues as initialVenues } from "@/lib/seed-data";
import { getVenueTypeBadge } from "@/lib/utils";

export default function AdminVenuesPage() {
  const [venuesList, setVenuesList] = useState(initialVenues);

  const toggleStatus = (id: string) => {
    setVenuesList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, is_active: !v.is_active } : v))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Ruang Venue
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Daftar seluruh area indoor, outdoor, dan semi-outdoor Kebon Gede Venue
          </p>
        </div>

        <Link
          href="/admin/venues/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Venue Baru</span>
        </Link>
      </div>

      {/* Venues Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Gambar & Nama</th>
                <th className="px-6 py-4">Tipe Area</th>
                <th className="px-6 py-4">Kapasitas</th>
                <th className="px-6 py-4">Fasilitas Utama</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {venuesList.map((venue) => (
                <tr key={venue.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <Image
                          src={venue.hero_image_url}
                          alt={venue.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal">{venue.name}</p>
                        <p className="text-xs text-gray-400">slug: /{venue.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getVenueTypeBadge(venue.venue_type).color}`}>
                      {getVenueTypeBadge(venue.venue_type).label}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs font-medium text-charcoal">
                    {venue.capacity_min} - {venue.capacity_max} Orang
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {venue.facilities.slice(0, 3).map((f) => (
                        <span key={f} className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600">
                          {f}
                        </span>
                      ))}
                      {venue.facilities.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500">
                          +{venue.facilities.length - 3} lagi
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(venue.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                        venue.is_active
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {venue.is_active ? (
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
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/venues/${venue.id}/edit`}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-forest hover:bg-forest/10 inline-block transition-colors"
                      title="Edit Venue"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
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
