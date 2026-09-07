"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import type { BlogPost } from "@/types";
import { updateBlogPost } from "@/actions/blog";
import { ImageUpload } from "@/components/admin/image-upload";
import { STORAGE_BUCKETS, BLOG_STATUSES } from "@/lib/constants";

interface AdminEditBlogFormProps {
  post: BlogPost;
}

export default function AdminEditBlogForm({ post }: AdminEditBlogFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    cover_image_url: post.cover_image_url,
    author_name: post.author_name,
    status: post.status,
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await updateBlogPost(post.id, {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image_url: formData.cover_image_url,
        author_name: formData.author_name,
        status: formData.status as any,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });

      if (res.success) {
        setIsSaved(true);
        setTimeout(() => {
          router.push("/admin/blog");
        }, 800);
      } else {
        setErrorMessage(res.error || "Gagal memperbarui artikel");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan saat menyimpan artikel");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6"
    >
      {isSaved && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
          Artikel berhasil diperbarui! Mengalihkan ke halaman daftar blog...
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-charcoal border-b border-gray-100 pb-2">
          Detail Naskah Artikel
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Judul Artikel *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Slug URL
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Nama Penulis / Tim
            </label>
            <input
              type="text"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Status Publikasi
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
            >
              {BLOG_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ImageUpload
          label="Foto Cover Artikel"
          value={formData.cover_image_url}
          onChange={(url) => setFormData({ ...formData, cover_image_url: url })}
          bucket={STORAGE_BUCKETS.BLOG_COVERS}
          aspectRatio="wide"
          required
        />

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Ringkasan / Excerpt *
          </label>
          <input
            type="text"
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Isi Lengkap Artikel
          </label>
          <textarea
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Tags (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Wedding, Palembang, Outdoor, Tips"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest text-sm bg-gray-50"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
        <Link
          href="/admin/blog"
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-xs transition-colors"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
