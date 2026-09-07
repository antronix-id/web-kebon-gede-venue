"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react";
import StatusBadge from "@/components/admin/status-badge";
import { blogPosts as fallbackPosts } from "@/lib/seed-data";
import { getBlogPosts, deleteBlogPost } from "@/actions/blog";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export default function AdminBlogPage() {
  const [postsList, setPostsList] = useState<BlogPost[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getBlogPosts();
        if (data && data.length > 0) {
          setPostsList(data);
        }
      } catch (err) {
        console.error("Error loading blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) return;

    try {
      const res = await deleteBlogPost(id);
      if (res.success) {
        setPostsList((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(res.error || "Gagal menghapus artikel");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus artikel");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Artikel & Tips Blog
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Daftar artikel inspirasi, panduan wedding, dan kabar terbaru Kebon Gede
          </p>
        </div>

        <Link
          href="/admin/blog/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Artikel & Cover</th>
                <th className="px-6 py-4">Penulis</th>
                <th className="px-6 py-4">Tanggal Terbit</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-forest" />
                    <span className="text-xs">Memuat daftar artikel blog...</span>
                  </td>
                </tr>
              ) : postsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-xs">
                    Belum ada artikel. Silakan tulis artikel baru.
                  </td>
                </tr>
              ) : (
                postsList.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-xs truncate">
                          <p className="font-semibold text-charcoal truncate">{post.title}</p>
                          <p className="text-xs text-gray-400 truncate">/{post.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-gray-700">
                      {post.author_name}
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-600">
                      {formatDate(post.published_at)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {post.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={post.status} />
                    </td>

                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-2 rounded-lg text-gray-500 hover:text-forest hover:bg-forest/10 inline-block transition-colors"
                        title="Edit Artikel"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 inline-block transition-colors"
                        title="Hapus Artikel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
