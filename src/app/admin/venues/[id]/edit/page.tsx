import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { venues } from "@/lib/seed-data";
import AdminEditVenueForm from "./form";

interface EditVenuePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return venues.map((v) => ({ id: v.id }));
}

export default async function AdminEditVenuePage({ params }: EditVenuePageProps) {
  const { id } = await params;
  const venue = venues.find((v) => v.id === id);

  if (!venue) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/venues"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-charcoal hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Edit Venue: {venue.name}
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Perbarui informasi kapasitas, fasilitas, dan deskripsi venue
          </p>
        </div>
      </div>

      <AdminEditVenueForm venue={venue} />
    </div>
  );
}
