"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      {/* Cover Image */}
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {post.tags && post.tags.length > 0 && (
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
            <span className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-forest/90 text-white rounded-full backdrop-blur-sm shadow-sm">
              {post.tags[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 sm:mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold" />
              {post.author_name}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal mb-1.5 sm:mb-2 group-hover:text-forest transition-colors line-clamp-2">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* CTA */}
        <div className="pt-3 border-t border-gray-100">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-forest font-semibold text-xs sm:text-sm group/btn hover:text-forest-dark transition-colors"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
