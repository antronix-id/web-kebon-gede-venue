import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4 text-center">
      <span className="font-heading text-8xl font-black text-forest mb-2">404</span>
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-3">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-gray-600 text-base max-w-md mb-8">
        Maaf, halaman yang Anda tuju tidak dapat ditemukan atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-sm transition-colors shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
}
