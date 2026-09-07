import type {
  Venue,
  GalleryItem,
  EventItem,
  BlogPost,
  Testimonial,
  FAQ,
  HeroSlide,
  SiteSetting,
  ContactMessage,
} from "@/types";

// ============================================
// VENUES
// ============================================
export const venues: Venue[] = [
  {
    id: "v1",
    name: "Venue Teratai",
    slug: "venue-teratai",
    short_description:
      "Venue semi outdoor yang elegan dengan suasana gazebo dan taman asri, cocok untuk berbagai jenis acara.",
    full_description:
      "Venue Teratai menghadirkan konsep semi outdoor yang memadukan keindahan alam dengan kenyamanan fasilitas modern. Dengan desain gazebo yang elegan dan taman asri yang mengelilingi, venue ini menciptakan suasana intimate namun tetap megah. Cocok untuk acara pernikahan, gathering, seminar, dan berbagai kegiatan lainnya dengan kapasitas 500 hingga 1000 orang. Didukung dengan sound system berkualitas, panggung, dan area parkir yang luas.",
    venue_type: "semi_outdoor",
    capacity_min: 500,
    capacity_max: 1000,
    facilities: [
      "Gazebo",
      "Taman Asri",
      "Panggung",
      "Sound System",
      "Area Parkir Luas",
      "Toilet",
      "Musholla",
    ],
    hero_image_url: "/images/17.png",
    images: ["/images/17.png", "/images/15.png", "/images/16.png"],
    is_active: true,
    display_order: 1,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "v2",
    name: "Venue Anggrek",
    slug: "venue-anggrek",
    short_description:
      "Venue bernuansa New Outdoor & Semi Outdoor, sangat luas dengan kapasitas hingga 2000 orang dan fasilitas lengkap.",
    full_description:
      "Venue Anggrek merupakan venue yang bernuansa New Outdoor & Semi Outdoor. Sangat Luas, bersih, Nyaman dan memiliki kapasitas lebih dari 1000-2000. Venue Anggrek mempunyai fasilitas Seperti Toilet, Ruang Tunggu Full AC, Ruang Pengantin Full AC, Ruang Meeting, Kitchen Space, Dan Taman Anggrek. Selain itu Venue Anggrek Memiliki tempat parkir yang sangat Luas dan dekat dengan Venue. Venue ini menjadi pilihan utama untuk acara pernikahan besar, corporate event, dan gathering berskala besar.",
    venue_type: "semi_outdoor",
    capacity_min: 1000,
    capacity_max: 2000,
    facilities: [
      "Toilet",
      "Ruang Tunggu Full AC",
      "Ruang Pengantin Full AC",
      "Ruang Meeting",
      "Kitchen Space",
      "Taman Anggrek",
      "Parkir Luas",
      "Sound System",
      "Lighting Profesional",
      "Musholla",
    ],
    hero_image_url: "/images/6.png",
    images: [
      "/images/6.png",
      "/images/1.png",
      "/images/2.png",
      "/images/5.png",
    ],
    is_active: true,
    display_order: 2,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "v3",
    name: "Venue Kana",
    slug: "venue-kana",
    short_description:
      "Venue bernuansa Full Outdoor dengan suasana sejuk, taman tropis, dan kapasitas besar lebih dari 1000 orang.",
    full_description:
      "Venue Kana merupakan venue yang bernuansa Full Outdoor. Sangat Luas, bersih, Sejuk dan memiliki kapasitas lebih dari 1000. Venue Kana mempunyai fasilitas Seperti Toilet, Ruang Tunggu Full AC dan Memiliki tempat parkir yang sangat Luas yang dekat dengan Venue Kana. Dikelilingi oleh pepohonan tropis dan taman hijau, venue ini memberikan suasana alami yang sempurna untuk pernikahan outdoor, garden party, dan acara outdoor lainnya.",
    venue_type: "outdoor",
    capacity_min: 1000,
    capacity_max: 1500,
    facilities: [
      "Toilet",
      "Ruang Tunggu Full AC",
      "Parkir Luas",
      "Taman Tropis",
      "Sound System",
      "Lighting",
      "Musholla",
    ],
    hero_image_url: "/images/13.png",
    images: [
      "/images/13.png",
      "/images/7.png",
      "/images/8.png",
      "/images/18.png",
    ],
    is_active: true,
    display_order: 3,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

// ============================================
// GALLERY ITEMS
// ============================================
export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    image_url: "/images/1.png",
    title: "Resepsi Pernikahan Mewah",
    description: "Dekorasi chandelier megah dengan bunga segar untuk resepsi pernikahan indoor",
    category: "wedding",
    venue_id: "v2",
    is_featured: true,
    display_order: 1,
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "g2",
    image_url: "/images/2.png",
    title: "Pelaminan Elegan",
    description: "Pelaminan mewah dengan dekorasi bunga warna-warni di Venue Anggrek",
    category: "wedding",
    venue_id: "v2",
    is_featured: true,
    display_order: 2,
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "g3",
    image_url: "/images/3.png",
    title: "Pernikahan Adat Palembang",
    description: "Pengantin dengan busana adat Palembang lengkap dengan efek kabut panggung",
    category: "wedding",
    venue_id: "v2",
    is_featured: true,
    display_order: 3,
    created_at: "2026-02-10T00:00:00Z",
  },
  {
    id: "g4",
    image_url: "/images/4.png",
    title: "Prewedding di Taman",
    description: "Sesi foto prewedding di jembatan taman tropis Kebon Gede",
    category: "wedding",
    venue_id: "v3",
    is_featured: false,
    display_order: 4,
    created_at: "2026-02-20T00:00:00Z",
  },
  {
    id: "g5",
    image_url: "/images/5.png",
    title: "Tarian Adat Pengantin",
    description: "Penampilan tarian adat tradisional dalam resepsi pernikahan",
    category: "wedding",
    venue_id: "v2",
    is_featured: false,
    display_order: 5,
    created_at: "2026-03-05T00:00:00Z",
  },
  {
    id: "g6",
    image_url: "/images/6.png",
    title: "Hall Venue Anggrek",
    description: "Interior Venue Anggrek dengan setup meja dan kursi gold untuk gala dinner",
    category: "corporate",
    venue_id: "v2",
    is_featured: true,
    display_order: 6,
    created_at: "2026-03-10T00:00:00Z",
  },
  {
    id: "g7",
    image_url: "/images/7.png",
    title: "Wedding Outdoor Malam",
    description: "Resepsi pernikahan malam hari di outdoor dengan confetti dan kabut romantis",
    category: "wedding",
    venue_id: "v3",
    is_featured: true,
    display_order: 7,
    created_at: "2026-03-15T00:00:00Z",
  },
  {
    id: "g8",
    image_url: "/images/8.png",
    title: "Panggung Outdoor",
    description: "Pasangan pengantin di panggung outdoor dengan dekorasi lengkung bunga",
    category: "wedding",
    venue_id: "v3",
    is_featured: false,
    display_order: 8,
    created_at: "2026-04-01T00:00:00Z",
  },
  {
    id: "g9",
    image_url: "/images/9.png",
    title: "Senam Pagi Bersama",
    description: "Kegiatan senam massal outdoor bersama komunitas di Kebon Gede",
    category: "outbound",
    venue_id: "v3",
    is_featured: false,
    display_order: 9,
    created_at: "2026-04-10T00:00:00Z",
  },
  {
    id: "g10",
    image_url: "/images/10.png",
    title: "Fun Games Outbound",
    description: "Lomba dan permainan seru dalam kegiatan outbound",
    category: "outbound",
    venue_id: "v3",
    is_featured: true,
    display_order: 10,
    created_at: "2026-04-15T00:00:00Z",
  },
  {
    id: "g11",
    image_url: "/images/11.png",
    title: "Wisuda PAUD",
    description: "Acara wisuda anak-anak PAUD dengan dekorasi balon meriah",
    category: "graduation",
    venue_id: "v1",
    is_featured: false,
    display_order: 11,
    created_at: "2026-05-01T00:00:00Z",
  },
  {
    id: "g12",
    image_url: "/images/12.png",
    title: "Corporate Gathering",
    description: "Event gathering korporat PT Polytam di area outdoor Kebon Gede",
    category: "corporate",
    venue_id: "v3",
    is_featured: true,
    display_order: 12,
    created_at: "2026-05-10T00:00:00Z",
  },
  {
    id: "g13",
    image_url: "/images/13.png",
    title: "Dekorasi Outdoor Putih",
    description: "Venue outdoor dengan dekorasi putih elegan dan lentera gantung",
    category: "wedding",
    venue_id: "v3",
    is_featured: true,
    display_order: 13,
    created_at: "2026-05-20T00:00:00Z",
  },
  {
    id: "g14",
    image_url: "/images/14.png",
    title: "Workout Session",
    description: "Sesi workout dan senam bersama di area semi outdoor",
    category: "outbound",
    venue_id: "v1",
    is_featured: false,
    display_order: 14,
    created_at: "2026-06-01T00:00:00Z",
  },
  {
    id: "g15",
    image_url: "/images/15.png",
    title: "Event Komunitas",
    description: "Acara komunitas Palembang Runners di panggung outdoor Kebon Gede",
    category: "other",
    venue_id: "v1",
    is_featured: false,
    display_order: 15,
    created_at: "2026-06-10T00:00:00Z",
  },
  {
    id: "g16",
    image_url: "/images/16.png",
    title: "Rapat Koordinasi",
    description: "Rapat koordinasi dan sharing session Bank SumselBabel",
    category: "meeting",
    venue_id: "v1",
    is_featured: true,
    display_order: 16,
    created_at: "2026-06-15T00:00:00Z",
  },
  {
    id: "g17",
    image_url: "/images/17.png",
    title: "Seminar di Gazebo",
    description: "Kegiatan seminar dan presentasi di gazebo Venue Teratai",
    category: "meeting",
    venue_id: "v1",
    is_featured: false,
    display_order: 17,
    created_at: "2026-07-01T00:00:00Z",
  },
  {
    id: "g18",
    image_url: "/images/18.png",
    title: "Venue Senja",
    description: "Pemandangan venue saat senja dengan lampu hias dan dekorasi taman",
    category: "other",
    venue_id: "v3",
    is_featured: true,
    display_order: 18,
    created_at: "2026-07-10T00:00:00Z",
  },
  {
    id: "g19",
    image_url: "/images/19.png",
    title: "Fun Gathering Korporat",
    description: "Fun gathering perusahaan Satwa Indotama Perkasa di outdoor area",
    category: "corporate",
    venue_id: "v3",
    is_featured: false,
    display_order: 19,
    created_at: "2026-07-15T00:00:00Z",
  },
  {
    id: "g20",
    image_url: "/images/20.png",
    title: "Gerbang Masuk Kebon Gede",
    description: "Gerbang masuk utama Kebon Gede Venue tampak depan",
    category: "other",
    venue_id: undefined,
    is_featured: false,
    display_order: 20,
    created_at: "2026-08-01T00:00:00Z",
  },
];

