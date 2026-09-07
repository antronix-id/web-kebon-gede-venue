// ==============================================================================
// KEBON GEDE VENUE - APPLICATION CONSTANTS
// ==============================================================================

export const STORAGE_BUCKETS = {
  VENUE_IMAGES: "venue-images",
  GALLERY: "gallery",
  BLOG_COVERS: "blog-covers",
  EVENT_COVERS: "event-covers",
  TESTIMONIAL_AVATARS: "testimonial-avatars",
  HERO_SLIDES: "hero-slides",
  GENERAL: "general",
} as const;

export const VENUE_TYPES = [
  { value: "indoor", label: "Indoor (Ruang Tertutup)" },
  { value: "outdoor", label: "Outdoor (Terbuka)" },
  { value: "semi_outdoor", label: "Semi Outdoor" },
] as const;

export const GALLERY_CATEGORIES = [
  { value: "wedding", label: "Wedding & Resepsi" },
  { value: "meeting", label: "Meeting & Gathering" },
  { value: "outbound", label: "Outbound & Fun Games" },
  { value: "graduation", label: "Wisuda / Graduation" },
  { value: "corporate", label: "Corporate Event" },
  { value: "other", label: "Lainnya" },
] as const;

export const EVENT_TYPES = [
  { value: "wedding", label: "Wedding & Resepsi" },
  { value: "meeting", label: "Meeting & Seminar" },
  { value: "outbound", label: "Outbound & Fun Games" },
  { value: "graduation", label: "Graduation / Wisuda" },
  { value: "corporate", label: "Corporate Gathering" },
  { value: "other", label: "Lainnya" },
] as const;

export const MESSAGE_STATUSES = [
  { value: "new", label: "Baru", color: "blue" },
  { value: "read", label: "Dibaca", color: "gray" },
  { value: "responded", label: "Dibalas", color: "green" },
  { value: "archived", label: "Diarsipkan", color: "amber" },
] as const;

export const BLOG_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Terbit" },
  { value: "archived", label: "Arsip" },
] as const;

export const DEFAULT_PAGINATION = {
  PAGE_SIZE: 9,
  ADMIN_PAGE_SIZE: 15,
} as const;
