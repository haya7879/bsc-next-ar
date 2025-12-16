import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface BlogsSchemaProps {
  domain?: string;
}

export default function BlogsSchema({ domain }: BlogsSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const blogsUrl = `${baseUrl}/blogs`;

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
        "@id": `${blogsUrl}#webpage`,
        url: blogsUrl,
        name: "Blogs",
        description:
          "Explore insightful articles and the latest news from Balanced Score Training Center. Covering topics in leadership, strategy, finance, and more.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Blogs", item: blogsUrl },
          ],
        },
      },
      {
        "@type": "Blog",
        url: blogsUrl,
        name: "Blogs",
        description:
          "Explore insightful articles and the latest news from Balanced Score Training Center. Covering topics in leadership, strategy, finance, and more.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        publisher: { "@id": `${baseUrl}/#organization` },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

