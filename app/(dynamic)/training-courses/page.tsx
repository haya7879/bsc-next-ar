import { Metadata } from "next";
import "@/styles/categories.css";
import HeroBanner from "@/components/ui/hero-banner";
import { hero } from "@/constants";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getCategories } from "@/services/categories/categories-services";
import CategoriesGrid from "@/components/lists/categories-grid";
import { getSeoData } from "@/services/seo/seo-services";
import CategoriesSchema from "@/components/schema/categories-schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('categories');
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
      title: "التخصصات | مركز الأداء المتوازن للتدريب",
      description: "استكشف مجموعة واسعة من تصنيفات التدريب ودورات التدريب المهني والتطوير.",
      keywords: "التخصصات, دورات التدريب, التطوير",
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
      title: "التخصصات | مركز الأداء المتوازن للتدريب",
      description: "استكشف مجموعة واسعة من تصنيفات التدريب ودورات التدريب المهني والتطوير.",
      keywords: "التخصصات, دورات التدريب, التطوير",
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

export default async function CategoriesPage() {
  const categories: Category[] = await getCategories();

  return (
    <>
      <CategoriesSchema />
      <Breadcrumb items={[{ label: "التخصصات", href: "/training-courses" }]} />
      <HeroBanner
        title={hero.categories.title}
        description={hero.categories.description}
        image={hero.categories.image}
        imageAlt={hero.categories.imageAlt}
        imageTitle={hero.categories.imageTitle}
      />
      <CategoriesGrid categories={categories} />
    </>
  );
}
