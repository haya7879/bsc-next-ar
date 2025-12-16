import { DOMAIN } from "@/constants/domain";

export interface BaseSchemaProps {
  domain?: string;
}

export const getBaseUrl = (domain?: string) => domain || DOMAIN;

export const getLogoUrl = (domain?: string) => `${getBaseUrl(domain)}/assets/imgs/logo-en.png`;

export const organizationSchema = (domain?: string) => ({
  "@type": "Organization",
  "@id": `${getBaseUrl(domain)}/#organization`,
  name: "Balanced Score Training Center",
  url: getBaseUrl(domain),
  logo: getLogoUrl(domain),
  sameAs: [
    "https://www.facebook.com/bscdubai/",
    "https://web.khda.gov.ae/en/Education-Directory/Training/Training-Details?CenterID=14856",
    "https://maps.app.goo.gl/mXNQd1xL8hjpNMUo8",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+971 50 625 2099",
      contactType: "customer support",
      areaServed: "AE",
      availableLanguage: ["en", "ar"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+971 4 432 2444",
      contactType: "customer support",
      areaServed: "AE",
      availableLanguage: ["en", "ar"],
    },
    {
      "@type": "ContactPoint",
      email: "info@bscenter.org",
      contactType: "customer support",
      availableLanguage: ["en", "ar"],
    },
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "The Prism Tower, Business Bay",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "83 Crampton Street",
      addressLocality: "London",
      postalCode: "SE17 3BQ",
      addressCountry: "GB",
    },
  ],
  description:
    "Balanced Score Training Center – Your strategic partner in development and excellence. Since 1996, we have been delivering innovative, world-class training and consulting solutions designed to empower individuals and organizations, helping them thrive in today's fast-paced and competitive business environment.",
  knowsAbout: [
    "Management & Leadership",
    "Accounting, Finance and Banking",
    "Oil and Gas Engineering",
    "Health, Safety & Security",
    "Governance and Auditing",
    "Information Technology and Cyber Security",
    "Electrical, Renewable Energy and Power Engineering",
    "Strategic Management and Planning",
    "Project Management",
    "Environmental Management & Water Treatment",
    "Maintenance and Facilities Management",
    "Marketing & Sales Management",
    "Contracts and Tenders Management",
    "Purchasing and Logistics and Inventory Management",
    "Quality Management and Improvement",
    "Secretary & Office Management and Executive Assistant",
    "Healthcare and Medical Management",
    "Human Resources and Personnel",
    "Training and Talent Management",
    "Documentations and Records Management",
    "Public Relations and Media Management",
    "Customer Service Management",
  ],
});

export const websiteSchema = (domain?: string, includeSearchAction = true) => {
  const base = {
    "@type": "WebSite",
    "@id": `${getBaseUrl(domain)}/#website`,
    url: getBaseUrl(domain),
    name: "Balanced Score Training Center",
    description:
      "Balanced Score Training Center offers innovative, world-class training and consulting solutions to empower individuals and organizations.",
    publisher: {
      "@id": `${getBaseUrl(domain)}/#organization`,
    },
    inLanguage: "en",
  };

  if (includeSearchAction) {
    return {
      ...base,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${getBaseUrl(domain)}/search?course_title={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  return base;
};

export const offerCatalogSchema = (domain?: string) => ({
  "@type": "OfferCatalog",
  name: "Training Course Categories",
  itemListElement: [
    {
      "@type": "OfferCatalog",
      name: "Management & Leadership",
      url: `${getBaseUrl(domain)}/training-courses/management-leadership`,
    },
    {
      "@type": "OfferCatalog",
      name: "Accounting, Finance and Banking",
      url: `${getBaseUrl(domain)}/training-courses/accounting-finance-and-banking`,
    },
    {
      "@type": "OfferCatalog",
      name: "Oil and Gas Engineering",
      url: `${getBaseUrl(domain)}/training-courses/oil-and-gas-engineering`,
    },
    {
      "@type": "OfferCatalog",
      name: "Health, Safety & Security",
      url: `${getBaseUrl(domain)}/training-courses/health-safety-security`,
    },
    {
      "@type": "OfferCatalog",
      name: "Governance and Auditing",
      url: `${getBaseUrl(domain)}/training-courses/governance-and-auditing`,
    },
    {
      "@type": "OfferCatalog",
      name: "Information Technology and Cyber Security",
      url: `${getBaseUrl(domain)}/training-courses/information-technology-and-cyber-security`,
    },
    {
      "@type": "OfferCatalog",
      name: "Electrical, Renewable Energy and Power Engineering",
      url: `${getBaseUrl(domain)}/training-courses/electrical-renewable-energy-and-power-engineering`,
    },
    {
      "@type": "OfferCatalog",
      name: "Strategic Management and Planning",
      url: `${getBaseUrl(domain)}/training-courses/strategic-management-and-planning`,
    },
    {
      "@type": "OfferCatalog",
      name: "Project Management",
      url: `${getBaseUrl(domain)}/training-courses/project-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Environmental Management & Water Treatment",
      url: `${getBaseUrl(domain)}/training-courses/environmental-management-water-treatment`,
    },
    {
      "@type": "OfferCatalog",
      name: "Maintenance and Facilities Management",
      url: `${getBaseUrl(domain)}/training-courses/maintenance-and-facilities-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Marketing & Sales Management",
      url: `${getBaseUrl(domain)}/training-courses/marketing-sales-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Contracts and Tenders Management",
      url: `${getBaseUrl(domain)}/training-courses/contracts-and-tenders-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Purchasing and Logistics and Inventory Management",
      url: `${getBaseUrl(domain)}/training-courses/purchasing-and-logistics-and-inventory-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Quality Management and Improvement",
      url: `${getBaseUrl(domain)}/training-courses/quality-management-and-improvement`,
    },
    {
      "@type": "OfferCatalog",
      name: "Secretary & Office Management and Executive Assistant",
      url: `${getBaseUrl(domain)}/training-courses/secretary-office-management-and-executive-assistant`,
    },
    {
      "@type": "OfferCatalog",
      name: "Healthcare and Medical Management",
      url: `${getBaseUrl(domain)}/training-courses/healthcare-and-medical-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Human Resources and Personnel",
      url: `${getBaseUrl(domain)}/training-courses/human-resources-and-personnel`,
    },
    {
      "@type": "OfferCatalog",
      name: "Training and Talent Management",
      url: `${getBaseUrl(domain)}/training-courses/training-and-talent-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Documentations and Records Management",
      url: `${getBaseUrl(domain)}/training-courses/documentations-and-records-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Public Relations and Media Management",
      url: `${getBaseUrl(domain)}/training-courses/public-relations-and-media-management`,
    },
    {
      "@type": "OfferCatalog",
      name: "Customer Service Management",
      url: `${getBaseUrl(domain)}/training-courses/customer-service-management`,
    },
  ],
});

export const JsonLd = ({ data }: { data: object }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

