-- ==============================================================================
-- KEBON GEDE VENUE - SUPABASE SEED DATA
-- Seed: seed.sql
-- ==============================================================================

-- 1. VENUES
INSERT INTO public.venues (id, name, slug, short_description, full_description, venue_type, capacity_min, capacity_max, facilities, hero_image_url, is_active, display_order)
VALUES 
(
  'a1111111-1111-1111-1111-111111111111',
  'Venue Teratai',
  'venue-teratai',
  'Venue semi outdoor yang elegan dengan suasana gazebo dan taman asri',
  'Venue Teratai merupakan venue bernuansa semi outdoor dengan gazebo megah di kelilingi lanskap taman tropis yang asri. Cocok untuk akad nikah intimate, pesta perayaan ulang tahun, seminar terbuka, ataupun pertemuan keluarga berkapasitas 500 hingga 1.000 undangan.',
  'semi_outdoor',
  500,
  1000,
  ARRAY['Gazebo', 'Taman Tropis', 'Panggung Permanen', 'Area Parkir', 'Sound System Standar', 'Toilet Bersih'],
  '/images/17.png',
  true,
  1
),
(
  'a2222222-2222-2222-2222-222222222222',
  'Venue Anggrek',
  'venue-anggrek',
  'Venue bernuansa New Outdoor & Semi Outdoor, sangat luas dengan kapasitas hingga 2000 orang',
  'Venue Anggrek merupakan venue yang bernuansa New Outdoor & Semi Outdoor. Sangat Luas, bersih, Nyaman dan memiliki kapasitas lebih dari 1000-2000. Venue Anggrek mempunyai fasilitas Seperti Toilet, Ruang Tunggu Full AC, Ruang Pengantin Full AC, Ruang Meeting, Kitchen Space, Dan Taman Anggrek. Selain itu Venue Anggrek Memiliki tempat parkir yang sangat Luas dan dekat dengan Venue.',
  'semi_outdoor',
  1000,
  2000,
  ARRAY['Toilet', 'Ruang Tunggu AC', 'Ruang Pengantin AC', 'Ruang Meeting', 'Kitchen Space', 'Taman Anggrek', 'Parkir Luas', 'Sound System', 'Lighting Standar'],
  '/images/6.png',
  true,
  2
),
(
  'a3333333-3333-3333-3333-333333333333',
  'Venue Kana',
  'venue-kana',
  'Venue bernuansa Full Outdoor dengan suasana sejuk dan kapasitas besar',
  'Venue Kana merupakan venue yang bernuansa Full Outdoor. Sangat Luas, bersih, Sejuk dan memiliki kapasitas lebih dari 1000. Venue Kana mempunyai fasilitas Seperti Toilet, Ruang Tunggu Full AC dan Memiliki tempat parkir yang sangat Luas yang dekat dengan Venue Kana.',
  'outdoor',
  1000,
  1500,
  ARRAY['Toilet', 'Ruang Tunggu AC', 'Parkir Luas', 'Taman Tropis', 'Panggung Terbuka', 'Sound System'],
  '/images/13.png',
  true,
  3
)
ON CONFLICT (slug) DO NOTHING;

-- 2. SITE SETTINGS
INSERT INTO public.site_settings (key, value, type, group_name)
VALUES
('site_name', 'Kebon Gede Venue', 'text', 'general'),
('tagline', 'Best Venue for Your Event', 'text', 'general'),
('description', 'Venue Outdoor & Indoor terbaik di Palembang untuk Wedding, Meeting, Outbound, Graduation dan berbagai acara lainnya. Luas 1 hektar dengan fasilitas lengkap dan asri.', 'text', 'general'),
('address', 'Jl. Sultan Moh. Mansyur No.687, Palembang 30134', 'text', 'contact'),
('phone', '+62 812-3456-7890', 'text', 'contact'),
('whatsapp', '+62 812-3456-7890', 'text', 'contact'),
('email', 'info@kebongede.com', 'text', 'contact'),
('instagram', 'https://instagram.com/kebongedevenue', 'text', 'social'),
('facebook', 'https://facebook.com/kebongedevenue', 'text', 'social'),
('tiktok', 'https://tiktok.com/@kebongedevenue', 'text', 'social'),
('meta_title', 'Kebon Gede Venue - Best Venue for Your Event di Palembang', 'text', 'seo'),
('meta_description', 'Kebon Gede Venue menyediakan venue outdoor & indoor terbaik di Palembang. Wedding, Meeting, Outbound, Graduation. Luas 1 hektar dengan fasilitas lengkap.', 'text', 'seo')
ON CONFLICT (key) DO NOTHING;

