import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import DownloadPopup from "@/components/ui/download-popup";
import { Providers } from "@/lib/providers";
import OurPartners from "./(home)/_components/our-partners";

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "مركز الأداء المتوازن للتدريب",
  description:
    "مركز الأداء المتوازن للتدريب هو شريكك الاستراتيجي في تطوير المهارات وتعزيز الأداء.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoKufiArabic.variable}`}>
      <body className={`antialiased`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
          <OurPartners />
          <Footer />
          <WhatsAppButton />
          <DownloadPopup />
        </Providers>
      </body>
    </html>
  );
}
