import { Metadata } from "next";
import { getCategoryCityCourses } from "@/services/category-city/category-city-services";

interface CategoryCityLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    category: string;
    citySlug: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: CategoryCityLayoutProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const data = await getCategoryCityCourses(
      resolvedParams.citySlug || "",
      resolvedParams.category || ""
    );
    const baseUrl = "";

    if (!data || !data.seo) {
      return {
        title: `${resolvedParams.category} دورات في ${resolvedParams.citySlug} | مركز الأداء المتوازن للتدريب`,
        description: `العثور على ${resolvedParams.category} دورات في ${resolvedParams.citySlug}.`,
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

    const seo = data.seo;
    const metaTitle = seo.meta_title || `${data.category.title} دورات في ${data.city.title}`;
    const metaDescription = seo.meta_description || seo.description || "";
    const canonical = seo.canonical || `${baseUrl}/courses/${resolvedParams.category}/${resolvedParams.citySlug}`;

    return {
      title: metaTitle,
      description: metaDescription,
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
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'website',
        url: canonical,
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
      },
      alternates: {
        canonical: canonical,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return {
      title: "دورات التدريب | مركز الأداء المتوازن للتدريب",
      description: "استكشف دورات التدريب بالتصنيف والمدينة.",
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

export default function CategoryCityLayout({ children }: CategoryCityLayoutProps) {
  return <>{children}</>;
}