-- 3. FAQs
INSERT INTO public.faqs (question, answer, category, display_order, is_active)
VALUES
(
  'Apa saja jenis acara yang bisa diadakan di Kebon Gede Venue?',
  'Kebon Gede Venue bisa digunakan untuk berbagai acara seperti Wedding (pernikahan), Meeting, Outbound, Graduation (wisuda), Corporate Gathering, Birthday Party, Yoga, Work Out, dan aktivitas lainnya.',
  'general',
  1,
  true
),
(
  'Berapa kapasitas masing-masing venue?',
  'Venue Teratai menampung 500-1.000 orang, Venue Anggrek menampung 1.000-2.000 orang, dan Venue Kana menampung lebih dari 1.000 orang.',
  'venue',
  2,
  true
),
(
  'Apa perbedaan Venue Anggrek dan Venue Kana?',
  'Venue Anggrek bernuansa New Outdoor & Semi Outdoor dengan fasilitas lebih lengkap termasuk Ruang Pengantin AC, Ruang Meeting, dan Kitchen Space. Venue Kana bernuansa Full Outdoor dengan suasana sejuk dan taman tropis.',
  'venue',
  3,
  true
),
(
  'Dimana lokasi Kebon Gede Venue?',
  'Kebon Gede Venue terletak di Jl. Sultan Moh. Mansyur No.687, Palembang 30134. Lokasi strategis dan mudah diakses menggunakan kendaraan pribadi maupun transportasi umum.',
  'general',
  4,
  true
),
(
  'Apakah tersedia area parkir?',
  'Ya, Kebon Gede Venue menyediakan area parkir yang sangat luas dan memadai untuk menampung banyak kendaraan pengunjung, dengan akses dekat ke venue.',
  'facilities',
  5,
  true
),
(
  'Bagaimana cara melakukan booking?',
  'Anda bisa menghubungi kami melalui form kontak di website, WhatsApp, atau telepon langsung. Tim kami akan membantu Anda untuk survei lokasi dan diskusi kebutuhan acara.',
  'booking',
  6,
  true
);

-- 4. HERO SLIDES
INSERT INTO public.hero_slides (image_url, title, subtitle, cta_text, cta_link, display_order, is_active)
VALUES
('/images/18.png', 'KEBON GEDE VENUE', 'Best Venue for Your Event di Kota Palembang', 'Jelajahi Venue', '/venues', 1, true),
('/images/13.png', 'Nuansa Alam Tropis & Megah', 'Kawasan seluas 1 hektar dengan fasilitas modern terlengkap', 'Lihat Galeri', '/gallery', 2, true),
('/images/1.png', 'Wujudkan Pernikahan Impian Anda', 'Pilihan venue indoor, semi outdoor, hingga full outdoor', 'Booking Sekarang', '/contact', 3, true);

-- 5. GALLERY ITEMS
INSERT INTO public.gallery_items (image_url, title, description, category, venue_id, is_featured, display_order)
VALUES
('/images/1.png', 'Resepsi Pernikahan Megah', 'Dekorasi chandelier mewah dan pelaminan megah', 'wedding', 'a2222222-2222-2222-2222-222222222222', true, 1),
('/images/2.png', 'Pelaminan Bunga Elegan', 'Dekorasi sofa pelaminan berlatar bunga warna-warni', 'wedding', 'a2222222-2222-2222-2222-222222222222', true, 2),
('/images/7.png', 'Pesta Malam Outdoor', 'Resepsi malam dengan tata cahaya lampu gantung hangat', 'wedding', 'a3333333-3333-3333-3333-333333333333', true, 3),
('/images/9.png', 'Senam Sehat Massal', 'Aktivitas olahraga bersama di lapangan hijau terbuka', 'outbound', 'a3333333-3333-3333-3333-333333333333', true, 4),
('/images/10.png', 'Fun Games Outbound', 'Keseruan kompetisi dan kekompakan tim', 'outbound', 'a3333333-3333-3333-3333-333333333333', true, 5),
('/images/11.png', 'Wisuda Ceria Anak Bangsa', 'Perayaan kelulusan siswa penuh warna dan kebahagiaan', 'graduation', 'a1111111-1111-1111-1111-111111111111', true, 6),
('/images/12.png', 'Corporate Gathering POLYTAM', 'Pertemuan tahunan dan gala dinner perusahaan', 'corporate', 'a2222222-2222-2222-2222-222222222222', true, 7),
('/images/16.png', 'Rapat Kerja & Sharing Session', 'Suasana rapat santai dan kondusif berlatar alam', 'meeting', 'a1111111-1111-1111-1111-111111111111', true, 8);

