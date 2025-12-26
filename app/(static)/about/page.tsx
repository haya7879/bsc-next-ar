import { Metadata } from "next";
import Breadcrumb from "@/components/ui/breadcrumb";
import HeroBanner from "@/components/ui/hero-banner";
import { hero } from "@/constants";
import { getSeoData } from "@/services/seo/seo-services";
import AboutSchema from "@/components/schema/about-schema";
import WhoWeAreSection from "@/components/sections/who-we-are-section";
import OurServicesSection from "@/components/sections/our-services-section";
import OurMissionSection from "@/components/sections/our-mission-section";
import ExpertTrainersSection from "@/components/sections/expert-trainers-section";
import WhyChooseUsSection from "@/components/sections/why-choose-us-section";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("about");
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
      title: "عن المركز | مركز الأداء المتوازن للتدريب",
      description:
        "تعرف على مركز الأداء المتوازن للتدريب، رسالتنا، خدماتنا، والمدربين الخبراء.",
      keywords: "عن المركز, مركز تدريب, التطوير المهني",
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
      title: "عن المركز | مركز الأداء المتوازن للتدريب",
      description:
        "تعرف على مركز الأداء المتوازن للتدريب، رسالتنا، خدماتنا، والمدربين الخبراء.",
      keywords: "عن المركز, مركز تدريب, التطوير المهني",
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

export default function AboutPage() {
  return (
    <>
      <AboutSchema />
      <Breadcrumb
        items={[{ label: "الرئيسية", href: "/" }, { label: "عن المركز" }]}
      />
      <HeroBanner
        title={hero.about.title}
        description={hero.about.description}
        image={hero.about.image}
        imageAlt={hero.about.imageAlt}
        imageTitle={hero.about.imageTitle}
      />
      <section className="about-page-content">
          <WhoWeAreSection />
          <OurMissionSection />
          <ExpertTrainersSection />
          <WhyChooseUsSection />
          <OurServicesSection />
      </section>
    </>
  );
}
