// ============================================
// TypeScript Types for Kebon Gede Venue
// ============================================

export interface Venue {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  venue_type: "indoor" | "outdoor" | "semi_outdoor";
  capacity_min: number;
  capacity_max: number;
  facilities: string[];
  hero_image_url: string;
  images: string[];
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type GalleryCategory = "wedding" | "meeting" | "outbound" | "graduation" | "corporate" | "other";

export interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  description: string;
  category: GalleryCategory;
  venue_id?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover_image_url: string;
  event_date: string;
  event_type: "wedding" | "meeting" | "outbound" | "graduation" | "corporate" | "other";
  venue_id?: string;
  venue_name?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  author_name: string;
  author_id?: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  content: string;
  rating: number;
  avatar_url?: string;
  event_type: string;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  preferred_date: string;
  venue_preference: string;
  estimated_guests: number;
  message: string;
  status: "new" | "read" | "responded" | "archived";
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface HeroSlide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: "text" | "number" | "boolean" | "json" | "image";
  group_name: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: "super_admin" | "admin" | "editor";
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  venue_preference: string;
  preferred_date: string;
  estimated_guests: number;
  message: string;
}
