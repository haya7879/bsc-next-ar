import { Metadata } from "next";
import { getCityBySlug } from "@/services/cities/cities-services";

interface CityLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: CityLayoutProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { city } = await getCityBySlug(resolvedParams.slug || "");
    const baseUrl = "";

    if (!city) {
      return {
        title: "المدينة غير موجودة | مركز الأداء المتوازن للتدريب",
        description: "تعذّر العثور على المدينة المطلوبة.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const metaTitle = city.meta_title || city.title;
    const metaDescription = city.meta_description || city.description || "";
    const metaImage = city.image || "";
    const canonical = city.canonical || `${baseUrl}/cities/${resolvedParams.slug}`;

    return {
      title: metaTitle,
      description: metaDescription,
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
        title: metaTitle,
        description: metaDescription,
        images: metaImage ? [
          {
            url: metaImage,
            width: 1200,
            height: 630,
            alt: city.title,
          },
        ] : [],
        type: 'website',
        url: canonical,
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: metaImage ? [metaImage] : [],
      },
      alternates: {
        canonical: canonical,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return {
      title: "المدينة غير موجودة | مركز الأداء المتوازن للتدريب",
      description: "العثور على دورات التدريب في المدن في دول الخليج والمواقع الدولية.",
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
    };
  }
}

export default function CityLayout({ children }: CityLayoutProps) {
  return <>{children}</>;
}

