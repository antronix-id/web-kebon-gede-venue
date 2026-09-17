import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { blogPosts as seedPosts, getBlogBySlug as getSeedBlogBySlug } from "@/lib/seed-data";
import { getBlogPostBySlug as getLiveBlogPostBySlug } from "@/actions/blog";
import { formatDate } from "@/lib/utils";
import BlogCard from "@/components/public/blog-card";
import { BlogPostJsonLd } from "@/components/shared/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seedPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getLiveBlogPostBySlug(slug)) || getSeedBlogBySlug(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: `${post.title} - Blog Kebon Gede Palembang`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Kebon Gede Venue`,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = (await getLiveBlogPostBySlug(slug)) || getSeedBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = seedPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="pt-20 sm:pt-24 pb-14 sm:pb-20 bg-background text-foreground min-h-screen">
      <BlogPostJsonLd post={post} />
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Semua Artikel</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover Image */}
        <div className="relative h-[240px] sm:h-[380px] md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl mb-6 sm:mb-8 border border-border">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Box */}
        <div className="bg-card text-card-foreground p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-sm border border-border mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              {post.author_name}
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-card-foreground mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-card-foreground/90 font-medium mb-6 sm:mb-8 leading-relaxed border-l-4 border-primary pl-3 sm:pl-4 italic">
            {post.excerpt}
          </p>

          <div className="text-muted-foreground text-sm sm:text-base leading-relaxed space-y-4 sm:space-y-6">
            <p>{post.content}</p>
            <p>
              Dengan lokasi seluas 1 hektar yang mengusung konsep alam terbuka hijau serta fasilitas ballroom modern, Kebon Gede Venue menjadi pilihan tepat untuk menyelenggarakan acara tanpa kompromi kenyamanan.
            </p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-border flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-primary mr-1" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-10 sm:mt-16">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
              Artikel Rekomendasi Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((p, idx) => (
                <BlogCard key={p.id} post={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
