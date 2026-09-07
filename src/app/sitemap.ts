import type { MetadataRoute } from "next";
import { venues as seedVenues, events as seedEvents, blogPosts as seedPosts } from "@/lib/seed-data";
import { getVenues } from "@/actions/venues";
import { getEvents } from "@/actions/events";
import { getBlogPosts } from "@/actions/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kebongede.com";
  const now = new Date();

  // 1. Static Public Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/venues`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Dynamic Venues
  let activeVenues = seedVenues;
  try {
    const liveVenues = await getVenues(true);
    if (liveVenues && liveVenues.length > 0) activeVenues = liveVenues;
  } catch {
    // fallback to seed
  }

  const venueUrls: MetadataRoute.Sitemap = activeVenues.map((v) => ({
    url: `${baseUrl}/venues/${v.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Dynamic Events
  let activeEvents = seedEvents;
  try {
    const liveEvents = await getEvents(true);
    if (liveEvents && liveEvents.length > 0) activeEvents = liveEvents;
  } catch {
    // fallback to seed
  }

  const eventUrls: MetadataRoute.Sitemap = activeEvents.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(e.event_date || now),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // 4. Dynamic Blog Posts
  let activePosts = seedPosts;
  try {
    const livePosts = await getBlogPosts("published");
    if (livePosts && livePosts.length > 0) activePosts = livePosts;
  } catch {
    // fallback to seed
  }

  const blogUrls: MetadataRoute.Sitemap = activePosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.published_at || now),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...venueUrls, ...eventUrls, ...blogUrls];
}
