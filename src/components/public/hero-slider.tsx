"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides as fallbackHeroSlides } from "@/lib/seed-data";
import type { HeroSlide } from "@/types";

interface HeroSliderProps {
  slides?: HeroSlide[];
}

export default function HeroSlider({ slides: propSlides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const activeSlides =
    propSlides && propSlides.length > 0
      ? propSlides.filter((s) => s.is_active)
      : fallbackHeroSlides.filter((s) => s.is_active);

  const slides = activeSlides.length > 0 ? activeSlides : fallbackHeroSlides;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  // Guard if current slide index exceeds length after updates
  const activeSlide = slides[current] || slides[0];

  return (
    <section className="relative h-[100dvh] min-h-[580px] max-h-[960px] w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id || current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={activeSlide.image_url || "/images/18.png"}
            alt={activeSlide.title}
            fill
            className="object-cover object-center"
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto w-full pt-16 sm:pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id || current}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.span
                className="inline-block text-gold font-accent text-xs sm:text-sm md:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                Welcome to
              </motion.span>

              <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight tracking-tight px-1">
                {activeSlide.title}
              </h1>

              {activeSlide.subtitle && (
                <p className="font-accent text-xs sm:text-sm md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 line-clamp-3 sm:line-clamp-none">
                  {activeSlide.subtitle}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto">
                <Link
                  href={activeSlide.cta_link || "/venues"}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-gold hover:bg-gold-light text-white font-semibold rounded-full transition-all duration-300 shadow-xl shadow-gold/30 hover:-translate-y-0.5 text-xs sm:text-sm md:text-base text-center"
                >
                  {activeSlide.cta_text || "Explore Venues"}
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 text-xs sm:text-sm md:text-base text-center"
                >
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/50 sm:bg-white/10 sm:hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/50 sm:bg-white/10 sm:hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 sm:w-10 h-2 sm:h-2.5 bg-gold"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator (Hidden on small mobile to avoid clash) */}
      <motion.div
        className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
