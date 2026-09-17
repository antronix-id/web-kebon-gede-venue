export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: "menu" | "venue" | "event" | "blog" | "message" | "faq";
  href: string;
}

export const QUICK_SHORTCUTS: SearchResultItem[] = [
  { id: "menu-dash", title: "Dashboard Overview", subtitle: "Ringkasan data & metrik utama", category: "menu", href: "/admin/dashboard" },
  { id: "menu-venues", title: "Kelola Ruang Venues", subtitle: "Daftar seluruh area venue", category: "menu", href: "/admin/venues" },
  { id: "menu-venue-create", title: "Tambah Venue Baru", subtitle: "Formulir input ruang baru", category: "menu", href: "/admin/venues/create" },
  { id: "menu-gallery", title: "Kelola Galeri Foto", subtitle: "Upload & atur dokumentasi foto", category: "menu", href: "/admin/gallery" },
  { id: "menu-events", title: "Kelola Portofolio Events", subtitle: "Daftar arsip perhelatan acara", category: "menu", href: "/admin/events" },
  { id: "menu-event-create", title: "Tambah Event Baru", subtitle: "Publikasi dokumentasi event", category: "menu", href: "/admin/events/create" },
  { id: "menu-blog", title: "Kelola Artikel & Tips", subtitle: "Daftar artikel blog inspirasi", category: "menu", href: "/admin/blog" },
  { id: "menu-blog-create", title: "Tulis Artikel Baru", subtitle: "Buat postingan tips & panduan", category: "menu", href: "/admin/blog/create" },
  { id: "menu-messages", title: "Kotak Masuk Pesan", subtitle: "Inquiry konsultasi & booking klien", category: "menu", href: "/admin/messages" },
  { id: "menu-testimonials", title: "Kelola Testimoni", subtitle: "Ulasan dari pengantin & klien", category: "menu", href: "/admin/testimonials" },
  { id: "menu-hero", title: "Kelola Hero Slides", subtitle: "Atur banner slider beranda", category: "menu", href: "/admin/hero-slides" },
  { id: "menu-faq", title: "Kelola Tanya Jawab (FAQ)", subtitle: "Daftar pertanyaan yang sering diajukan", category: "menu", href: "/admin/faq" },
  { id: "menu-users", title: "Manajemen Pengguna & Hak Akses", subtitle: "Kelola user admin & izin menu (Super Admin)", category: "menu", href: "/admin/users" },
  { id: "menu-user-create", title: "Tambah User Admin Baru", subtitle: "Form pendaftaran admin & hak akses", category: "menu", href: "/admin/users/create" },
  { id: "menu-settings", title: "Pengaturan Sistem & SEO", subtitle: "Kontak, medsos, meta tag", category: "menu", href: "/admin/settings" },
];