// ============================================
// EVENTS
// ============================================
export const events: EventItem[] = [
  {
    id: "e1",
    title: "Pernikahan Adat Palembang Dina & Raka",
    slug: "pernikahan-adat-palembang-dina-raka",
    description:
      "Perayaan pernikahan adat Palembang yang megah dengan dekorasi tradisional dan modern.",
    content: `<p>Pernikahan Dina & Raka menjadi salah satu momen paling berkesan di Kebon Gede Venue. Dengan tema adat Palembang yang dipadukan sentuhan modern, acara ini dihadiri lebih dari 1500 tamu undangan.</p>
<p>Dekorasi menggunakan bunga segar dengan palet warna merah, pink, dan biru yang memberikan nuansa romantis namun megah. Chandelier kristal menambah kemewahan venue yang sudah elegan.</p>
<p>Kebon Gede Venue bangga menjadi bagian dari momen bahagia pasangan ini. Kami berkomitmen untuk terus memberikan layanan terbaik untuk setiap acara yang dipercayakan kepada kami.</p>`,
    cover_image_url: "/images/3.png",
    event_date: "2026-03-15",
    event_type: "wedding",
    venue_id: "v2",
    venue_name: "Venue Anggrek",
    is_published: true,
    created_at: "2026-03-16T00:00:00Z",
    updated_at: "2026-03-16T00:00:00Z",
  },
  {
    id: "e2",
    title: "Wedding Garden Party Mia & Riski",
    slug: "wedding-garden-party-mia-riski",
    description:
      "Garden party wedding romantis di bawah bintang dengan dekorasi bunga dan confetti.",
    content: `<p>Mia & Riski memilih konsep garden party untuk hari bahagia mereka di Venue Kana. Suasana outdoor yang sejuk dengan pepohonan tropis memberikan latar belakang yang sempurna.</p>
<p>Dekorasi menggunakan tema putih dan ungu dengan string lights yang menambah kesan romantis di malam hari. Momen puncak saat confetti berterbangan di udara menjadi kenangan yang tak terlupakan.</p>`,
    cover_image_url: "/images/7.png",
    event_date: "2026-05-20",
    event_type: "wedding",
    venue_id: "v3",
    venue_name: "Venue Kana",
    is_published: true,
    created_at: "2026-05-21T00:00:00Z",
    updated_at: "2026-05-21T00:00:00Z",
  },
  {
    id: "e3",
    title: "Rapat Koordinasi Bank SumselBabel 2026",
    slug: "rapat-koordinasi-bank-sumselbabel-2026",
    description:
      "Rapat koordinasi dan sharing session Bank SumselBabel di Venue Teratai.",
    content: `<p>Bank SumselBabel mempercayakan Kebon Gede Venue sebagai lokasi Rapat Koordinasi tahunan mereka. Acara berlangsung di Venue Teratai dengan suasana semi outdoor yang nyaman.</p>
<p>Dengan fasilitas lengkap termasuk projector, sound system, dan area breakout, peserta dapat fokus pada materi tanpa terganggu. Suasana alami venue memberikan energi positif selama sesi berlangsung.</p>`,
    cover_image_url: "/images/16.png",
    event_date: "2026-06-10",
    event_type: "meeting",
    venue_id: "v1",
    venue_name: "Venue Teratai",
    is_published: true,
    created_at: "2026-06-11T00:00:00Z",
    updated_at: "2026-06-11T00:00:00Z",
  },
  {
    id: "e4",
    title: "Outbound PT Polytam - Team Building 2026",
    slug: "outbound-pt-polytam-team-building-2026",
    description:
      "Kegiatan outbound dan team building seru bersama tim PT Polytam di area outdoor.",
    content: `<p>PT Polytam mengadakan kegiatan outbound dan team building tahunan di Kebon Gede Venue. Dengan area outdoor yang luas, berbagai permainan team building dapat dilaksanakan dengan leluasa.</p>
<p>Mulai dari ice breaking, relay race, hingga problem solving games, semua peserta antusias mengikuti setiap sesi. Area hijau dan sejuk membuat kegiatan outdoor terasa nyaman meski di siang hari.</p>`,
    cover_image_url: "/images/12.png",
    event_date: "2026-04-25",
    event_type: "outbound",
    venue_id: "v3",
    venue_name: "Venue Kana",
    is_published: true,
    created_at: "2026-04-26T00:00:00Z",
    updated_at: "2026-04-26T00:00:00Z",
  },
  {
    id: "e5",
    title: "Wisuda PAUD/KB Athaya Naffa",
    slug: "wisuda-paud-kb-athaya-naffa",
    description:
      "Acara pelepasan siswa dan pembagian rapor PAUD/KB Athaya Naffa dengan dekorasi meriah.",
    content: `<p>Momen bahagia para lulusan cilik PAUD/KB Athaya Naffa dirayakan di Kebon Gede Venue. Dengan dekorasi balon warna-warni dan backdrop yang ceria, acara berlangsung meriah dan penuh kebahagiaan.</p>
<p>Para siswa menampilkan berbagai pertunjukan yang menggemaskan di hadapan orang tua dan guru. Kebon Gede Venue bangga menjadi bagian dari momen bersejarah ini.</p>`,
    cover_image_url: "/images/11.png",
    event_date: "2026-07-05",
    event_type: "graduation",
    venue_id: "v1",
    venue_name: "Venue Teratai",
    is_published: true,
    created_at: "2026-07-06T00:00:00Z",
    updated_at: "2026-07-06T00:00:00Z",
  },
  {
    id: "e6",
    title: "Fun Gathering Satwa Indotama Perkasa",
    slug: "fun-gathering-satwa-indotama-perkasa",
    description:
      "Fun gathering perusahaan dengan berbagai aktivitas seru dan kebersamaan tim.",
    content: `<p>Satwa Indotama Perkasa mengadakan fun gathering tahunan di Kebon Gede Venue. Acara ini bertujuan untuk mempererat hubungan antar karyawan melalui berbagai aktivitas menyenangkan.</p>
<p>Dari mulai games, hiburan, hingga makan bersama, setiap momen diisi dengan tawa dan kebersamaan. Suasana outdoor Kebon Gede memberikan energi positif bagi seluruh peserta.</p>`,
    cover_image_url: "/images/19.png",
    event_date: "2026-08-12",
    event_type: "corporate",
    venue_id: "v3",
    venue_name: "Venue Kana",
    is_published: true,
    created_at: "2026-08-13T00:00:00Z",
    updated_at: "2026-08-13T00:00:00Z",
  },
];

