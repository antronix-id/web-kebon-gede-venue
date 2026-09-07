"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { submitContactMessage } from "@/actions/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional(),
  event_type: z.string().min(1, "Pilih jenis acara"),
  venue_preference: z.string().optional(),
  preferred_date: z.string().optional(),
  estimated_guests: z.coerce.number().min(0).optional(),
  message: z.string().min(5, "Pesan minimal 5 karakter"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const venueSlug = params.get("venue");
      if (venueSlug) {
        if (venueSlug.includes("teratai")) setValue("venue_preference", "Venue Teratai");
        else if (venueSlug.includes("anggrek")) setValue("venue_preference", "Venue Anggrek");
        else if (venueSlug.includes("kana")) setValue("venue_preference", "Venue Kana");
      }
    }
  }, [setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    setServerError("");
    try {
      const res = await submitContactMessage(data as any);
      if (res.success) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        setServerError(res.error || "Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (err: any) {
      setServerError(err?.message || "Terjadi kendala saat mengirim pesan.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-charcoal mb-2">Pesan Terkirim!</h3>
        <p className="text-gray-600">Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-xs sm:text-sm font-semibold text-charcoal mb-1.5">Nama Lengkap *</label>
        <input id="contact-name" {...register("name")} className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white" placeholder="Nama Anda" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-xs sm:text-sm font-semibold text-charcoal mb-1.5">Email *</label>
          <input id="contact-email" type="email" {...register("email")} className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white" placeholder="email@anda.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-xs sm:text-sm font-semibold text-charcoal mb-1.5">No. WhatsApp</label>
          <input id="contact-phone" {...register("phone")} className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white" placeholder="08xx-xxxx-xxxx" />
        </div>
      </div>

      {/* Event Type & Venue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        <div>
          <label htmlFor="contact-event-type" className="block text-xs sm:text-sm font-semibold text-charcoal mb-1.5">Jenis Acara *</label>
          <select id="contact-event-type" {...register("event_type")} className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white">
            <option value="">Pilih Jenis Acara</option>
            <option value="wedding">Wedding (Pernikahan)</option>
            <option value="meeting">Meeting / Seminar</option>
            <option value="outbound">Outbound / Team Building</option>
            <option value="graduation">Graduation (Wisuda)</option>
            <option value="corporate">Corporate Event</option>
            <option value="other">Lainnya</option>
          </select>
          {errors.event_type && <p className="text-red-500 text-xs mt-1">{errors.event_type.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-venue" className="block text-xs sm:text-sm font-semibold text-charcoal mb-1.5">Venue yang Diinginkan</label>
          <select id="contact-venue" {...register("venue_preference")} className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white">
            <option value="">Pilih Venue</option>
            <option value="Venue Teratai">Venue Teratai</option>
            <option value="Venue Anggrek">Venue Anggrek</option>
            <option value="Venue Kana">Venue Kana</option>
            <option value="Belum Tahu">Belum Tahu</option>
          </select>
        </div>
      </div>

      {/* Date & Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        <div>
          <label htmlFor="contact-date" className="block text-xs sm:text-sm font-semibold text-charcoal mb-1.5">Perkiraan Tanggal</label>
          <input id="contact-date" type="date" {...register("preferred_date")} className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white" />
        </div>
        <div>
          <label htmlFor="contact-guests" className="block text-xs sm:text-sm font-semibold text-charcoal mb-1.5">Estimasi Jumlah Tamu</label>
          <input id="contact-guests" type="number" {...register("estimated_guests")} className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white" placeholder="Contoh: 500" min={0} />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs sm:text-sm font-semibold text-charcoal mb-1.5">Pesan / Keterangan *</label>
        <textarea id="contact-message" {...register("message")} rows={4} className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white resize-none" placeholder="Ceritakan kebutuhan acara Anda..." />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 bg-forest hover:bg-forest-dark text-white font-semibold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-md shadow-forest/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}
