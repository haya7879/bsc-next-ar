import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface PrivacySchemaProps {
  domain?: string;
}

export default function PrivacySchema({ domain }: PrivacySchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const privacyUrl = `${baseUrl}/privacy-policy`;

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
        "@id": `${privacyUrl}#webpage`,
        url: privacyUrl,
        name: "سياسة الخصوصية",
        description:
          "اطّلع على سياسة الخصوصية الخاصة بمركز الأداء المتوازن للتدريب. تعرّف على كيفية جمع بياناتك الشخصية واستخدامها وحمايتها.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${privacyUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Privacy Policy", item: privacyUrl },
          ],
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

