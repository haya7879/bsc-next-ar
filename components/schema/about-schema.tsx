import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface AboutSchemaProps {
  domain?: string;
}

export default function AboutSchema({ domain }: AboutSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const aboutUrl = `${baseUrl}/about`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...organizationSchema(domain),
        hasOfferCatalog: offerCatalogSchema(domain),
      },
      websiteSchema(domain, true),
      {
        "@type": "AboutPage",
        "@id": `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: "About us",
        description:
          "تعرف على مركز الأداء المتوازن للتدريب, رسالتنا, رؤيتنا, وقيمنا. منذ عام 1996, نحن نقدم خدمات التدريب والاستشارات المتكاملة المتقدمة في المجالات المختلفة.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: {
          "@id": `${baseUrl}/#organization`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${aboutUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "About us", item: aboutUrl },
          ],
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

