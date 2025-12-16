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
        name: "Balanced Score Training Center",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: { "@id": `${baseUrl}/#organization` },
        description:
          "Explore a wide range of professional training courses offered by Balanced Score Training Center in various cities worldwide. Empowering individuals and organizations since 1996.",
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

