import { JsonLd, organizationSchema, websiteSchema, offerCatalogSchema, getBaseUrl } from "./base-schema";

interface CitiesSchemaProps {
  domain?: string;
}

export default function CitiesSchema({ domain }: CitiesSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const citiesUrl = `${baseUrl}/courses-cities`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...organizationSchema(domain),
        hasOfferCatalog: offerCatalogSchema(domain),
      },
      websiteSchema(domain, true),
      {
        "@type": "CollectionPage",
        "@id": `${citiesUrl}#webpage`,
        url: citiesUrl,
        name: "Training Courses Venues",
        description:
          "Explore the Balanced Score Training Center training courses venues spread across multiple cities across the globe. Join us and begin your success journey today!",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${citiesUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            {
              "@type": "ListItem",
              position: 2,
              name: "Training Courses Venues",
              item: citiesUrl,
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: 24,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: { "@type": "City", name: "Amman", url: `${baseUrl}/courses-city/amman` },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: { "@type": "City", name: "Amsterdam", url: `${baseUrl}/courses-city/amsterdam` },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: { "@type": "City", name: "Bali", url: `${baseUrl}/courses-city/bali` },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: { "@type": "City", name: "Barcelona", url: `${baseUrl}/courses-city/barcelona` },
            },
            {
              "@type": "ListItem",
              position: 5,
              item: { "@type": "City", name: "Cairo", url: `${baseUrl}/courses-city/cairo` },
            },
            {
              "@type": "ListItem",
              position: 6,
              item: { "@type": "City", name: "Cape Town", url: `${baseUrl}/courses-city/cape-town` },
            },
            {
              "@type": "ListItem",
              position: 7,
              item: { "@type": "City", name: "Casablanca", url: `${baseUrl}/courses-city/casablanca` },
            },
            {
              "@type": "ListItem",
              position: 8,
              item: { "@type": "City", name: "Dubai", url: `${baseUrl}/courses-city/dubai` },
            },
            {
              "@type": "ListItem",
              position: 9,
              item: { "@type": "City", name: "Geneva", url: `${baseUrl}/courses-city/geneva` },
            },
            {
              "@type": "ListItem",
              position: 10,
              item: { "@type": "City", name: "Istanbul", url: `${baseUrl}/courses-city/istanbul` },
            },
            {
              "@type": "ListItem",
              position: 11,
              item: { "@type": "City", name: "Jakarta", url: `${baseUrl}/courses-city/jakarta` },
            },
            {
              "@type": "ListItem",
              position: 12,
              item: { "@type": "City", name: "Krakow", url: `${baseUrl}/courses-city/krakow` },
            },
            {
              "@type": "ListItem",
              position: 13,
              item: { "@type": "City", name: "Kuala Lumpur", url: `${baseUrl}/courses-city/kuala-lumpur` },
            },
            {
              "@type": "ListItem",
              position: 14,
              item: { "@type": "City", name: "London", url: `${baseUrl}/courses-city/london` },
            },
            {
              "@type": "ListItem",
              position: 15,
              item: { "@type": "City", name: "Madrid", url: `${baseUrl}/courses-city/madrid` },
            },
            {
              "@type": "ListItem",
              position: 16,
              item: { "@type": "City", name: "Manama", url: `${baseUrl}/courses-city/manama` },
            },
            {
              "@type": "ListItem",
              position: 17,
              item: { "@type": "City", name: "Milan", url: `${baseUrl}/courses-city/milan` },
            },
            {
              "@type": "ListItem",
              position: 18,
              item: { "@type": "City", name: "Paris", url: `${baseUrl}/courses-city/paris` },
            },
            {
              "@type": "ListItem",
              position: 19,
              item: { "@type": "City", name: "Prague", url: `${baseUrl}/courses-city/prague` },
            },
            {
              "@type": "ListItem",
              position: 20,
              item: { "@type": "City", name: "Rome", url: `${baseUrl}/courses-city/rome` },
            },
            {
              "@type": "ListItem",
              position: 21,
              item: { "@type": "City", name: "Sharm El Sheikh", url: `${baseUrl}/courses-city/sharm-el-sheikh` },
            },
            {
              "@type": "ListItem",
              position: 22,
              item: { "@type": "City", name: "Singapore", url: `${baseUrl}/courses-city/singapore` },
            },
            {
              "@type": "ListItem",
              position: 23,
              item: { "@type": "City", name: "Vienna", url: `${baseUrl}/courses-city/vienna` },
            },
            {
              "@type": "ListItem",
              position: 24,
              item: { "@type": "City", name: "Zurich", url: `${baseUrl}/courses-city/zurich` },
            },
          ],
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

