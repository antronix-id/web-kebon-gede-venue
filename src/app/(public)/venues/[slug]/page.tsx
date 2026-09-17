import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Users, CheckCircle2, MapPin, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { getVenueBySlug as getSeedVenueBySlug, venues, events } from "@/lib/seed-data";
import { getVenueBySlug as getLiveVenueBySlug } from "@/actions/venues";
import { getVenueTypeBadge, formatNumber } from "@/lib/utils";
import EventCard from "@/components/public/event-card";

interface VenueDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: VenueDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = (await getLiveVenueBySlug(slug)) || getSeedVenueBySlug(slug);
  if (!venue) return { title: "Venue Tidak Ditemukan" };
  return {
    title: `${venue.name} - Venue di Kebon Gede Palembang`,
    description: venue.short_description || venue.full_description?.slice(0, 160),
    openGraph: {
      title: `${venue.name} | Kebon Gede Venue`,
      description: venue.short_description,
      images: venue.hero_image_url ? [venue.hero_image_url] : [],
    },
  };
}

export default async function VenueDetailPage({ params }: VenueDetailPageProps) {
  const { slug } = await params;
  const venue = (await getLiveVenueBySlug(slug)) || getSeedVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  const relatedEvents = events.filter((e) => e.venue_id === venue.id);

  return (
    <div className="pt-20 sm:pt-24 pb-14 sm:pb-20 bg-background text-foreground min-h-screen">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/venues"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Venue</span>
        </Link>
      </div>

      {/* Hero Banner with Venue Images */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="relative h-[300px] sm:h-[420px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-border">
          <Image
            src={venue.hero_image_url}
            alt={venue.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 text-white">
            <div className="mb-2 sm:mb-3">
              <span
                className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                  getVenueTypeBadge(venue.venue_type).color
                }`}
              >
                {getVenueTypeBadge(venue.venue_type).label}
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 leading-tight text-white">
              {venue.name}
            </h1>
            <p className="text-white/85 text-xs sm:text-sm md:text-base max-w-2xl line-clamp-2 sm:line-clamp-none">
              {venue.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Details & Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-10">
            {/* Description */}
            <div className="bg-card text-card-foreground p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-border">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-card-foreground mb-3 sm:mb-4">
                Tentang {venue.name}
              </h2>
              <div className="text-muted-foreground text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4">
                <p>{venue.full_description}</p>
                <p>
                  Kebon Gede Venue memberikan fleksibilitas penuh dalam penataan panggung, meja kursi jamuan, hingga dekorasi bertema modern ataupun adat tradisional.
                </p>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-card text-card-foreground p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-border">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-card-foreground mb-4 sm:mb-6">
                Fasilitas Unggulan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {venue.facilities.map((fac) => (
                  <div
                    key={fac}
                    className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-secondary/40 border border-border/80"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-card-foreground">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Images */}
            {venue.images && venue.images.length > 0 && (
              <div className="bg-card text-card-foreground p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-border">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-card-foreground mb-4 sm:mb-6">
                  Foto-Foto {venue.name}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {venue.images.map((imgUrl, i) => (
                    <div key={i} className="relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-sm group border border-border/60">
                      <Image
                        src={imgUrl}
                        alt={`${venue.name} - Foto ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                  Acara yang Pernah Diadakan di {venue.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {relatedEvents.map((event, idx) => (
                    <EventCard key={event.id} event={event} index={idx} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Inquiry Card */}
          <div className="space-y-6">
            <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md border border-border lg:sticky lg:top-28">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-card-foreground mb-4">
                Ringkasan Spesifikasi
              </h3>

              <div className="space-y-3.5 sm:space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Kapasitas Tamu
                  </span>
                  <span className="font-semibold text-card-foreground">
                    {formatNumber(venue.capacity_min)} - {formatNumber(venue.capacity_max)} Orang
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Tipe Area
                  </span>
                  <span className="font-semibold text-card-foreground capitalize">
                    {venue.venue_type.replace("_", " ")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Ketersediaan
                  </span>
                  <span className="font-semibold text-primary">
                    Buka untuk Reservasi
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/contact?venue=${venue.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors text-center text-sm shadow-md shadow-primary/20 min-h-[48px]"
                >
                  <span>Inquiry Booking Venue Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Kebon%20Gede%20Venue,%20saya%20tertarik%20dengan%20${encodeURIComponent(
                    venue.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-card-foreground font-semibold hover:bg-accent/20 transition-colors text-center text-xs sm:text-sm min-h-[44px]"
                >
                  Tanya CS via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