// ============================================
// BLOG POSTS
// ============================================
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "5 Tips Memilih Venue Pernikahan yang Sempurna",
    slug: "5-tips-memilih-venue-pernikahan-yang-sempurna",
    excerpt:
      "Memilih venue pernikahan adalah salah satu keputusan terpenting dalam perencanaan hari bahagia Anda. Berikut 5 tips yang perlu diperhatikan.",
    content: `<h2>1. Sesuaikan dengan Budget</h2>
<p>Langkah pertama adalah menentukan budget untuk venue. Pastikan pilihan venue sesuai dengan anggaran yang sudah direncanakan tanpa mengorbankan kualitas.</p>
<h2>2. Perhatikan Kapasitas</h2>
<p>Hitung jumlah tamu undangan dan pastikan venue mampu menampung seluruh tamu dengan nyaman. Venue yang terlalu kecil akan terasa sesak, sementara yang terlalu besar terasa kosong.</p>
<h2>3. Lokasi yang Strategis</h2>
<p>Pilih venue yang mudah dijangkau oleh mayoritas tamu undangan. Aksesibilitas dan ketersediaan parkir juga perlu diperhatikan.</p>
<h2>4. Fasilitas Lengkap</h2>
<p>Pastikan venue menyediakan fasilitas yang Anda butuhkan seperti ruang ganti, toilet, sound system, dan area parkir yang memadai.</p>
<h2>5. Suasana yang Sesuai Tema</h2>
<p>Pilih venue yang mendukung tema pernikahan Anda, baik outdoor garden party maupun indoor glamour. Kebon Gede Venue menyediakan keduanya!</p>`,
    cover_image_url: "/images/13.png",
    author_name: "Admin KG",
    status: "published",
    tags: ["wedding", "tips", "venue"],
    published_at: "2026-02-10T00:00:00Z",
    created_at: "2026-02-10T00:00:00Z",
    updated_at: "2026-02-10T00:00:00Z",
  },
  {
    id: "b2",
    title: "Kebon Gede Venue: Venue Terbaik untuk Corporate Event di Palembang",
    slug: "kebon-gede-venue-terbaik-corporate-event-palembang",
    excerpt:
      "Mengapa Kebon Gede Venue menjadi pilihan utama perusahaan-perusahaan besar di Palembang untuk mengadakan corporate event.",
    content: `<h2>Venue yang Versatile</h2>
<p>Kebon Gede Venue menawarkan fleksibilitas yang tinggi untuk berbagai jenis corporate event. Dari meeting formal, workshop, team building, hingga gala dinner, semua bisa diakomodasi.</p>
<h2>Fasilitas Modern</h2>
<p>Dengan fasilitas ruang meeting ber-AC, kitchen space, dan sound system profesional, setiap acara korporat dapat berjalan dengan lancar dan profesional.</p>
<h2>Suasana yang Menyegarkan</h2>
<p>Berbeda dengan hotel konvensional, Kebon Gede Venue menawarkan suasana alam yang menyegarkan. Pepohonan hijau dan udara segar memberikan energi positif bagi peserta.</p>`,
    cover_image_url: "/images/12.png",
    author_name: "Admin KG",
    status: "published",
    tags: ["corporate", "event", "palembang"],
    published_at: "2026-04-05T00:00:00Z",
    created_at: "2026-04-05T00:00:00Z",
    updated_at: "2026-04-05T00:00:00Z",
  },
  {
    id: "b3",
    title: "Tren Dekorasi Pernikahan 2026: Outdoor & Natural",
    slug: "tren-dekorasi-pernikahan-2026-outdoor-natural",
    excerpt:
      "Tahun 2026 membawa tren dekorasi pernikahan yang kembali ke alam. Simak inspirasi dekorasi yang sedang populer.",
    content: `<h2>Kembali ke Alam</h2>
<p>Tren 2026 menunjukkan pasangan-pasangan memilih dekorasi yang natural dan earth-toned. Penggunaan bunga lokal, greenery, dan elemen kayu menjadi pilihan favorit.</p>
<h2>String Lights & Lanterns</h2>
<p>Pencahayaan romantis dengan string lights dan lentera menjadi must-have untuk pernikahan outdoor. Efeknya sangat magical terutama saat senja dan malam hari.</p>
<h2>Venue Outdoor Bertaman</h2>
<p>Venue dengan taman hijau seperti Kebon Gede Venue menjadi pilihan utama. Latar belakang alami mengurangi kebutuhan dekorasi berlebihan namun tetap terlihat memukau.</p>`,
    cover_image_url: "/images/18.png",
    author_name: "Admin KG",
    status: "published",
    tags: ["wedding", "dekorasi", "tren"],
    published_at: "2026-06-20T00:00:00Z",
    created_at: "2026-06-20T00:00:00Z",
    updated_at: "2026-06-20T00:00:00Z",
  },
  {
    id: "b4",
    title: "Panduan Lengkap Outbound & Team Building di Kebon Gede",
    slug: "panduan-lengkap-outbound-team-building-kebon-gede",
    excerpt:
      "Rencanakan kegiatan outbound dan team building yang berkesan di Kebon Gede Venue. Berikut panduan lengkapnya.",
    content: `<h2>Mengapa Outbound di Kebon Gede?</h2>
<p>Dengan luas mencapai 1 hektar dan area outdoor yang hijau, Kebon Gede Venue adalah lokasi ideal untuk kegiatan outbound. Udara segar dan pemandangan alam membuat peserta lebih bersemangat.</p>
<h2>Aktivitas yang Bisa Dilakukan</h2>
<p>Berbagai aktivitas dapat dilakukan mulai dari ice breaking games, relay race, problem solving challenges, hingga fun cooking. Tim kami siap membantu merencanakan rangkaian kegiatan sesuai kebutuhan.</p>
<h2>Tips Sukses</h2>
<p>Pastikan untuk mempersiapkan air minum yang cukup, sunblock, dan pakaian olahraga yang nyaman. Koordinasikan dengan tim Kebon Gede untuk kebutuhan sound system dan area istirahat.</p>`,
    cover_image_url: "/images/9.png",
    author_name: "Admin KG",
    status: "published",
    tags: ["outbound", "team building", "tips"],
    published_at: "2026-08-01T00:00:00Z",
    created_at: "2026-08-01T00:00:00Z",
    updated_at: "2026-08-01T00:00:00Z",
  },
];

