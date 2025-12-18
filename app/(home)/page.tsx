import { Metadata } from "next";
import AboutSection from "./_components/about";
import CategoriesSlider from "./_components/categories";
import Hero from "./_components/hero";
import Services from "./_components/services";
import UpcommingCourses from "./_components/upcomming";
import { getSeoData } from "@/services/seo/seo-services";
import HomeSchema from "@/components/schema/home-schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("home");
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
          type: "website",
          url: seo.canonical,
        },
        twitter: {
          card: "summary_large_image",
          title: seo.meta_title,
          description: seo.meta_description,
          images: [seo.meta_image],
        },
        alternates: {
          canonical: seo.canonical,
        },
      };
    }
    // Fallback metadata
    return {
      title: "مركز الأداء المتوازن للتدريب | دورات التدريب",
      description:
        "مركز الأداء المتوازن للتدريب يقدم دورات تدريبية متقدمة في القيادة والإدارة والجودة والموارد البشرية والمزيد لتعزيز المؤسسات الخليجية والدولية.",
      keywords:
        "التدريب المهني, برامج التطوير, دورات الإدارة, دورات الموارد البشرية, مهارات IT, دورات المالية, دورات الجودة",
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
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "مركز الأداء المتوازن للتدريب | دورات التدريب",
      description:
        "مركز الأداء المتوازن للتدريب يقدم دورات تدريبية متقدمة في القيادة والإدارة والجودة والموارد البشرية والمزيد لتعزيز المؤسسات الخليجية والدولية.",
      keywords:
        "التدريب المهني, برامج التطوير, دورات الإدارة, دورات الموارد البشرية, مهارات IT, دورات المالية, دورات الجودة",
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

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Hero />
      <UpcommingCourses />
      <AboutSection />
      <CategoriesSlider />
      <Services />
    </>
  );
}
