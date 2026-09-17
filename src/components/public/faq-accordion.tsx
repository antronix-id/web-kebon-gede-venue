"use client";

import type { FAQ } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQAccordionProps {
  items: FAQ[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {items.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="w-full">
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
