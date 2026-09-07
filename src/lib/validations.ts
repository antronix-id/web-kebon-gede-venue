import { z } from "zod";

// 1. Contact Form & Inquiry Validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional().or(z.literal("")),
  event_type: z.string().min(1, "Pilih jenis acara"),
  preferred_date: z.string().optional().or(z.literal("")),
  venue_preference: z.string().optional().or(z.literal("")),
  estimated_guests: z.coerce.number().min(0).optional().default(0),
  message: z.string().min(5, "Pesan minimal 5 karakter"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// 2. Admin Login Validation
export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// 3. Venue Validation
export const venueSchema = z.object({
  name: z.string().min(2, "Nama venue wajib diisi"),
  slug: z.string().min(2, "Slug wajib diisi"),
  short_description: z.string().optional().default(""),
  full_description: z.string().optional().default(""),
  venue_type: z.enum(["indoor", "outdoor", "semi_outdoor"]),
  capacity_min: z.coerce.number().min(0, "Kapasitas min harus >= 0"),
  capacity_max: z.coerce.number().min(0, "Kapasitas max harus >= 0"),
  facilities: z.array(z.string()).default([]),
  hero_image_url: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
  display_order: z.coerce.number().default(0),
});

export type VenueInput = z.infer<typeof venueSchema>;

// 4. Gallery Item Validation
export const galleryItemSchema = z.object({
  image_url: z.string().min(1, "URL gambar wajib ada"),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.enum(["wedding", "meeting", "outbound", "graduation", "corporate", "other"]),
  venue_id: z.string().optional().nullable(),
  is_featured: z.boolean().default(false),
  display_order: z.coerce.number().default(0),
});

export type GalleryItemInput = z.infer<typeof galleryItemSchema>;

// 5. Event Validation
export const eventSchema = z.object({
  title: z.string().min(2, "Judul event wajib diisi"),
  slug: z.string().min(2, "Slug wajib diisi"),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  cover_image_url: z.string().optional().nullable(),
  event_date: z.string().optional().nullable(),
  event_type: z.enum(["wedding", "meeting", "outbound", "graduation", "corporate", "other"]),
  venue_id: z.string().optional().nullable(),
  is_published: z.boolean().default(true),
});

export type EventInput = z.infer<typeof eventSchema>;

// 6. Blog Post Validation
export const blogPostSchema = z.object({
  title: z.string().min(3, "Judul artikel minimal 3 karakter"),
  slug: z.string().min(2, "Slug wajib diisi"),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(10, "Konten artikel minimal 10 karakter"),
  cover_image_url: z.string().optional().nullable(),
  author_name: z.string().optional().default("Admin Kebon Gede"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  tags: z.array(z.string()).default([]),
  published_at: z.string().optional().nullable(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

// 7. Testimonial Validation
export const testimonialSchema = z.object({
  client_name: z.string().min(2, "Nama klien wajib diisi"),
  client_title: z.string().optional().nullable(),
  content: z.string().min(5, "Ulasan minimal 5 karakter"),
  rating: z.coerce.number().min(1).max(5).default(5),
  avatar_url: z.string().optional().nullable(),
  event_type: z.string().optional().nullable(),
  is_featured: z.boolean().default(false),
  is_approved: z.boolean().default(false),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

// 8. FAQ Validation
export const faqSchema = z.object({
  question: z.string().min(3, "Pertanyaan minimal 3 karakter"),
  answer: z.string().min(5, "Jawaban minimal 5 karakter"),
  category: z.string().default("general"),
  display_order: z.coerce.number().default(0),
  is_active: z.boolean().default(true),
});

export type FAQInput = z.infer<typeof faqSchema>;

// 9. Hero Slide Validation
export const heroSlideSchema = z.object({
  image_url: z.string().min(1, "URL foto wajib diisi"),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  cta_text: z.string().optional().nullable(),
  cta_link: z.string().optional().nullable(),
  display_order: z.coerce.number().default(0),
  is_active: z.boolean().default(true),
});

export type HeroSlideInput = z.infer<typeof heroSlideSchema>;

// 10. Site Settings Validation
export const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string().nullable(),
  type: z.enum(["text", "number", "boolean", "json", "image"]).default("text"),
  group_name: z.string().default("general"),
});

export type SiteSettingInput = z.infer<typeof siteSettingSchema>;
