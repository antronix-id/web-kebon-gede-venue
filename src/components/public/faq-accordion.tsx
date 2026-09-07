"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "@/types";

interface FAQAccordionProps {
  items: FAQ[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((faq) => (
        <div
          key={faq.id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="font-semibold text-charcoal pr-4">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-forest shrink-0 transition-transform duration-300 ${
                openId === faq.id ? "rotate-180" : ""
              }`}
            />
          </button>
          <motion.div
            initial={false}
            animate={{
              height: openId === faq.id ? "auto" : 0,
              opacity: openId === faq.id ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
