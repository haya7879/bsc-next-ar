import { JsonLd, organizationSchema, websiteSchema, getBaseUrl } from "./base-schema";

interface CitySchemaProps {
  city: City;
  courses: Course[];
  domain?: string;
}

export default function CitySchema({ city, courses, domain }: CitySchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const cityUrl = `${baseUrl}/courses-city/${city.slug}`;
  const citiesUrl = `${baseUrl}/courses-cities`;

  // Strip HTML tags
  const stripHtml = (html?: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  const description = stripHtml(city.meta_description || city.description || "");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(domain),
      websiteSchema(domain),
      {
        "@type": "CollectionPage",
        "@id": `${cityUrl}#webpage`,
        url: cityUrl,
        name: `Training Courses in ${city.title}`,
        description: description,
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${cityUrl}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${baseUrl}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Cities",
              item: citiesUrl,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: city.title,
              item: cityUrl,
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          name: `Training Courses in ${city.title}`,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: courses.length,
          itemListElement: courses.map((course, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Course",
              name: course.title,
              description: undefined,
              url: `${baseUrl}/training-course/${course.slug}`,
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Offline",
                location: {
                  "@type": "Place",
                  name: city.title,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: city.title,
                  },
                },
              },
            },
          })),
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

