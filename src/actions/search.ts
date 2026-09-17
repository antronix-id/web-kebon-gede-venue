"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  venues as seedVenues,
  events as seedEvents,
  blogPosts as seedPosts,
  contactMessages as seedMessages,
  faqs as seedFaqs,
} from "@/lib/seed-data";

import { QUICK_SHORTCUTS, type SearchResultItem } from "@/lib/admin-search-data";


export async function searchAdminAction(query: string): Promise<SearchResultItem[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  // 1. Search CMS Menus & Shortcuts
  const matchedMenus = QUICK_SHORTCUTS.filter(
    (m) => m.title.toLowerCase().includes(q) || m.subtitle.toLowerCase().includes(q)
  );
  results.push(...matchedMenus.slice(0, 3));

  // 2. Search Database (if Supabase configured)
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();

      const [venuesRes, eventsRes, blogRes, msgRes, faqRes] = await Promise.all([
        supabase.from("venues").select("id, name, venue_type").ilike("name", `%${q}%`).limit(3),
        supabase.from("events").select("id, title, event_type").ilike("title", `%${q}%`).limit(3),
        supabase.from("blog_posts").select("id, title, status").ilike("title", `%${q}%`).limit(3),
        supabase.from("contact_messages").select("id, name, event_type").or(`name.ilike.%${q}%,message.ilike.%${q}%`).limit(3),
        supabase.from("faqs").select("id, question, category").ilike("question", `%${q}%`).limit(3),
      ]);

      if (venuesRes.data) {
        venuesRes.data.forEach((v) => {
          results.push({
            id: `venue-${v.id}`,
            title: v.name,
            subtitle: `Venue • ${v.venue_type}`,
            category: "venue",
            href: `/admin/venues/${v.id}/edit`,
          });
        });
      }

      if (eventsRes.data) {
        eventsRes.data.forEach((e) => {
          results.push({
            id: `event-${e.id}`,
            title: e.title,
            subtitle: `Event • Kategori ${e.event_type}`,
            category: "event",
            href: `/admin/events/${e.id}/edit`,
          });
        });
      }

      if (blogRes.data) {
        blogRes.data.forEach((b) => {
          results.push({
            id: `blog-${b.id}`,
            title: b.title,
            subtitle: `Artikel • Status: ${b.status}`,
            category: "blog",
            href: `/admin/blog/${b.id}/edit`,
          });
        });
      }

      if (msgRes.data) {
        msgRes.data.forEach((m) => {
          results.push({
            id: `msg-${m.id}`,
            title: `Pesan: ${m.name}`,
            subtitle: `Inquiry • ${m.event_type || "Event"}`,
            category: "message",
            href: `/admin/messages`,
          });
        });
      }

      if (faqRes.data) {
        faqRes.data.forEach((f) => {
          results.push({
            id: `faq-${f.id}`,
            title: f.question,
            subtitle: `FAQ • ${f.category}`,
            category: "faq",
            href: `/admin/faq`,
          });
        });
      }

      return results;
    } catch (err) {
      console.error("Supabase admin search error:", err);
    }
  }

  // Fallback to local seed data
  seedVenues
    .filter((v) => v.name.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((v) => {
      results.push({
        id: `venue-${v.id}`,
        title: v.name,
        subtitle: `Venue • ${v.venue_type}`,
        category: "venue",
        href: `/admin/venues/${v.id}/edit`,
      });
    });

  seedEvents
    .filter((e) => e.title.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((e) => {
      results.push({
        id: `event-${e.id}`,
        title: e.title,
        subtitle: `Event • Kategori ${e.event_type}`,
        category: "event",
        href: `/admin/events/${e.id}/edit`,
      });
    });

  seedPosts
    .filter((p) => p.title.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((p) => {
      results.push({
        id: `blog-${p.id}`,
        title: p.title,
        subtitle: `Artikel • Status: ${p.status}`,
        category: "blog",
        href: `/admin/blog/${p.id}/edit`,
      });
    });

  seedMessages
    .filter((m) => m.name.toLowerCase().includes(q) || m.message.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((m) => {
      results.push({
        id: `msg-${m.id}`,
        title: `Pesan: ${m.name}`,
        subtitle: `Inquiry • ${m.event_type || "Event"}`,
        category: "message",
        href: `/admin/messages`,
      });
    });

  seedFaqs
    .filter((f) => f.question.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((f) => {
      results.push({
        id: `faq-${f.id}`,
        title: f.question,
        subtitle: `FAQ • ${f.category}`,
        category: "faq",
        href: `/admin/faq`,
      });
    });

  return results;
}
