import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface JoinSchemaProps {
  domain?: string;
}

export default function JoinSchema({ domain }: JoinSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const joinUrl = `${baseUrl}/join-team`;

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
        "@id": `${joinUrl}#webpage`,
        url: joinUrl,
        name: "Join Our Team",
        description:
          "Interested in joining the Balanced Score Training Center team? Submit your details and CV through our online form to express your interest in career opportunities.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${joinUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Join Our Team", item: joinUrl },
          ],
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

