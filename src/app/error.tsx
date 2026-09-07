"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4 text-center">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-3">
        Terjadi Kesalahan Sistem
      </h1>
      <p className="text-gray-600 text-base max-w-md mb-8">
        Mohon maaf atas ketidaknyamanannya. Silakan coba muat ulang halaman ini.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-sm transition-colors shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Muat Ulang</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
