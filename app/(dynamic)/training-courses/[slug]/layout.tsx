import { Metadata } from "next";
import { getCategoryBySlug } from "@/services/categories/categories-services";

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: CategoryLayoutProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const categoryData = await getCategoryBySlug(resolvedParams.slug || "");
    const category = categoryData?.category;
    const baseUrl = "";

    if (!category) {
      return {
        title: "التخصص غير موجود | مركز الأداء المتوازن للتدريب",
        description: "تعذّر العثور على التخصص المطلوب.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const metaTitle = category.meta_title || category.title;
    const metaDescription = category.meta_description || category.description || "";
    const metaImage = category.image || "";
    const canonical = category.canonical || `${baseUrl}/training-courses/${resolvedParams.slug}`;

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
            alt: category.title,
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
      title: "التخصص غير موجود | مركز الأداء المتوازن للتدريب",
      description: "استكشف دورات التدريب في هذا التخصص.",
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

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return <>{children}</>;
}

