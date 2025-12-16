import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface TermSchemaProps {
  domain?: string;
}

export default function TermSchema({ domain }: TermSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const termsUrl = `${baseUrl}/terms`;

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
        "@id": `${termsUrl}#webpage`,
        url: termsUrl,
        name: "Terms & Conditions",
        description:
          "Read the official Terms and Conditions for using the Balanced Score Training Center website and services. Understand your rights and obligations.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${termsUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: termsUrl },
          ],
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

