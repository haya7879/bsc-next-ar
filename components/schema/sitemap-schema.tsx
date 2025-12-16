import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface SitemapSchemaProps {
  domain?: string;
}

export default function SitemapSchema({ domain }: SitemapSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const sitemapUrl = `${baseUrl}/sitemap`;

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
        "@id": `${sitemapUrl}#webpage`,
        url: sitemapUrl,
        name: "Sitemap",
        description:
          "HTML sitemap for BS Center. Easily navigate through our website sections including About Us, Training Categories, Course Locations, Blogs, and Contact Information.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${sitemapUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Sitemap", item: sitemapUrl },
          ],
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

