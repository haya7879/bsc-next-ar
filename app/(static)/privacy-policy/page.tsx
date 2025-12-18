import { Metadata } from "next";
import Breadcrumb from "@/components/ui/breadcrumb";
import "@/styles/privacy.css";
import { getSeoData } from "@/services/seo/seo-services";
import PrivacySchema from "@/components/schema/privacy-schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("privacy-policy");
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
      title: "سياسة الخصوصية | مركز الأداء المتوازن للتدريب",
      description:
        "تعرف على كيفية حماية مركز الأداء المتوازن للتدريب لخصوصيتك والتعامل مع معلوماتك الشخصية.",
      keywords: "سياسة الخصوصية, حماية البيانات, GDPR",
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
      title: "سياسة الخصوصية | مركز الأداء المتوازن للتدريب",
      description:
        "تعرف على كيفية حماية مركز الأداء المتوازن للتدريب لخصوصيتك والتعامل مع معلوماتك الشخصية.",
      keywords: "سياسة الخصوصية, حماية البيانات, GDPR",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PrivacySchema />
      <Breadcrumb
        items={[{ label: "الصفحة الرئيسية", href: "/" }, { label: "سياسة الخصوصية" }]}
      />
      <section className="privacy">
        <div className="privacy-main container-main">
          <h1>
            <strong>سياسة الخصوصية</strong>
          </h1>

          <p>
            نحن نحترم خصوصيتك ونلتزم بحمايتها من خلال التزامنا بسياسة الخصوصية هذه ("السياسة"). تصف هذه السياسة أنواع المعلومات التي قد نجمعها منك أو التي قد تقدمها ("المعلومات الشخصية") على موقع الويب <strong>www.bscenter.org</strong> ("الموقع الإلكتروني" أو "الخدمة") وأي من منتجاته وخدماته ذات الصلة (يُشار إليها مجتمعة باسم "الخدمات")، وممارساتنا لجمع واستخدام وصيانة وحماية والإفصاح عن هذه المعلومات الشخصية. كما تصف الخيارات المتاحة لك فيما يتعلق باستخدامنا لمعلوماتك الشخصية وكيف يمكنك الوصول إليها وتحديثها. هذه السياسة هي اتفاقية ملزمة قانونًا بينك ("المستخدم" أو "أنت" أو "خاصتك") و<strong>مركز الأداء المتوازن للتدريب</strong> ("مركز الأداء المتوازن للتدريب" أو "نحن" أو "لنا" أو "خاصتنا"). من خلال الوصول إلى الموقع الإلكتروني والخدمات واستخدامهما، فإنك تقر بأنك قرأت وفهمت وتوافق على الالتزام بشروط هذه السياسة. تتوافق هذه السياسة مع <strong>المرسوم الاتحادي بقانون رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية (PDPL)</strong>، و<strong>اللائحة العامة لحماية البيانات في الاتحاد الأوروبي (GDPR)</strong> للمستخدمين في المنطقة الاقتصادية الأوروبية (EEA)، وغيرها من لوائح الخصوصية العالمية المعمول بها.
          </p>

          <div className="privacy-items">
            <div className="privacy-item">
              <h2>
                <strong>نطاق السياسة</strong>
              </h2>
              <p>
                تنطبق هذه السياسة على جميع المستخدمين على مستوى العالم الذين يدخلون إلى موقعنا الإلكتروني وخدماتنا أو يستخدمونها. وهي تحدد كيفية جمعنا واستخدامنا وإدارة المعلومات الشخصية، وضمان الامتثال لقوانين الخصوصية المحلية والدولية.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>جمع المعلومات الشخصية</strong>
              </h2>
              <p>قد نجمع الأنواع التالية من المعلومات الشخصية:</p>
              <ul>
                <li>
                  <strong>معلومات الاتصال</strong> (على سبيل المثال، الاسم، عنوان البريد الإلكتروني، رقم الهاتف).
                </li>
                <li>
                  <strong>المعلومات الديموغرافية</strong> (على سبيل المثال، بلد الإقامة).
                </li>
                <li>
                  <strong>معلومات المعاملات</strong> (على سبيل المثال، تفاصيل الدفع، عنوان الفاتورة).
                </li>
                <li>
                  <strong>المعلومات الفنية</strong> (على سبيل المثال، عنوان IP، نوع المتصفح).
                </li>
              </ul>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>استخدام ومعالجة المعلومات الشخصية</strong>
              </h2>
              <p>
                قد تُستخدم معلوماتك الشخصية للأغراض التالية:
              </p>
              <ol>
                <li>توفير وإدارة الوصول إلى خدماتنا.</li>
                <li>معالجة المعاملات والمدفوعات.</li>
                <li>الرد على الاستفسارات وتقديم الدعم.</li>
                <li>
                  إرسال المواد الترويجية والتسويقية (بموافقة).
                </li>
                <li>الامتثال للالتزامات القانونية والتنظيمية.</li>
                <li>تحسين وتخصيص تجربة المستخدم.</li>
              </ol>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>الاتصال بنا</strong>
              </h2>
              <p>
                لأي أسئلة أو لممارسة حقوق الخصوصية الخاصة بك، يرجى الاتصال بـ:
              </p>
              <p>
                <strong>مركز الأداء المتوازن للتدريب</strong>
              </p>
              <p>
                البريد الإلكتروني: <a href="mailto:info@bscenter.org">info@bscenter.org</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
