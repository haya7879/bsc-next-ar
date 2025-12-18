import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface ContactSchemaProps {
  domain?: string;
}

export default function ContactSchema({ domain }: ContactSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const contactUrl = `${baseUrl}/contact`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...organizationSchema(domain),
        hasOfferCatalog: offerCatalogSchema(domain),
      },
      websiteSchema(domain, true),
      {
        "@type": "ContactPage",
        "@id": `${contactUrl}#webpage`,
        url: contactUrl,
        name: "اتصل بنا",
        description:
          "تواصل مع مركز الأداء المتوازن للتدريب. اعثر على تفاصيل رقم الجوال والبريد الإلكتروني وعناوين المكاتب في دبي ولندن، أو استخدم صفحة التواصل.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: {
          "@id": `${baseUrl}/#organization`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${contactUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Contact Us", item: contactUrl },
          ],
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

