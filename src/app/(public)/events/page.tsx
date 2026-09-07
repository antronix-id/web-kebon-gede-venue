import type { Metadata } from "next";
import SectionHeading from "@/components/public/section-heading";
import EventCard from "@/components/public/event-card";
import CTASection from "@/components/public/cta-section";
import { events as seedEvents } from "@/lib/seed-data";
import { getEvents } from "@/actions/events";

export const metadata: Metadata = {
  title: "Agenda & Portofolio Event",
  description: "Daftar perhelatan wedding, gathering, seminar, dan festival yang diselenggarakan di Kebon Gede Venue.",
};

export default async function EventsPage() {
  const liveEvents = await getEvents(true);
  const eventsList = liveEvents && liveEvents.length > 0 ? liveEvents : seedEvents;
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Banner */}
      <section className="bg-forest-dark text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-gold-light text-xs sm:text-sm uppercase tracking-widest font-semibold block mb-2 sm:mb-3 font-accent">
            Agenda & Perhelatan
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Event di Kebon Gede Venue
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Temukan inspirasi konsep acara dari ragam perhelatan bergengsi yang sukses kami selenggarakan bersama para klien istimewa kami.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Daftar Acara Terselenggara"
            subtitle="Recent Events"
            description="Mulai dari wedding megah beradat Palembang hingga outbound korporat berskala ratusan peserta."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {eventsList.map((evt, idx) => (
              <EventCard key={evt.id} event={evt} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
