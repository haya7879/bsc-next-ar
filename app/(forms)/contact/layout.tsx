import { Metadata } from "next";
import { getSeoData } from "@/services/seo/seo-services";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('contact');
    if (seoData && seoData.seo) {
      const seo = seoData.seo;

      return {
        title: seo.meta_title,
        description: seo.meta_description,
        keywords: seo.meta_keywords,
        robots: {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
        openGraph: {
          title: seo.meta_title,
          description: seo.meta_description,
          images: [
            {
              url: seo.meta_image,
              width: 1200,
              height: 630,
              alt: seo.meta_title,
            },
          ],
          type: 'website',
          url: seo.canonical,
        },
        twitter: {
          card: 'summary_large_image',
          title: seo.meta_title,
          description: seo.meta_description,
          images: [seo.meta_image],
        },
        alternates: {
          canonical: seo.canonical,
        },
      };
    }
    
    // Fallback metadata if SEO data is not available
    return {
      title: "اتصل بنا | مركز الأداء المتوازن للتدريب",
      description: "تواصل مع مركز الأداء المتوازن للتدريب للاستفسارات والدعم.",
      keywords: "اتصال, دعم, استفسار",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return {
      title: "اتصل بنا | مركز الأداء المتوازن للتدريب",
      description: "تواصل مع مركز الأداء المتوازن للتدريب للاستفسارات والدعم.",
      keywords: "اتصال, دعم, استفسار",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

