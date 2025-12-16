import { JsonLd, organizationSchema, websiteSchema, getBaseUrl } from "./base-schema";

interface CategorySchemaProps {
  category: Category;
  courses: Course[];
  domain?: string;
}

export default function CategorySchema({ category, courses, domain }: CategorySchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const categoryUrl = `${baseUrl}/training-courses/${category.slug}`;
  const categoriesUrl = `${baseUrl}/training-courses`;

  // Strip HTML tags
  const stripHtml = (html?: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  const description = stripHtml(category.meta_description || category.description || "");
  const limitedDescription = description.length > 500 ? description.substring(0, 500) : description;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(domain),
      websiteSchema(domain),
      {
        "@type": "CollectionPage",
        "@id": `${categoryUrl}#webpage`,
        url: categoryUrl,
        name: category.h1 || category.title,
        description: limitedDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${categoryUrl}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Training Course Categories",
              item: categoriesUrl,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: category.title,
              item: categoryUrl,
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          name: `List of Courses in ${category.title}`,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: courses.length,
          itemListElement: courses.map((course, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Course",
              name: course.title,
              url: `${baseUrl}/training-course/${course.slug}`,
              description: undefined,
              provider: {
                "@type": "Organization",
                name: "Balanced Score Training Center",
                url: baseUrl,
              },
            },
          })),
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

