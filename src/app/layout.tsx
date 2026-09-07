import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kebongede.com"),
  title: {
    default: "Kebon Gede Venue - Best Venue for Your Event di Palembang",
    template: "%s | Kebon Gede Venue",
  },
  description:
    "Kebon Gede Venue menyediakan venue outdoor & indoor terbaik di Palembang. Wedding, Meeting, Outbound, Graduation. Luas 1 hektar dengan fasilitas lengkap.",
  keywords: [
    "venue palembang",
    "wedding venue",
    "kebon gede",
    "venue outdoor",
    "venue indoor",
    "meeting venue",
    "outbound palembang",
  ],
  openGraph: {
    title: "Kebon Gede Venue - Best Venue for Your Event",
    description:
      "Venue Outdoor & Indoor terbaik di Palembang untuk Wedding, Meeting, Outbound, Graduation.",
    url: "https://kebongede.com",
    siteName: "Kebon Gede Venue",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
