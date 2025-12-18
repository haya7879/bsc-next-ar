import { Metadata } from "next";
import "@/styles/cities.css";
import HeroBanner from "@/components/ui/hero-banner";
import { hero } from "@/constants";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getCities } from "@/services/cities/cities-services";
import CitiesGrid from "@/components/lists/cities-grid";
import { getSeoData } from "@/services/seo/seo-services";
import CitiesSchema from "@/components/schema/cities-schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('cities');
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
      title: "المدن | مركز الأداء المتوازن للتدريب",
      description: "العثور على دورات التدريب في المدن في دول الخليج والمواقع الدولية.",
      keywords: "المدن, دورات التدريب, مواقع التدريب",
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
      title: "المدن | مركز الأداء المتوازن للتدريب",
      description: "العثور على دورات التدريب في المدن في دول الخليج والمواقع الدولية.",
      keywords: "المدن, دورات التدريب, مواقع التدريب",
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

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <>
      <CitiesSchema />
      <Breadcrumb items={[{ label: "المدن", href: "/training-cities" }]} />
      <HeroBanner
        title={hero.cities.title}
        description={hero.cities.description}
        image={hero.cities.image}
        imageAlt={hero.cities.imageAlt}
        imageTitle={hero.cities.imageTitle}
      />
      <CitiesGrid cities={cities} />
    </>
  );
}
