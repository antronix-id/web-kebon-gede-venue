"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Calendar,
  FileText,
  Image as ImageIcon,
  PlusCircle,
  Eye,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import StatCard from "@/components/admin/stat-card";
import StatusBadge from "@/components/admin/status-badge";
import {
  contactMessages as seedMessages,
  events as seedEvents,
  blogPosts as seedPosts,
  galleryItems as seedGallery,
} from "@/lib/seed-data";
import { getContactMessages } from "@/actions/contact";
import { getEvents } from "@/actions/events";
import { getBlogPosts } from "@/actions/blog";
import { getGalleryItems } from "@/actions/gallery";
import { formatDate } from "@/lib/utils";
import type { ContactMessage } from "@/types";

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(seedMessages);
  const [eventCount, setEventCount] = useState(seedEvents.length);
  const [postCount, setPostCount] = useState(seedPosts.length);
  const [galleryCount, setGalleryCount] = useState(seedGallery.length);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [liveMsgs, liveEvents, livePosts, liveGallery] = await Promise.all([
          getContactMessages().catch(() => null),
          getEvents(false).catch(() => null),
          getBlogPosts().catch(() => null),
          getGalleryItems("all").catch(() => null),
        ]);

        if (liveMsgs && liveMsgs.length > 0) setMessages(liveMsgs);
        if (liveEvents && liveEvents.length > 0) setEventCount(liveEvents.length);
        if (livePosts && livePosts.length > 0) setPostCount(livePosts.length);
        if (liveGallery && liveGallery.length > 0) setGalleryCount(liveGallery.length);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    }

    loadDashboardData();
  }, []);

  const newMessagesCount = messages.filter((m) => m.status === "new").length;
  const recentMessages = messages.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-forest to-forest-dark rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-gold-light text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Panel Kontrol Administrator
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
            Selamat Datang, Admin Kebon Gede Venue!
          </h2>
          <p className="text-gray-200 text-sm leading-relaxed mb-6">
            Kelola data venue, galeri foto event, pesan booking pelanggan, dan artikel informasi website dengan mudah dari dashboard ini.
          </p>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/events/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Event Baru</span>
            </Link>
            <Link
              href="/admin/gallery"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition-colors backdrop-blur-sm"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Upload Foto Galeri</span>
            </Link>
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition-colors backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
              <span>Periksa Pesan Masuk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Pesan Masuk"
          value={messages.length}
          icon={MessageSquare}
          badge={`${newMessagesCount} Baru`}
          change={`${newMessagesCount} pesan perlu direspon`}
          isPositive
        />
        <StatCard
          title="Total Event"
          value={eventCount}
          icon={Calendar}
          change="Terselenggara aktif"
          isPositive
        />
        <StatCard
          title="Artikel Blog"
          value={postCount}
          icon={FileText}
          change="Artikel terpublikasi"
          isPositive
        />
        <StatCard
          title="Item Galeri"
          value={galleryCount}
          icon={ImageIcon}
          change="Kategori lengkap"
          isPositive
        />
      </div>

      {/* Recent Messages Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-charcoal">
              Pesan Inquiry Booking Terbaru
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">
              5 formulir kontak terbaru yang masuk dari calon klien
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="text-forest text-xs font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Semua Pesan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Nama & Kontak</th>
                <th className="px-6 py-3.5">Acara & Venue</th>
                <th className="px-6 py-3.5">Tgl Acara</th>
                <th className="px-6 py-3.5">Estimasi Tamu</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50/80 transition-colors">
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
                  <td className="px-6 py-4 text-xs text-gray-600 font-medium">
                    {msg.estimated_guests} Tamu
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={msg.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href="/admin/messages"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-forest hover:text-white text-xs font-semibold text-gray-700 transition-colors"
                    >
                      Buka Detail
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
