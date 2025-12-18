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
        items={[
          { label: "الصفحة الرئيسية", href: "/" },
          { label: "عن المركز" },
        ]}
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
                <b>مركز الأداء المتوازن للتدريب</b>
              </h2>
              <div>
                <p>
                  تأسس مركز الأداء المتوازن للتدريب عام 1996 ليكون شريكًا
                  استراتيجيًا في تقديم الحلول التدريبية والاستشارية المتكاملة،
                  بهدف تمكين الأفراد والمؤسسات من تحقيق التميز والاستدامة في
                  بيئات العمل التنافسية. بفضل خبرته الممتدة لعقود ونهجه المبتكر،
                  يقدم المركز برامج متخصصة مصممة وفق أحدث المعايير الدولية، تغطي
                  مجالات القيادة، والإدارة، والتطوير المهني، مما يسهم في بناء
                  قدرات مستدامة وتعزيز ثقافة الابتكار. وبفضل حضوره العالمي،
                  يواصل المركز تمكين عملائه من مواكبة التحديات والمتغيرات في
                  عالم الأعمال المتسارع
                </p>
              </div>
            </div>

            <div className="about-item">
              <h2>رسالتنا</h2>
              <div>
                <p>
                  نعمل على تعزيز الأداء المؤسسي من خلال تطوير رأس المال البشري
                  ودعم النمو المستدام عبر حلول تدريبية واستشارية مبتكرة
                </p>
                <p>
                  ونسعى لنكون الشريك الاستراتيجي الموثوق في بناء بيئات عمل
                  تنافسية وفعّالة.
                </p>
              </div>
            </div>

            <div className="about-item">
              <h2>خدماتنا</h2>
              <p>
                - التدريب الحضوري: برامج تفاعلية تُعقد في مواقع مختارة لتجربة
                تعليمية مباشرة
              </p>
              <p>
                - التدريب عبر الإنترنت: دورات مرنة بجودة عالية متاحة في أي وقت
                ومن أي مكان.
              </p>
              <p>
                - التدريب الداخلي: حلول مخصصة لتعزيز أداء الفرق وتحقيق الأهداف
                المؤسسية.
              </p>
            </div>

            <div className="about-item">
              <h2>مدربونا الخبراء</h2>
              <p>
                يضم المركز نخبة من المدربين المتخصصين يجمعون بين الخبرة
                الأكاديمية والمهنية، مستخدمين تطبيقات عملية، ودراسات حالة،
                وأساليب تفاعلية لضمان تجربة تعليمية فعالة وتطبيق عملي في بيئات
                العمل.
              </p>
            </div>

            <div className="about-item">
              <h2>لماذا نحن؟</h2>
              <p>
                نعتمد على الابتكار والتقنيات الحديثة في تقديم تدريب عالي الجودة
                وفعّال. بفضل فريق من الخبراء، نقدم دعمًا مستمرًا لمساعدة
                المؤسسات والمحترفين على تحقيق النجاح المستدام والريادة في
                مجالاتهم.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
