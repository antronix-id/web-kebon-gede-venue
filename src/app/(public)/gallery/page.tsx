import type { Metadata } from "next";
import SectionHeading from "@/components/public/section-heading";
import GalleryGrid from "@/components/public/gallery-grid";
import CTASection from "@/components/public/cta-section";
import { galleryItems as seedGallery } from "@/lib/seed-data";
import { getGalleryItems } from "@/actions/gallery";

export const metadata: Metadata = {
  title: "Galeri Foto",
  description:
    "Dokumentasi visual berbagai event wedding, outbound, graduation, dan meeting di Kebon Gede Venue Palembang.",
};

export default async function GalleryPage() {
  const liveGallery = await getGalleryItems("all");
  const items = liveGallery && liveGallery.length > 0 ? liveGallery : seedGallery;
  return (
    <div className="pt-16 sm:pt-20 pb-0">
      {/* Hero Banner */}
      <section className="bg-primary text-primary-foreground py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-primary-foreground/80 text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2 sm:mb-3 font-sans">
            Dokumentasi Event
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-primary-foreground">
            Galeri Momen Berharga
          </h1>
          <p className="text-primary-foreground/85 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Saksikan keindahan suasana dekorasi, gemerlap pesta malam hari, serta keseruan aktivitas alam terbuka di Kebon Gede Venue Palembang.
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-14 sm:py-20 bg-background">
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