// ============================================
// TESTIMONIALS
// ============================================
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    client_name: "Dina & Raka",
    client_title: "Pasangan Pengantin",
    content:
      "Kebon Gede Venue benar-benar melebihi ekspektasi kami! Venue Anggrek sangat luas dan megah, dekorasi bisa bebas sesuai keinginan. Tim sangat profesional dan helpful dari awal sampai akhir acara.",
    rating: 5,
    event_type: "wedding",
    is_featured: true,
    is_approved: true,
    created_at: "2026-03-20T00:00:00Z",
  },
  {
    id: "t2",
    client_name: "Budi Santoso",
    client_title: "HR Manager, PT Polytam",
    content:
      "Sudah 3 tahun berturut-turut kami mengadakan outbound di Kebon Gede. Area outdoor yang luas dan hijau membuat kegiatan team building sangat nyaman. Fasilitas parkir juga sangat memadai untuk bus karyawan.",
    rating: 5,
    event_type: "outbound",
    is_featured: true,
    is_approved: true,
    created_at: "2026-05-15T00:00:00Z",
  },
  {
    id: "t3",
    client_name: "Mia & Riski",
    client_title: "Pasangan Pengantin",
    content:
      "Venue Kana outdoor-nya luar biasa! Suasana malam dengan lampu dan bintang membuat pernikahan kami terasa magical. Terima kasih Kebon Gede untuk momen tak terlupakan ini!",
    rating: 5,
    event_type: "wedding",
    is_featured: true,
    is_approved: true,
    created_at: "2026-05-25T00:00:00Z",
  },
  {
    id: "t4",
    client_name: "Ibu Ratna",
    client_title: "Kepala Sekolah PAUD Athaya Naffa",
    content:
      "Kami sangat puas dengan pelayanan Kebon Gede Venue untuk acara wisuda anak-anak. Tempatnya luas, bersih, dan aman untuk anak-anak bermain. Pasti akan kembali lagi tahun depan!",
    rating: 5,
    event_type: "graduation",
    is_featured: true,
    is_approved: true,
    created_at: "2026-07-10T00:00:00Z",
  },
  {
    id: "t5",
    client_name: "Ahmad Fauzi",
    client_title: "Event Organizer",
    content:
      "Sebagai EO, saya sering merekomendasikan Kebon Gede ke klien. Venue-nya fleksibel, fasilitas lengkap, dan tim pengelola sangat kooperatif. Harga juga sangat kompetitif dibanding venue lain di Palembang.",
    rating: 4,
    event_type: "corporate",
    is_featured: true,
    is_approved: true,
    created_at: "2026-08-05T00:00:00Z",
  },
  {
    id: "t6",
    client_name: "Siti Nurhaliza",
    client_title: "Manager, Bank SumselBabel",
    content:
      "Meeting dan rapat koordinasi di Venue Teratai sangat nyaman. Suasana semi outdoor membuat pikiran lebih segar. Fasilitas lengkap dan tim support responsif. Sangat direkomendasikan!",
    rating: 5,
    event_type: "meeting",
    is_featured: false,
    is_approved: true,
    created_at: "2026-06-20T00:00:00Z",
  },
];

