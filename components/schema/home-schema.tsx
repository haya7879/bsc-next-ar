import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface HomeSchemaProps {
  domain?: string;
}

export default function HomeSchema({ domain }: HomeSchemaProps) {
  const baseUrl = getBaseUrl(domain);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...organizationSchema(domain),
        hasOfferCatalog: offerCatalogSchema(domain),
      },
      websiteSchema(domain, true),
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: "مركز الأداء المتوازن للتدريب",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: { "@id": `${baseUrl}/#organization` },
        description:
          "استكشف مجموعة واسعة من الدورات التدريبية الاحترافية التي يقدمها مركز الأداء المتوازن للتدريب في مدن متعددة حول العالم. نُمكّن الأفراد والمؤسسات منذ عام 1996.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
          ],
        },
        inLanguage: "en",
      },
    ],
  };

  return <JsonLd data={schema} />;
}

