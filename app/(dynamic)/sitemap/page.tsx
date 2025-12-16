import { Metadata } from "next";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getSitemapData } from "@/services/sitemap/services";
import { getSeoData } from "@/services/seo/seo-services";
import SitemapSchema from "@/components/schema/sitemap-schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("sitemap");
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
      title: "Sitemap | Balanced Score Training Center",
      description:
        "Complete sitemap of Balanced Score Training Center training courses, categories, cities, and all available pages.",
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
      title: "Sitemap | Balanced Score Training Center",
      description:
        "Complete sitemap of Balanced Score Training Center training courses, categories, cities, and all available pages.",
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

export default async function SitemapPage() {
  let sitemapData: Awaited<ReturnType<typeof getSitemapData>> | null = null;

  try {
    sitemapData = await getSitemapData();
  } catch (err) {
    // Handle error if needed
    console.error("Failed to fetch sitemap data:", err);
  }

  return (
    <>
      <SitemapSchema />
      <Breadcrumb
        items={[
          {
            href: "/sitemap",
            label: "خريطة الموقع",
          },
        ]}
      />
      {/* Sitemap Section */}
      <section className="py-8! md:py-10!">
        <div className="container-main">
          <div className="flex flex-col gap-16 max-w-4xl w-full">
            {/* Pages Section */}
            <div className="relative flex flex-col gap-10">
              {/* Background stripe */}
              <div className="absolute right-0 top-0 w-14 h-full bg-blue-50 -z-10 hidden md:block"></div>

              <h2 className="md:text-4xl text-2xl font-semibold mr-0! md:ml-10!">
                الصفحات
              </h2>

              <div className="mr-0! md:mr-28! flex flex-wrap gap-12 max-w-4xl">
                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  <li>
                    <a
                      href="/"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      الصفحة الرئيسية
                    </a>
                  </li>
                  <li>
                    <a
                      href="/training-courses"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      التخصصات
                    </a>
                  </li>
                  <li>
                    <a
                      href="/training-cities"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      المدن
                    </a>
                  </li>
                </ul>

                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  <li>
                    <a
                      href="/blogs"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      المدونات
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      عن المركز
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      اتصل بنا
                    </a>
                  </li>
                </ul>

                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  <li>
                    <a
                      href="/privacy-policy"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      سياسة الخصوصية
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      الشروط والأحكام
                    </a>
                  </li>
                  <li>
                    <a
                      href="/join"
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      انضم الى فريقنا
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cities Section */}
            <div className="relative flex flex-col gap-10">
              {/* Background stripe */}
              <div className="absolute right-0 top-0 w-14 h-full bg-blue-50 -z-10 hidden md:block"></div>

              <h2 className="md:text-4xl text-2xl font-semibold mr-0! md:ml-10!">
                المدن
              </h2>

              <div className="mr-0! md:mr-28! flex flex-wrap gap-12 max-w-4xl">
                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-1">
                  {sitemapData?.cities.map((city) => (
                    <li key={city.id}>
                      <a
                        href={`/training-cities/${city.slug}`}
                        className="hover:text-blue-600 transition-colors duration-300"
                      >
                        {city.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* City-Category Combinations Section */}
            {sitemapData?.city_category_seos &&
              Object.keys(sitemapData.city_category_seos).length > 0 && (
                <div className="relative flex flex-col gap-10">
                  {/* Background stripe */}
                  <div className="absolute right-0 top-0 w-14 h-full bg-green-50 -z-10 hidden md:block"></div>

                  <h2 className="md:text-4xl text-2xl font-semibold mr-0! md:ml-10!">
                    تخصصات ومدن
                  </h2>

                  <div className="mr-0! md:mr-28! space-y-8 max-w-4xl">
                    {Object.entries(sitemapData.city_category_seos).map(
                      ([categoryId, combinations]) => {
                        const category = sitemapData.categories.find(
                          (cat) => cat.id?.toString() === categoryId
                        );
                        if (!category) return null;

                        return (
                          <div key={categoryId} className="my-6!">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4!">
                              {category.title}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {combinations.map((combination, index) => (
                                <a
                                  key={index}
                                  href={`/courses/${combination.category.slug}/${combination.city.slug}`}
                                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 block"
                                >
                                  {combination.city.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>
    </>
  );
}
