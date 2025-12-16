import { Metadata } from "next";
import Breadcrumb from "@/components/ui/breadcrumb";
import HeroBanner from "@/components/ui/hero-banner";
import { hero } from "@/constants";
import "@/styles/about.css";
import { getSeoData } from "@/services/seo/seo-services";
import AboutSchema from "@/components/schema/about-schema";

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
      title: "About Us | Balanced Score Training Center",
      description:
        "Learn about Balanced Score Training Center, our mission, services, and expert trainers.",
      keywords: "about us, training center, professional development",
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
      title: "About Us | Balanced Score Training Center",
      description:
        "Learn about Balanced Score Training Center, our mission, services, and expert trainers.",
      keywords: "about us, training center, professional development",
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
        items={[{ label: "الصفحة الرئيسية", href: "/" }, { label: "عن المركز" }]}
      />
      <HeroBanner
        title={hero.about.title}
        description={hero.about.description}
        image={hero.about.image}
        imageAlt={hero.about.imageAlt}
        imageTitle={hero.about.imageTitle}
      />
      <section className="about-content">
        <div className="container-main">
          <div className="about-info">
            <div className="about-item">
              <h2>
                <b>مركز Balanced Score للتدريب</b>
              </h2>
              <div>
                <p>
                  تأسس مركز Balanced Score للتدريب في عام 1996 كشريك استراتيجي في تقديم حلول تدريب واستشارات شاملة، بهدف تمكين الأفراد والمنظمات لتحقيق التميز والاستدامة في بيئات العمل التنافسية. بعقود من الخبرة ونهج مبتكر، يقدم المركز برامج متخصصة مصممة وفقاً لأحدث المعايير الدولية، تغطي القيادة والإدارة والتطوير المهني. تساهم هذه البرامج في بناء قدرات مستدامة وتعزيز ثقافة الابتكار. بوجود عالمي، يواصل المركز تجهيز عملائه للتنقل في تحديات وتغييرات سريعة في عالم الأعمال.
                </p>
              </div>
            </div>

            <div className="about-item">
              <h2>مهمتنا</h2>
              <div>
                <p>
                  نسعى لتعزيز الأداء التنظيمي من خلال تطوير رأس المال البشري وتعزيز النمو المستدام من خلال حلول تدريب واستشارات مبتكرة.
                </p>
                <p>
                  نهدف إلى أن نكون شريكاً استراتيجياً موثوقاً في بناء بيئات عمل عالية الأداء وتنافسية.
                </p>
              </div>
            </div>

            <div className="about-item">
              <h2>خدماتنا</h2>
              <p>
                - التدريب الحضوري: برامج تفاعلية تُعقد في مواقع متميزة للتعلم العملي
              </p>
              <p>
                - التدريب عبر الإنترنت: دورات مرنة عالية الجودة يمكن الوصول إليها في أي وقت وأي مكان
              </p>
              <p>
                - التدريب الداخلي: حلول مخصصة لتعزيز أداء الفريق ومواءمتها مع أهداف الأعمال.
              </p>
            </div>

            <div className="about-item">
              <h2>مدربون خبراء</h2>
              <p>
                يجمع مدربونا النخبة بين الخبرة الأكاديمية والخبرة العملية، باستخدام التطبيقات العملية ودراسات الحالة والتقنيات التفاعلية لضمان التعلم المؤثر والتطبيق العملي.
              </p>
            </div>

            <div className="about-item">
              <h2>لماذا تختارنا؟</h2>
              <p>
                ندمج الابتكار والتكنولوجيا والمنهجيات المثبتة لتقديم تدريب عالي الجودة مدفوع بالنتائج. مدعومون بفريق من الخبراء، نقدم دعماً مستمراً لمساعدة المنظمات والمهنيين على تحقيق النجاح المستدام والريادة في الصناعة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
