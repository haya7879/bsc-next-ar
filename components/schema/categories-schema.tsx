import { JsonLd, organizationSchema, websiteSchema, getBaseUrl } from "./base-schema";

interface CategoriesSchemaProps {
  domain?: string;
}

export default function CategoriesSchema({ domain }: CategoriesSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const categoriesUrl = `${baseUrl}/training-courses`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(domain),
      websiteSchema(domain, true),
      {
        "@type": "CollectionPage",
        "@id": `${categoriesUrl}#webpage`,
        url: categoriesUrl,
        name: "Training Courses Categories",
        description:
          "Explore all training courses categories offered by Balanced Score Training Center. Find courses in management, finance, HR, technical skills, and more.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          "@id": `${categoriesUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            {
              "@type": "ListItem",
              position: 2,
              name: "Training Courses Categories",
              item: categoriesUrl,
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: 22,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Thing",
                name: "Management & Leadership",
                url: `${baseUrl}/training-courses/management-leadership`,
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Thing",
                name: "Accounting, Finance and Banking",
                url: `${baseUrl}/training-courses/accounting-finance-and-banking`,
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Thing",
                name: "Oil and Gas Engineering",
                url: `${baseUrl}/training-courses/oil-and-gas-engineering`,
              },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: {
                "@type": "Thing",
                name: "Health, Safety & Security",
                url: `${baseUrl}/training-courses/health-safety-security`,
              },
            },
            {
              "@type": "ListItem",
              position: 5,
              item: {
                "@type": "Thing",
                name: "Governance and Auditing",
                url: `${baseUrl}/training-courses/governance-and-auditing`,
              },
            },
            {
              "@type": "ListItem",
              position: 6,
              item: {
                "@type": "Thing",
                name: "Information Technology and Cyber Security",
                url: `${baseUrl}/training-courses/information-technology-and-cyber-security`,
              },
            },
            {
              "@type": "ListItem",
              position: 7,
              item: {
                "@type": "Thing",
                name: "Electrical, Renewable Energy and Power Engineering",
                url: `${baseUrl}/training-courses/electrical-renewable-energy-and-power-engineering`,
              },
            },
            {
              "@type": "ListItem",
              position: 8,
              item: {
                "@type": "Thing",
                name: "Strategic Management and Planning",
                url: `${baseUrl}/training-courses/strategic-management-and-planning`,
              },
            },
            {
              "@type": "ListItem",
              position: 9,
              item: {
                "@type": "Thing",
                name: "Project Management",
                url: `${baseUrl}/training-courses/project-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 10,
              item: {
                "@type": "Thing",
                name: "Environmental Management & Water Treatment",
                url: `${baseUrl}/training-courses/environmental-management-water-treatment`,
              },
            },
            {
              "@type": "ListItem",
              position: 11,
              item: {
                "@type": "Thing",
                name: "Maintenance and Facilities Management",
                url: `${baseUrl}/training-courses/maintenance-and-facilities-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 12,
              item: {
                "@type": "Thing",
                name: "Marketing & Sales Management",
                url: `${baseUrl}/training-courses/marketing-sales-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 13,
              item: {
                "@type": "Thing",
                name: "Contracts and Tenders Management",
                url: `${baseUrl}/training-courses/contracts-and-tenders-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 14,
              item: {
                "@type": "Thing",
                name: "Purchasing and Logistics and Inventory Management",
                url: `${baseUrl}/training-courses/purchasing-and-logistics-and-inventory-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 15,
              item: {
                "@type": "Thing",
                name: "Quality Management and Improvement",
                url: `${baseUrl}/training-courses/quality-management-and-improvement`,
              },
            },
            {
              "@type": "ListItem",
              position: 16,
              item: {
                "@type": "Thing",
                name: "Secretary & Office Management and Executive Assistant",
                url: `${baseUrl}/training-courses/secretary-office-management-and-executive-assistant`,
              },
            },
            {
              "@type": "ListItem",
              position: 17,
              item: {
                "@type": "Thing",
                name: "Healthcare and Medical Management",
                url: `${baseUrl}/training-courses/healthcare-and-medical-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 18,
              item: {
                "@type": "Thing",
                name: "Human Resources and Personnel",
                url: `${baseUrl}/training-courses/human-resources-and-personnel`,
              },
            },
            {
              "@type": "ListItem",
              position: 19,
              item: {
                "@type": "Thing",
                name: "Training and Talent Management",
                url: `${baseUrl}/training-courses/training-and-talent-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 20,
              item: {
                "@type": "Thing",
                name: "Documentations and Records Management",
                url: `${baseUrl}/training-courses/documentations-and-records-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 21,
              item: {
                "@type": "Thing",
                name: "Public Relations and Media Management",
                url: `${baseUrl}/training-courses/public-relations-and-media-management`,
              },
            },
            {
              "@type": "ListItem",
              position: 22,
              item: {
                "@type": "Thing",
                name: "Customer Service Management",
                url: `${baseUrl}/training-courses/customer-service-management`,
              },
            },
          ],
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}

