import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const INDONESIAN_MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const INDONESIAN_MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

export function formatDate(dateString: string): string {
  const parts = dateString.split("T")[0].split("-");
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${day} ${INDONESIAN_MONTHS[monthIndex]} ${year}`;
    }
  }
  const date = new Date(dateString);
  return `${date.getDate()} ${INDONESIAN_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateShort(dateString: string): string {
  const parts = dateString.split("T")[0].split("-");
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${day} ${INDONESIAN_MONTHS_SHORT[monthIndex]} ${year}`;
    }
  }
  const date = new Date(dateString);
  return `${date.getDate()} ${INDONESIAN_MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatNumber(num: number): string {
  if (isNaN(num)) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function getVenueTypeBadge(type: string): { label: string; color: string } {
  switch (type) {
    case "indoor":
      return { label: "Indoor", color: "bg-blue-100 text-blue-800" };
    case "outdoor":
      return { label: "Full Outdoor", color: "bg-green-100 text-green-800" };
    case "semi_outdoor":
      return { label: "Semi Outdoor", color: "bg-amber-100 text-amber-800" };
    default:
      return { label: type, color: "bg-gray-100 text-gray-800" };
  }
}

export function getStatusBadge(status: string): { label: string; color: string } {
  switch (status) {
    case "new":
      return { label: "Baru", color: "bg-blue-100 text-blue-800" };
    case "read":
      return { label: "Dibaca", color: "bg-yellow-100 text-yellow-800" };
    case "responded":
      return { label: "Direspon", color: "bg-green-100 text-green-800" };
    case "archived":
      return { label: "Diarsipkan", color: "bg-gray-100 text-gray-800" };
    case "draft":
      return { label: "Draft", color: "bg-gray-100 text-gray-800" };
    case "published":
      return { label: "Published", color: "bg-green-100 text-green-800" };
    default:
      return { label: status, color: "bg-gray-100 text-gray-800" };
  }
}

export function getEventTypeBadge(type: string): string {
  switch (type.toLowerCase()) {
    case "wedding":
      return "bg-rose-100 text-rose-800 border-rose-200";
    case "meeting":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "outbound":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "graduation":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "corporate":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}
