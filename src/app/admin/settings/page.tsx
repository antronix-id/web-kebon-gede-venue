"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Save, CheckCircle2, Globe, Phone, Share2, Search, Palette, Loader2 } from "lucide-react";
import { siteSettings as initialSettings } from "@/lib/seed-data";
import { getSettings, updateMultipleSettings } from "@/actions/settings";
import { ImageUpload } from "@/components/admin/image-upload";
import { STORAGE_BUCKETS } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "social" | "seo" | "branding">("general");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    site_name: "Kebon Gede Venue",
    tagline: "Best Venue for Your Event",
    description: "Venue Outdoor & Indoor Palembang seluas 1 hektar dengan pemandangan alam asri.",
    address: "Jl. Sultan Moh. Mansyur No.687, Palembang 30134",
    phone: "+62 812-3456-7890",
    whatsapp: "+62 812-3456-7890",
    email: "info@kebongede.com",
    opening_hours: "Senin - Minggu: 08:00 - 22:00 WIB",
    instagram: "https://instagram.com/kebongede_venue",
    facebook: "https://facebook.com/kebongedevenue",
    tiktok: "https://tiktok.com/@kebongedevenue",
    youtube: "https://youtube.com/@kebongedevenue",
    seo_title: "Kebon Gede Venue - Best Venue for Your Event di Palembang",
    seo_description: "Venue Outdoor & Indoor terbaik di Palembang untuk Wedding, Meeting, Outbound, Graduation.",
    logo_url: "/images/logo.png",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const live = await getSettings();
        if (live && live.length > 0) {
          const map: Record<string, string> = {};
          live.forEach((item) => {
            map[item.key] = item.value;
          });
          setSettings((prev) => ({
            ...prev,
            ...map,
          }));
        }
      } catch (err) {
        console.error("Error loading settings:", err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateMultipleSettings(settings);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-charcoal">
          Pengaturan Sistem & Website
        </h2>
        <p className="text-gray-500 text-xs mt-0.5">
          Konfigurasi informasi kontak, profil usaha, media sosial, dan optimasi SEO
        </p>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>Pengaturan berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        {[
          { id: "general", label: "Informasi Umum", icon: Globe },
          { id: "contact", label: "Kontak & Alamat", icon: Phone },
          { id: "social", label: "Media Sosial", icon: Share2 },
          { id: "seo", label: "SEO & Meta", icon: Search },
          { id: "branding", label: "Branding", icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-forest text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        {activeTab === "general" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Nama Usaha / Venue
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Tagline Resmi
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Deskripsi Singkat Profil
              </label>
              <textarea
                rows={3}
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Alamat Fisik Lengkap
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                No. Telepon
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                No. WhatsApp Reservasi
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Kontak
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Jam Operasional
              </label>
              <input
                type="text"
                value={settings.opening_hours}
                onChange={(e) => setSettings({ ...settings, opening_hours: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                TikTok URL
              </label>
              <input
                type="url"
                value={settings.tiktok}
                onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube}
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Default Meta Title
              </label>
              <input
                type="text"
                value={settings.seo_title}
                onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.seo_description}
                onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
              />
            </div>
          </div>
        )}

        {activeTab === "branding" && (
          <div className="space-y-6 max-w-md">
            <ImageUpload
              label="Logo Website & Branding"
              value={settings.logo_url}
              onChange={(url) => setSettings({ ...settings, logo_url: url })}
              bucket={STORAGE_BUCKETS.GENERAL}
              aspectRatio="square"
              helperText="Format: PNG, SVG, atau WEBP dengan latar transparan (maks. 2MB)"
            />
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Semua Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
