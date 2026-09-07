import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Tag, ArrowLeft, Share2 } from "lucide-react";
import { events, getEventBySlug, venues } from "@/lib/seed-data";
import { formatDate, getEventTypeBadge } from "@/lib/utils";
import EventCard from "@/components/public/event-card";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const venue = venues.find((v) => v.id === event.venue_id);
  const otherEvents = events.filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <div className="pt-20 sm:pt-24 pb-14 sm:pb-20 bg-cream">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Event</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover Image */}
        <div className="relative h-[260px] sm:h-[400px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl mb-6 sm:mb-8">
          <Image
            src={event.cover_image_url}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Header Details */}
        <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${getEventTypeBadge(event.event_type)}`}>
              {event.event_type}
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
              <Calendar className="w-4 h-4 text-gold" />
              {formatDate(event.event_date)}
            </span>
            {venue && (
              <Link
                href={`/venues/${venue.slug}`}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-forest font-medium hover:underline"
              >
                <MapPin className="w-4 h-4 text-gold" />
                {venue.name}
              </Link>
            )}
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4 sm:mb-6 leading-tight">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mb-6 sm:mb-8 leading-relaxed border-l-4 border-gold pl-3 sm:pl-4 italic">
            {event.description}
          </p>

          <div className="prose prose-stone max-w-none text-gray-600 text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 pt-4 border-t border-gray-100">
            <p>{event.content}</p>
            <p>
              Kebon Gede Venue memberikan dukungan penuh dari segi koordinasi tata ruang, pengaturan pencahayaan outdoor, hingga kenyamanan parkir ratusan tamu undangan yang hadir.
            </p>
          </div>
        </div>

        {/* Other Events */}
        {otherEvents.length > 0 && (
          <div className="mt-10 sm:mt-16">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal mb-4 sm:mb-6">
              Event Menarik Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {otherEvents.map((evt, idx) => (
                <EventCard key={evt.id} event={evt} index={idx} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
