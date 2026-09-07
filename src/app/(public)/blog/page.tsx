import type { Metadata } from "next";
import SectionHeading from "@/components/public/section-heading";
import BlogCard from "@/components/public/blog-card";
import CTASection from "@/components/public/cta-section";
import { blogPosts } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Artikel & Tips Seputar Event",
  description: "Dapatkan tips persiapan pernikahan, panduan memilih venue outdoor di Palembang, serta inspirasi event gathering dari Kebon Gede Venue.",
};

export default function BlogPage() {
  const publishedPosts = blogPosts.filter((p) => p.status === "published");

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Banner */}
      <section className="bg-forest-dark text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-gold-light text-xs sm:text-sm uppercase tracking-widest font-semibold block mb-2 sm:mb-3 font-accent">
            Inspirasi & Tips
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Blog & Artikel Kebon Gede
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Wawasan seputar tren pernikahan terkini, rekomendasi susunan acara outdoor, dan kiat sukses menyelenggarakan gathering yang berkesan.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Artikel Terbaru"
            subtitle="Latest Articles"
            description="Baca tulisan menarik dan panduan informatif dari tim ahli event Kebon Gede Venue."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {publishedPosts.map((post, idx) => (
              <BlogCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
