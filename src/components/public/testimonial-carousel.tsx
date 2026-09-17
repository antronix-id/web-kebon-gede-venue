"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials as allTestimonials } from "@/lib/seed-data";

export default function TestimonialCarousel() {
  const testimonials = allTestimonials.filter((t) => t.is_approved);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <Quote className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 text-primary/15" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center px-8"
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < t.rating ? "text-amber-500 fill-amber-500" : "text-border"
                }`}
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
            &ldquo;{t.content}&rdquo;
          </blockquote>

          {/* Author */}
          <div>
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-serif font-bold text-primary">
                {t.client_name.charAt(0)}
              </span>
            </div>
            <p className="font-semibold text-foreground">{t.client_name}</p>
            <p className="text-sm text-muted-foreground">{t.client_title}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-border text-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2.5"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-border text-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
