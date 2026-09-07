import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Users,
  Compass,
  GraduationCap,
  Briefcase,
  Cake,
  Activity,
  Sparkles,
  MapPin,
  Trees,
  Maximize2,
  Wrench,
  Car,
  ArrowRight,
} from "lucide-react";
import HeroSlider from "@/components/public/hero-slider";
import SectionHeading from "@/components/public/section-heading";
import VenueCard from "@/components/public/venue-card";
import GalleryGrid from "@/components/public/gallery-grid";
import TestimonialCarousel from "@/components/public/testimonial-carousel";
import FAQAccordion from "@/components/public/faq-accordion";
import CTASection from "@/components/public/cta-section";
import StatsCounter from "@/components/public/stats-counter";
import { venues, galleryItems, faqs } from "@/lib/seed-data";

const eventTypes = [
  { label: "Wedding & Resepsi", icon: Heart, desc: "Pernikahan impian indoor & outdoor" },
  { label: "Meeting & Seminar", icon: Briefcase, desc: "Rapat koordinasi & meeting formal" },
  { label: "Outbound & Fun Games", icon: Compass, desc: "Aktivitas kekompakan tim di alam hijau" },
  { label: "Graduation / Wisuda", icon: GraduationCap, desc: "Momen kelulusan berkesan & megah" },
  { label: "Corporate Gathering", icon: Users, desc: "Family gathering & acara korporat" },
  { label: "Birthday Party", icon: Cake, desc: "Perayaan ulang tahun spesial & ceria" },
  { label: "Yoga & Wellness", icon: Activity, desc: "Olahraga santai di udara segar pagi hari" },
  { label: "Gathering Komunitas", icon: Sparkles, desc: "Tempat berkumpul komunitas & hobi" },
];

const advantages = [
  {
    icon: MapPin,
    title: "Lokasi Strategis & Akses Mudah",
    desc: "Terletak di Jl. Sultan Moh. Mansyur No.687 Palembang, mudah dijangkau dari berbagai penjuru kota dan bebas macet parah.",
  },
  {
    icon: Maximize2,
    title: "Area Luas & Fleksibel (1 Hektar)",
    desc: "Kawasan seluas 1 hektar dengan kapasitas hingga 2.000+ tamu, fleksibel didekorasi untuk tema acara apa saja.",
  },
  {
    icon: Trees,
    title: "Pemandangan Alam Asri & Hijau",
    desc: "Suasana alam tropis alami yang sejuk dengan taman hijau, pohon rindang, dan spot foto instagramable.",
  },
  {
    icon: Wrench,
    title: "Fasilitas Modern & Lengkap",
    desc: "Ruang pengantin AC, ruang transit, sound system, toilet bersih, mushola, dapur catering, dan genset backup.",
  },
  {
    icon: Car,
    title: "Area Parkir Sangat Luas",
    desc: "Daya tampung ratusan kendaraan roda empat dan roda dua dengan petugas keamanan yang sigap menjaga kenyamanan.",
  },
];

export default function HomePage() {
  const featuredGallery = galleryItems.slice(0, 8);

  return (
    <div className="flex flex-col gap-0">
      {/* Section 1: Hero Slider */}
      <HeroSlider />

      {/* Section 2: Tentang Singkat */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="relative h-[280px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white">
                <Image
                  src="/images/20.png"
                  alt="Gerbang Kebon Gede Venue Palembang"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-forest text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl hidden sm:block border-2 border-gold/30">
                <p className="font-heading text-2xl sm:text-3xl font-bold text-gold-light">1 Hektar</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider font-accent">Ruang Terbuka Hijau</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 sm:space-y-6">
              <span className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase">
                Selamat Datang
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
                Keindahan Alam & Kemewahan di Jantung Kota Palembang
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Kebon Gede Venue hadir sebagai solusi venue pilihan terbaik di Palembang. Menghadirkan perpaduan harmonis antara pesona alam hijau nan asri dengan kenyamanan fasilitas modern premium.
              </p>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Mulai dari pesta pernikahan sakral bertabur bunga, gathering korporat berskala besar, outbound yang penuh semangat kebersamaan, hingga wisuda penuh rasa bangga — semua kami rancang untuk menciptakan kenangan abadi tak terlupakan.
              </p>
              <div className="pt-2 sm:pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-xl group"
                >
                  <span>Selengkapnya Tentang Kami</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Venue Highlights */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Pilihan Venue Eksklusif"
            subtitle="Our Spaces"
            description="Temukan ruang yang paling sesuai dengan konsep dan kapasitas tamu impian Anda."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {venues.map((venue, idx) => (
              <VenueCard key={venue.id} venue={venue} index={idx} />
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 text-forest font-bold text-sm sm:text-base hover:text-forest-dark transition-colors"
            >
              <span>Jelajahi Semua Detail Venue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Jenis Acara (Event Types) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Apapun Acara Anda, Kami Siap Wujudkan"
            subtitle="Versatile Capabilities"
            description="Kebon Gede dirancang fleksibel untuk beragam aktivitas formal maupun informal."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {eventTypes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1"
                >
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-forest/10 group-hover:bg-gold/20 text-forest group-hover:text-gold transition-colors flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-charcoal mb-1">
                    {item.label}
                  </h3>
                  <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="py-12 sm:py-16 lg:py-20 bg-forest-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StatsCounter />
        </div>
      </section>

      {/* Section 5: Keunggulan (Why Choose Us) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Mengapa Memilih Kebon Gede Venue?"
            subtitle="Why Choose Us"
            description="Standar keunggulan fasilitas, panorama, dan pelayanan ramah khas Palembang."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream/70 border border-gold/15 hover:border-gold/50 transition-all duration-300 hover:shadow-lg flex flex-col group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-forest text-gold flex items-center justify-center mb-4 sm:mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-gold-dark tracking-widest uppercase mb-1">
                    Keunggulan 0{idx + 1}
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal mb-2 sm:mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6: Galeri Highlights */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Galeri Momen Berharga"
            subtitle="Our Portfolio"
            description="Intip kemeriahan dan pesona visual berbagai perhelatan istimewa di Kebon Gede Venue."
          />

          <GalleryGrid items={featuredGallery} />

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-charcoal hover:bg-forest text-white font-semibold text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>Lihat Semua Foto Galeri</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Cerita Bahagia Klien Kami"
            subtitle="Testimonials"
            description="Pengalaman nyata dari mereka yang telah mempercayakan momen terindahnya di Kebon Gede Venue."
          />

          <TestimonialCarousel />
        </div>
      </section>

      {/* Section 8: CTA Section */}
      <CTASection />

      {/* Section 9: FAQ */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Pertanyaan yang Sering Diajukan"
            subtitle="FAQ"
            description="Jawaban seputar pemesanan, teknis fasilitas, dan kapasitas tempat di Kebon Gede Venue."
          />

          <FAQAccordion items={faqs} />

          <div className="mt-8 sm:mt-12 text-center p-5 sm:p-8 rounded-2xl bg-cream border border-gold/20">
            <p className="text-charcoal font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">Punya pertanyaan lain yang belum terjawab?</p>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Konsultasikan kebutuhan spesifik acara Anda dengan tim customer service kami.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-forest font-bold text-xs sm:text-sm hover:underline"
            >
              <span>Hubungi Tim Kebon Gede Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
