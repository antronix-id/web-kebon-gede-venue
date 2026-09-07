"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { loginAdminAction } from "@/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kebongede.com");
  const [password, setPassword] = useState("admin12345");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await loginAdminAction({ email, password });
      if (res.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(res.error || "Gagal masuk. Periksa email dan password Anda.");
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat mencoba masuk.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100 mx-4">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-forest/10 mb-4">
          <Image
            src="/images/logo.png"
            alt="Kebon Gede Logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
        </div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">
          Admin Portal
        </h1>
        <p className="text-gray-500 text-xs mt-1">
          Kebon Gede Venue Content Management System
        </p>
      </div>

      {error && (
        <div className="p-3 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Email Administrator
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest bg-gray-50"
              placeholder="admin@kebongede.com"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Kata Sandi
            </label>
            <span className="text-xs text-forest hover:underline cursor-pointer">
              Lupa sandi?
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest bg-gray-50"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-forest/20"
        >
          {isLoading ? (
            <span>Memproses...</span>
          ) : (
            <>
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
        <p className="font-semibold mb-0.5">Akun Demo CMS:</p>
        <p>Email: admin@kebongede.com</p>
        <p>Password: admin12345</p>
      </div>
    </div>
  );
}
