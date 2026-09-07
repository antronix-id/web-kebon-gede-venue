import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { events as seedEvents, venues } from "@/lib/seed-data";
import { getEventById } from "@/actions/events";
import { getVenues } from "@/actions/venues";
import AdminEditEventForm from "./form";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return seedEvents.map((e) => ({ id: e.id }));
}

export default async function AdminEditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = (await getEventById(id)) || seedEvents.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const liveVenues = await getVenues(false);
  const venuesList = liveVenues.length > 0 ? liveVenues : venues;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/events"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-charcoal hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Edit Event: {event.title}
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Perbarui data perhelatan acara, dokumentasi cover, dan detail cerita
          </p>
        </div>
      </div>

      <AdminEditEventForm event={event} venues={venuesList} />
    </div>
  );
}
