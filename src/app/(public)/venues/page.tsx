import type { Metadata } from "next";
import SectionHeading from "@/components/public/section-heading";
import VenueCard from "@/components/public/venue-card";
import CTASection from "@/components/public/cta-section";
import { venues as seedVenues } from "@/lib/seed-data";
import { getVenues } from "@/actions/venues";

export const metadata: Metadata = {
  title: "Pilihan Venue",
  description: "Jelajahi pilihan venue indoor, outdoor, dan semi-outdoor di Kebon Gede Venue Palembang. Kapasitas hingga 2.000+ tamu.",
};

export default async function VenuesPage() {
  const liveVenues = await getVenues(true);
  const venuesList = liveVenues && liveVenues.length > 0 ? liveVenues : seedVenues;
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Banner */}
      <section className="bg-forest-dark text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-gold-light text-xs sm:text-sm uppercase tracking-widest font-semibold block mb-2 sm:mb-3 font-accent">
            Temukan Ruang Terbaik
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Pilihan Venue Kebon Gede
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Dari suasana taman tropis asri hingga ballroom semi-outdoor berkapasitas ribuan tamu, kami memiliki ruang ideal untuk setiap momen berharga Anda.
          </p>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Daftar Venue Kami"
            subtitle="Explore Venues"
            description="Setiap venue dilengkapi sarana pendukung berstandar tinggi untuk kelancaran acara Anda."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {venuesList.map((venue, idx) => (
              <VenueCard key={venue.id} venue={venue} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <CTASection />
    </div>
  );
}
