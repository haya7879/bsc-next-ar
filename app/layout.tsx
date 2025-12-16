import type { Metadata } from "next";
import { Poppins, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import DownloadPopup from "@/components/ui/download-popup";
import { Providers } from "@/lib/providers";
import OurPartners from "./(home)/_components/our-partners";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "مركز Balanced Score للتدريب",
  description: "مركز Balanced Score للتدريب هو شريكك الاستراتيجي في تطوير المهارات وتعزيز الأداء.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${poppins.variable} ${notoKufiArabic.variable}`}>
      <body className={`antialiased`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
          <OurPartners/>
          <Footer />
          <WhatsAppButton />
          <DownloadPopup />
        </Providers>
      </body>
    </html>
  );
}
