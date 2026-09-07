import React from "react";
import type { Venue, EventItem, BlogPost, FAQ } from "@/types";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://kebongede.com/#business",
    name: "Kebon Gede Venue",
    image: "https://kebongede.com/images/logo.png",
    url: "https://kebongede.com",
    telephone: "+6281234567890",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Sultan Moh. Mansyur No.687",
      addressLocality: "Palembang",
      postalCode: "30134",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -3.0039,
      longitude: 104.7352,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    sameAs: [
      "https://instagram.com/kebongede_venue",
      "https://facebook.com/kebongedevenue",
      "https://tiktok.com/@kebongedevenue",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQJsonLd({ items }: { items: FAQ[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EventJsonLd({ event, venue }: { event: EventItem; venue?: Venue }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.event_date,
    endDate: event.event_date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: venue?.name || "Kebon Gede Venue",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Sultan Moh. Mansyur No.687",
        addressLocality: "Palembang",
        postalCode: "30134",
        addressCountry: "ID",
      },
    },
    image: event.cover_image_url ? [`https://kebongede.com${event.cover_image_url}`] : [],
    organizer: {
      "@type": "Organization",
      name: "Kebon Gede Venue",
      url: "https://kebongede.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostJsonLd({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Person",
      name: post.author_name || "Admin Kebon Gede",
    },
    publisher: {
      "@type": "Organization",
      name: "Kebon Gede Venue",
      logo: {
        "@type": "ImageObject",
        url: "https://kebongede.com/images/logo.png",
      },
    },
    image: post.cover_image_url ? [`https://kebongede.com${post.cover_image_url}`] : [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
