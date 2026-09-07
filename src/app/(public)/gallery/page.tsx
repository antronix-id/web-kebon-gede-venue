import type { Metadata } from "next";
import SectionHeading from "@/components/public/section-heading";
import GalleryGrid from "@/components/public/gallery-grid";
import CTASection from "@/components/public/cta-section";
import { galleryItems as seedGallery } from "@/lib/seed-data";
import { getGalleryItems } from "@/actions/gallery";

export const metadata: Metadata = {
  title: "Galeri Foto",
  description: "Dokumentasi visual berbagai event wedding, outbound, graduation, dan meeting di Kebon Gede Venue Palembang.",
};

export default async function GalleryPage() {
  const liveGallery = await getGalleryItems("all");
  const items = liveGallery && liveGallery.length > 0 ? liveGallery : seedGallery;
  return (
    <div className="pt-24 pb-0">
      {/* Hero Banner */}
      <section className="bg-forest-dark text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-gold-light text-xs sm:text-sm uppercase tracking-widest font-semibold block mb-3 font-accent">
            Dokumentasi Event
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Galeri Momen Berharga
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Saksikan keindahan suasana dekorasi, gemerlap pesta malam hari, serta keseruan aktivitas alam terbuka di Kebon Gede Venue Palembang.
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Koleksi Foto & Aktivitas"
            subtitle="Our Portfolio"
            description="Pilih kategori di bawah untuk menyaring dokumentasi kegiatan berdasarkan tipe acara."
          />

          <GalleryGrid items={items} />
        </div>
      </section>

      <CTASection />
    </div>
  );
}