-- 6. TESTIMONIALS
INSERT INTO public.testimonials (client_name, client_title, content, rating, avatar_url, event_type, is_featured, is_approved)
VALUES
('Rian & Sarah', 'Pengantin (Wedding Anggrek)', 'Pernikahan kami di Venue Anggrek Kebon Gede sangat berkesan! Tamu 1.500 orang tertampung dengan sangat nyaman, ruang pengantinnya adem dan pelayanannya sigap.', 5, '/images/3.png', 'wedding', true, true),
('PT Sriwijaya Mandiri', 'Corporate Gathering Organizer', 'Tempat terbaik di Palembang untuk family gathering perusahaan. Lapangan sangat luas, anak-anak leluasa main games, dan parkirannya super lega.', 5, '/images/12.png', 'corporate', true, true),
('Dina Prasetya', 'Ketua Panitia Wisuda TK & SD', 'Venue Teratai sangat cocok untuk wisuda semi outdoor. Adem, pemandangannya indah, dekorasinya pas, dan para orang tua murid sangat puas.', 5, '/images/11.png', 'graduation', true, true);

-- 7. EVENTS
INSERT INTO public.events (id, title, slug, description, content, cover_image_url, event_date, event_type, venue_id, is_published)
VALUES
(
  'e1111111-1111-1111-1111-111111111111',
  'Pernikahan Adat Palembang Dina & Raka',
  'pernikahan-adat-palembang-dina-raka',
  'Perayaan pernikahan adat Palembang yang megah dengan dekorasi tradisional dan modern.',
  '<p>Pernikahan Dina & Raka menjadi salah satu momen paling berkesan di Kebon Gede Venue. Dengan tema adat Palembang yang dipadukan sentuhan modern, acara ini dihadiri lebih dari 1500 tamu undangan.</p><p>Dekorasi menggunakan bunga segar dengan palet warna merah, pink, dan biru yang memberikan nuansa romantis namun megah.</p>',
  '/images/3.png',
  '2026-03-15',
  'wedding',
  'a2222222-2222-2222-2222-222222222222',
  true
),
(
  'e2222222-2222-2222-2222-222222222222',
  'Wedding Garden Party Mia & Riski',
  'wedding-garden-party-mia-riski',
  'Garden party wedding romantis di bawah bintang dengan dekorasi bunga dan confetti.',
  '<p>Mia & Riski memilih konsep garden party untuk hari bahagia mereka di Venue Kana. Suasana outdoor yang sejuk dengan pepohonan tropis memberikan latar belakang yang sempurna.</p>',
  '/images/7.png',
  '2026-05-20',
  'wedding',
  'a3333333-3333-3333-3333-333333333333',
  true
),
(
  'e3333333-3333-3333-3333-333333333333',
  'Rapat Koordinasi Bank SumselBabel 2026',
  'rapat-koordinasi-bank-sumselbabel-2026',
  'Rapat koordinasi dan sharing session Bank SumselBabel di Venue Teratai.',
  '<p>Bank SumselBabel mempercayakan Kebon Gede Venue sebagai lokasi Rapat Koordinasi tahunan mereka. Acara berlangsung di Venue Teratai dengan suasana semi outdoor yang nyaman.</p>',
  '/images/16.png',
  '2026-06-10',
  'meeting',
  'a1111111-1111-1111-1111-111111111111',
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 8. BLOG POSTS
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, author_name, status, tags, published_at)
VALUES
(
  'b1111111-1111-1111-1111-111111111111',
  '5 Tips Memilih Venue Pernikahan yang Sempurna',
  '5-tips-memilih-venue-pernikahan-yang-sempurna',
  'Memilih venue pernikahan adalah salah satu keputusan terpenting dalam perencanaan hari bahagia Anda. Berikut 5 tips yang perlu diperhatikan.',
  '<h2>1. Sesuaikan dengan Budget</h2><p>Langkah pertama adalah menentukan budget untuk venue. Pastikan pilihan venue sesuai dengan anggaran yang sudah direncanakan tanpa mengorbankan kualitas.</p><h2>2. Perhatikan Kapasitas</h2><p>Hitung jumlah tamu undangan dan pastikan venue mampu menampung seluruh tamu dengan nyaman.</p><h2>3. Lokasi yang Strategis</h2><p>Pilih venue yang mudah dijangkau oleh mayoritas tamu undangan di Palembang.</p>',
  '/images/13.png',
  'Admin Kebon Gede',
  'published',
  ARRAY['wedding', 'tips', 'venue'],
  NOW()
),
(
  'b2222222-2222-2222-2222-222222222222',
  'Kebon Gede Venue: Venue Terbaik untuk Corporate Event di Palembang',
  'kebon-gede-venue-terbaik-corporate-event-palembang',
  'Temukan alasan mengapa Kebon Gede Venue menjadi pilihan utama berbagai perusahaan di Palembang.',
  '<p>Dengan luas area mencapai 1 hektar dan fasilitas lengkap, Kebon Gede Venue siap mengakomodasi berbagai skala perhelatan perusahaan Anda.</p>',
  '/images/12.png',
  'Admin Kebon Gede',
  'published',
  ARRAY['corporate', 'event', 'palembang'],
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

