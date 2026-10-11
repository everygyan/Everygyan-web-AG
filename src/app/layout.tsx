import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getNavigationMenus } from "@/lib/supabase/api";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EveryGyan | Travel Chronicles, Cultural Expeditions & Field Knowledge",
  description:
    "An independent publication dedicated to high-altitude mountaineering, slow cultural journeys, visual journalism, and practical frameworks for the curious explorer.",
  icons: {
    icon: "/everygyan-logo.svg",
    apple: "/everygyan-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = await getNavigationMenus();

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/everygyan-logo.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider>
          <Header menus={menus} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
