import { JsonLd, organizationSchema, websiteSchema, getBaseUrl } from "./base-schema";

interface CourseSchemaProps {
  course: CourseDetail;
  timings: CourseTiming[];
  domain?: string;
}

export default function CourseSchema({ course, timings, domain }: CourseSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const courseUrl = `${baseUrl}/training-course/${course.slug}`;
  const categoriesUrl = `${baseUrl}/training-courses`;

  // Strip HTML tags
  const stripHtml = (html?: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  const description = stripHtml(course.meta_description || course.description || "");
  const limitedDescription = description.length > 500 ? description.substring(0, 500) : description;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(domain),
      websiteSchema(domain, true),
      {
        "@type": "WebPage",
        "@id": `${courseUrl}#webpage`,
        url: courseUrl,
        name: course.h1 || course.title,
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: { "@id": `${courseUrl}#course` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${courseUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Training Courses", item: categoriesUrl },
            {
              "@type": "ListItem",
              position: 3,
              name: course.category?.title || "",
              item: course.category ? `${baseUrl}/training-courses/${course.category.slug}` : categoriesUrl,
            },
            { "@type": "ListItem", position: 4, name: course.title, item: courseUrl },
          ],
        },
      },
      {
        "@type": "Course",
        "@id": `${courseUrl}#course`,
        name: course.h1 || course.title,
        description: limitedDescription,
        url: courseUrl,
        provider: { "@id": `${baseUrl}/#organization` },
        educationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          name: "شهادة إتمام الدورة",
          description:
            "شهادة رسمية يصدرها مركز الأداء المتوازن للتدريب عند إتمام الدورة بنجاح.",
          credentialCategory: "Certificate of Completion",
          recognizedBy: {
            "@type": "Organization",
            name: "مركز الأداء المتوازن للتدريب",
          },
        },
        hasCourseInstance: timings.length > 0 ? timings.map((timing) => ({
          "@type": "CourseInstance",
          courseMode: "Offline",
          startDate: timing.start_date,
          endDate: timing.end_date,
          location: {
            "@type": "Place",
            name: timing.city?.title || "",
            address: {
              "@type": "PostalAddress",
              addressLocality: timing.city?.title || "",
            },
          },
          offers: {
            "@type": "Offer",
            price: parseFloat(String(timing.fees).replace(/[^0-9.]/g, "")) || 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: courseUrl,
          },
        })) : undefined,
        about: course.category
          ? {
              "@type": "Thing",
              name: course.category.title,
            }
          : undefined,
      },
    ],
  };

  return <JsonLd data={schema} />;
}

