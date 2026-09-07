import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts as seedPosts } from "@/lib/seed-data";
import { getBlogPostById } from "@/actions/blog";
import AdminEditBlogForm from "./form";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return seedPosts.map((p) => ({ id: p.id }));
}

export default async function AdminEditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const post = (await getBlogPostById(id)) || seedPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-charcoal hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Edit Artikel: {post.title}
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Perbarui naskah artikel, cover blog, status publikasi, dan kategori tags
          </p>
        </div>
      </div>

      <AdminEditBlogForm post={post} />
    </div>
  );
}
