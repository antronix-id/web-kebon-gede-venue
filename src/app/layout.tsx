import type { Metadata } from "next";
import { Montserrat, Merriweather, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html
      lang="id"
      suppressHydrationWarning
      className={`${montserrat.variable} ${merriweather.variable} ${sourceCodePro.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
