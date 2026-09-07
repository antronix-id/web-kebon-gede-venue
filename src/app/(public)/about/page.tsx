import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, MapPin, Award, Compass, Heart } from "lucide-react";
import StatsCounter from "@/components/public/stats-counter";
import CTASection from "@/components/public/cta-section";
import SectionHeading from "@/components/public/section-heading";
import { getSetting } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Profil lengkap Kebon Gede Venue Palembang. Venue outdoor dan indoor seluas 1 hektar dengan keindahan alam tropis dan fasilitas modern berkelas.",
};

export default function AboutPage() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="bg-forest-dark text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/18.png"
            alt="Kebon Gede Area Senja"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-gold-light text-xs sm:text-sm uppercase tracking-widest font-semibold block mb-2 sm:mb-3 font-accent">
            Profil Venue
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Pesona Alam Asri untuk Momen Spesial Anda
          </h1>
          <p className="text-gray-200 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Mengenal lebih dekat Kebon Gede Venue, destinasi perhelatan terdepan di Palembang yang memadukan kehangatan alam dengan keanggunan arsitektur modern.
          </p>
        </div>
      </section>

      {/* Sejarah & Cerita Kami */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative h-[280px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/20.png"
                  alt="Pintu Gerbang Kebon Gede"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <span className="text-forest text-xs font-bold uppercase tracking-wider">
                Sejarah Singkat
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal leading-tight">
                Dedikasi Menciptakan Ruang Perhelatan Berstandar Tinggi
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Kebon Gede Venue didirikan dengan cita-cita menghadirkan oase hijau di tengah kota Palembang yang dapat dimanfaatkan untuk berbagai hajatan istimewa. Dengan lahan seluas 1 hektar, Kebon Gede bertumbuh menjadi pilihan utama masyarakat yang mendambakan suasana perayaan terbuka yang segar, luas, dan berkelas.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Kami terus berinovasi dalam penyediaan sarana prasarana, mulai dari pengembangan aula semi-outdoor berpendingin udara, perluasan area parkir beraspal, hingga penyediaan spot foto alami berlatar taman anggrek dan pepohonan tropis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Visi & Misi Kami"
            subtitle="Our Commitment"
            description="Landasan dedikasi kami dalam melayani setiap penyelenggara acara dengan sepenuh hati."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Visi */}
            <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-forest text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gold/20 flex items-center justify-center text-gold mb-4 sm:mb-6">
                  <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gold-light mb-3 sm:mb-4">
                  Visi Kami
                </h3>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  Menjadi venue perhelatan outdoor & indoor terkemuka dan paling diminati di Sumatera Selatan yang dikenal atas keasrian lingkungan, fleksibilitas tempat, dan standar pelayanan prima.
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-cream border border-gold/20 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-forest/10 flex items-center justify-center text-forest mb-4 sm:mb-6">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-charcoal mb-3 sm:mb-4">
                  Misi Kami
                </h3>
                <ul className="space-y-2.5 sm:space-y-3.5 text-gray-700 text-xs sm:text-sm md:text-base">
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-forest shrink-0 mt-0.5" />
                    <span>Menyediakan sarana venue serbaguna yang bersih, aman, asri, dan terawat secara berkesinambungan.</span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-forest shrink-0 mt-0.5" />
                    <span>Memberikan pelayanan profesional dan responsif dalam mendampingi klien mewujudkan konsep acaranya.</span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-forest shrink-0 mt-0.5" />
                    <span>Mendukung pelestarian ruang terbuka hijau di wilayah perkotaan Palembang.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 sm:py-20 bg-forest-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Lokasi Kami"
            subtitle="Find Us"
            description="Kunjungi langsung Kebon Gede Venue untuk melihat keindahan lokasi dan berkonsultasi dengan tim kami."
          />

          <div className="bg-white p-3 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-md border border-gray-100 overflow-hidden">
            <div className="relative h-[280px] sm:h-[380px] md:h-[460px] rounded-xl sm:rounded-2xl overflow-hidden">
              <iframe
                title="Google Maps Kebon Gede Venue"
                src="https://maps.google.com/maps?q=Jl.+Sultan+Moh.+Mansyur+No.687,+Palembang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-charcoal">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-forest shrink-0" />
                <span>{getSetting("address")}</span>
              </div>
              <a
                href={getSetting("google_maps_url")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs sm:text-sm font-semibold transition-colors shrink-0"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
