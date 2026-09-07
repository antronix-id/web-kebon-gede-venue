"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import StatusBadge from "@/components/admin/status-badge";
import { blogPosts as initialBlogPosts } from "@/lib/seed-data";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Kelola Artikel Blog
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Daftar artikel inspirasi, tips, dan wawasan venue Kebon Gede
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

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Artikel & Cover</th>
                <th className="px-6 py-4">Penulis</th>
                <th className="px-6 py-4">Tanggal Publish</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal">{post.title}</p>
                        <p className="text-xs text-gray-400">slug: /{post.slug}</p>
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
                    <div className="flex flex-wrap gap-1">
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

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
