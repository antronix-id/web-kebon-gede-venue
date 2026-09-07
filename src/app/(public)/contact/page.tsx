import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/public/contact-form";
import SectionHeading from "@/components/public/section-heading";
import { getSetting } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Hubungi & Reservasi",
  description: "Formulir reservasi dan inquiry Kebon Gede Venue Palembang. Konsultasikan acara pernikahan, outbound, atau pertemuan Anda dengan kami.",
};

export default function ContactPage() {
  const whatsappNumber = getSetting("whatsapp") || "+6281234567890";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Halo%20Kebon%20Gede%20Venue,%20saya%20ingin%20konsultasi%20mengenai%20acara%20saya.`;

  return (
    <div className="pt-16 sm:pt-20 pb-14 sm:pb-20 bg-cream min-h-screen">
      {/* Hero Banner */}
      <section className="bg-forest-dark text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-gold-light text-xs sm:text-sm uppercase tracking-widest font-semibold block mb-2 sm:mb-3 font-accent">
            Inquiry & Reservasi
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Hubungi Kebon Gede Venue
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Rencanakan momen berharga Anda bersama kami. Kirim pesan atau hubungi representatif kami untuk mendapatkan penawaran paket venue terbaik.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal mb-2">
              Formulir Reservasi Acara
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8">
              Isi data di bawah ini dan konsultan kami akan segera menghubungi Anda untuk mendiskusikan tanggal dan ketersediaan venue.
            </p>
            <ContactForm />
          </div>

          {/* Right: Contact Information */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal mb-4">
                Informasi Kontak
              </h2>

              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5 sm:mb-1">Alamat</h4>
                    <p className="text-xs sm:text-sm font-medium text-charcoal leading-relaxed">{getSetting("address")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5 sm:mb-1">Telepon</h4>
                    <p className="text-xs sm:text-sm font-medium text-charcoal">{getSetting("phone")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5 sm:mb-1">Email</h4>
                    <p className="text-xs sm:text-sm font-medium text-charcoal">{getSetting("email")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5 sm:mb-1">Jam Operasional</h4>
                    <p className="text-xs sm:text-sm font-medium text-charcoal">Senin - Minggu: 08:00 - 22:00 WIB</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct card */}
              <div className="pt-4 sm:pt-6 border-t border-gray-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-md text-xs sm:text-sm min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Respon Cepat via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Mini Map */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-48 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden">
                <iframe
                  title="Google Maps Location"
                  src="https://maps.google.com/maps?q=Jl.+Sultan+Moh.+Mansyur+No.687,+Palembang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
