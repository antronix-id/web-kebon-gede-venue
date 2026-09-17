"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-8 sm:mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {subtitle && (
        <span
          className={`inline-block font-sans text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 font-bold ${
            light ? "text-accent" : "text-primary"
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight ${
          light ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-16 sm:w-20 h-1.5 rounded-full ${
          align === "center" ? "mx-auto" : ""
        } bg-gradient-to-r from-primary via-chart-1 to-accent mb-3 sm:mb-4`}
      />
      {description && (
        <p
          className={`max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
