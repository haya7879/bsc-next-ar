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
        name: "انضم إلى فريقنا",
        description:
          "هل ترغب في الانضمام إلى فريق مركز الأداء المتوازن للتدريب؟ قدّم بياناتك وسيرتك الذاتية عبر النموذج الإلكتروني لإبداء اهتمامك بفرص العمل المتاحة.",
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

