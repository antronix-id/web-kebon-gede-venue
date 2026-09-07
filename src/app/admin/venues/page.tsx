"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { venues as fallbackVenues } from "@/lib/seed-data";
import { getVenues, deleteVenue, toggleVenueStatus } from "@/actions/venues";
import { getVenueTypeBadge } from "@/lib/utils";
import type { Venue } from "@/types";

export default function AdminVenuesPage() {
  const [venuesList, setVenuesList] = useState<Venue[]>(fallbackVenues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getVenues(false);
        if (data && data.length > 0) {
          setVenuesList(data);
        }
      } catch (err) {
        console.error("Error loading venues:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setVenuesList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, is_active: nextStatus } : v))
    );
    try {
      await toggleVenueStatus(id, nextStatus);
    } catch (err) {
      console.error("Failed to toggle venue:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus venue "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      const res = await deleteVenue(id);
      if (res.success) {
        setVenuesList((prev) => prev.filter((v) => v.id !== id));
      } else {
        alert(res.error || "Gagal menghapus venue");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus venue");
    }
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-forest" />
                    <span className="text-xs">Memuat data venue...</span>
                  </td>
                </tr>
              ) : venuesList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-xs">
                    Belum ada data venue. Silakan tambahkan venue baru.
                  </td>
                </tr>
              ) : (
                venuesList.map((venue) => (
                  <tr key={venue.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={venue.hero_image_url}
                            alt={venue.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal">{venue.name}</p>
                          <p className="text-xs text-gray-400">/{venue.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getVenueTypeBadge(venue.venue_type)}`}>
                        {venue.venue_type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-600">
                      {venue.capacity_min} - {venue.capacity_max} Tamu
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
                        onClick={() => handleToggle(venue.id, venue.is_active)}
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

                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                      <Link
                        href={`/admin/venues/${venue.id}/edit`}
                        className="p-2 rounded-lg text-gray-500 hover:text-forest hover:bg-forest/10 inline-block transition-colors"
                        title="Edit Venue"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(venue.id, venue.name)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 inline-block transition-colors"
                        title="Hapus Venue"
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
    </div>
  );
}