// ============================================
// FAQs
// ============================================
export const faqs: FAQ[] = [
  {
    id: "f1",
    question: "Apa saja jenis acara yang bisa diadakan di Kebon Gede Venue?",
    answer:
      "Kebon Gede Venue bisa digunakan untuk berbagai acara seperti Wedding (pernikahan), Meeting, Outbound, Graduation (wisuda), Corporate Gathering, Birthday Party, Yoga, Work Out, dan aktivitas lainnya.",
    category: "general",
    display_order: 1,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "f2",
    question: "Berapa kapasitas masing-masing venue?",
    answer:
      "Venue Teratai menampung 500-1000 orang, Venue Anggrek menampung 1000-2000 orang, dan Venue Kana menampung lebih dari 1000 orang.",
    category: "venue",
    display_order: 2,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "f3",
    question: "Apa perbedaan Venue Anggrek dan Venue Kana?",
    answer:
      "Venue Anggrek bernuansa New Outdoor & Semi Outdoor dengan fasilitas lebih lengkap termasuk Ruang Pengantin AC, Ruang Meeting, dan Kitchen Space. Venue Kana bernuansa Full Outdoor dengan suasana sejuk dan taman tropis.",
    category: "venue",
    display_order: 3,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "f4",
    question: "Dimana lokasi Kebon Gede Venue?",
    answer:
      "Kebon Gede Venue terletak di Jl. Sultan Moh. Mansyur No.687, Palembang 30134. Lokasi strategis dan mudah diakses menggunakan kendaraan pribadi maupun transportasi umum.",
    category: "general",
    display_order: 4,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "f5",
    question: "Apakah tersedia area parkir?",
    answer:
      "Ya, Kebon Gede Venue menyediakan area parkir yang sangat luas dan memadai untuk menampung banyak kendaraan pengunjung, dengan akses dekat ke venue.",
    category: "facilities",
    display_order: 5,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "f6",
    question: "Bagaimana cara melakukan booking?",
    answer:
      "Anda bisa menghubungi kami melalui form kontak di website, WhatsApp, atau telepon langsung. Tim kami akan membantu Anda untuk survei lokasi dan diskusi kebutuhan acara.",
    category: "booking",
    display_order: 6,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];

// ============================================
// HERO SLIDES
// ============================================
export const heroSlides: HeroSlide[] = [
  {
    id: "hs1",
    image_url: "/images/18.png",
    title: "KEBON GEDE VENUE",
    subtitle: "Best Venue for Your Event — Venue Outdoor & Indoor Palembang",
    cta_text: "Explore Venues",
    cta_link: "/venues",
    display_order: 1,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "hs2",
    image_url: "/images/13.png",
    title: "Wedding of Your Dreams",
    subtitle:
      "Wujudkan pernikahan impian Anda di venue outdoor terbaik Palembang",
    cta_text: "Lihat Venue",
    cta_link: "/venues",
    display_order: 2,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "hs3",
    image_url: "/images/1.png",
    title: "Elegant Indoor Venue",
    subtitle:
      "Fasilitas lengkap & profesional untuk acara pernikahan indoor Anda",
    cta_text: "Hubungi Kami",
    cta_link: "/contact",
    display_order: 3,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];

// ============================================
// SITE SETTINGS
// ============================================
export const siteSettings: SiteSetting[] = [
  { id: "ss1", key: "site_name", value: "Kebon Gede Venue", type: "text", group_name: "general", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss2", key: "tagline", value: "Best Venue for Your Event", type: "text", group_name: "general", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss3", key: "description", value: "Venue Outdoor & Indoor terbaik di Palembang untuk Wedding, Meeting, Outbound, Graduation dan berbagai acara lainnya.", type: "text", group_name: "general", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss4", key: "address", value: "Jl. Sultan Moh. Mansyur No.687, Palembang 30134", type: "text", group_name: "contact", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss5", key: "phone", value: "+62 812-3456-7890", type: "text", group_name: "contact", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss6", key: "whatsapp", value: "+62 812-3456-7890", type: "text", group_name: "contact", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss7", key: "email", value: "info@kebongede.com", type: "text", group_name: "contact", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss8", key: "instagram", value: "https://instagram.com/kebongedevenue", type: "text", group_name: "social", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss9", key: "facebook", value: "https://facebook.com/kebongedevenue", type: "text", group_name: "social", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss10", key: "tiktok", value: "https://tiktok.com/@kebongedevenue", type: "text", group_name: "social", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss11", key: "meta_title", value: "Kebon Gede Venue - Best Venue for Your Event di Palembang", type: "text", group_name: "seo", updated_at: "2026-01-01T00:00:00Z" },
  { id: "ss12", key: "meta_description", value: "Kebon Gede Venue menyediakan venue outdoor & indoor terbaik di Palembang. Wedding, Meeting, Outbound, Graduation. Luas 1 hektar dengan fasilitas lengkap.", type: "text", group_name: "seo", updated_at: "2026-01-01T00:00:00Z" },
];

// ============================================
// CONTACT MESSAGES (sample for admin)
// ============================================
export const contactMessages: ContactMessage[] = [
  {
    id: "cm1",
    name: "Andi Prasetyo",
    email: "andi.prasetyo@email.com",
    phone: "081234567890",
    event_type: "wedding",
    preferred_date: "2026-12-15",
    venue_preference: "Venue Anggrek",
    estimated_guests: 1500,
    message: "Saya ingin booking Venue Anggrek untuk resepsi pernikahan anak saya. Apakah masih tersedia untuk tanggal 15 Desember 2026?",
    status: "new",
    admin_notes: "",
    created_at: "2026-09-01T10:30:00Z",
    updated_at: "2026-09-01T10:30:00Z",
  },
  {
    id: "cm2",
    name: "PT Maju Bersama",
    email: "hr@majubersama.co.id",
    phone: "081298765432",
    event_type: "corporate",
    preferred_date: "2026-10-20",
    venue_preference: "Venue Kana",
    estimated_guests: 200,
    message: "Kami berencana mengadakan company gathering & outbound untuk 200 karyawan. Mohon info paket dan harga.",
    status: "read",
    admin_notes: "Sudah dihubungi, menunggu konfirmasi tanggal.",
    created_at: "2026-08-28T14:00:00Z",
    updated_at: "2026-08-29T09:00:00Z",
  },
  {
    id: "cm3",
    name: "Sari Dewi",
    email: "sari.dewi@gmail.com",
    phone: "081387654321",
    event_type: "graduation",
    preferred_date: "2026-11-05",
    venue_preference: "Venue Teratai",
    estimated_guests: 300,
    message: "Ingin menanyakan ketersediaan venue untuk acara wisuda sekolah. Estimasi 300 orang termasuk siswa dan orang tua.",
    status: "responded",
    admin_notes: "Sudah kirim proposal via email. Follow up minggu depan.",
    created_at: "2026-08-25T08:15:00Z",
    updated_at: "2026-08-26T11:30:00Z",
  },
  {
    id: "cm4",
    name: "Komunitas Yoga Palembang",
    email: "yogaplg@email.com",
    phone: "081356789012",
    event_type: "other",
    preferred_date: "2026-10-01",
    venue_preference: "Belum Tahu",
    estimated_guests: 100,
    message: "Kami ingin mengadakan yoga session outdoor untuk 100 orang. Apakah ada space yang cocok?",
    status: "new",
    admin_notes: "",
    created_at: "2026-09-03T16:45:00Z",
    updated_at: "2026-09-03T16:45:00Z",
  },
  {
    id: "cm5",
    name: "Riko Hidayat",
    email: "riko.h@company.com",
    phone: "081245678901",
    event_type: "meeting",
    preferred_date: "2026-09-25",
    venue_preference: "Venue Teratai",
    estimated_guests: 50,
    message: "Mohon informasi untuk sewa Venue Teratai untuk rapat kerja 1 hari penuh, 50 orang. Perlu projector dan sound system.",
    status: "new",
    admin_notes: "",
    created_at: "2026-09-05T09:00:00Z",
    updated_at: "2026-09-05T09:00:00Z",
  },
];

// Helper to get setting value
export function getSetting(key: string): string {
  return siteSettings.find((s) => s.key === key)?.value ?? "";
}

// Helper to get venue by slug
export function getVenueBySlug(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug);
}

// Helper to get event by slug
export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

// Helper to get blog post by slug
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

// Helper to get gallery items by category
export function getGalleryByCategory(category?: string): GalleryItem[] {
  if (!category || category === "all") return galleryItems;
  return galleryItems.filter((g) => g.category === category);
}

// Helper to get featured gallery items
export function getFeaturedGallery(): GalleryItem[] {
  return galleryItems.filter((g) => g.is_featured);
}

// Helper to get events by venue
export function getEventsByVenue(venueId: string): EventItem[] {
  return events.filter((e) => e.venue_id === venueId && e.is_published);
}
