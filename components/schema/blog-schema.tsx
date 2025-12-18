import { JsonLd, organizationSchema, websiteSchema, getBaseUrl } from "./base-schema";

interface BlogSchemaProps {
  blog: BlogDetail;
  domain?: string;
}

export default function BlogSchema({ blog, domain }: BlogSchemaProps) {
  const baseUrl = getBaseUrl(domain);
  const blogUrl = `${baseUrl}/blog/${blog.slug}`;
  const metaDescription = blog.meta_description || blog.description || "";
  const metaTitle = blog.meta_title || blog.title;
  const imageUrl = blog.image ? (blog.image.startsWith("http") ? blog.image : `${baseUrl}${blog.image}`) : "";

  // Strip HTML tags from description
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const cleanDescription = stripHtml(metaDescription);
  const cleanArticleBody = stripHtml(blog.content || blog.description || "");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(domain),
      websiteSchema(domain),
      {
        "@type": "WebPage",
        "@id": `${blogUrl}#webpage`,
        url: blogUrl,
        name: metaTitle,
        description: cleanDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: { "@id": `${blogUrl}#blogposting` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${baseUrl}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blogs",
              item: `${baseUrl}/blogs`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: blog.title,
              item: blogUrl,
            },
          ],
        },
        datePublished: new Date(blog.created_at).toISOString(),
        dateModified: new Date(blog.updated_at || blog.created_at).toISOString(),
      },
      {
        "@type": "BlogPosting",
        "@id": `${blogUrl}#blogposting`,
        mainEntityOfPage: { "@id": `${blogUrl}#webpage` },
        headline: blog.title,
        url: blogUrl,
        description: cleanDescription,
        image: imageUrl
          ? {
              "@type": "ImageObject",
              url: imageUrl,
              height: 600,
              width: 1200,
              caption: blog.image_title || blog.title,
              representativeOfPage: true,
            }
          : undefined,
        author: {
          "@type": "Organization",
          name: "مركز الأداء المتوازن للتدريب",
          "@id": `${baseUrl}/#organization`,
        },
        publisher: { "@id": `${baseUrl}/#organization` },
        datePublished: new Date(blog.created_at).toISOString(),
        dateModified: new Date(blog.updated_at || blog.created_at).toISOString(),
        articleBody: cleanArticleBody.replace(/"/g, '\\"').replace(/\n/g, " ").replace(/\r/g, " "),
        inLanguage: "en",
      },
    ],
  };

  return <JsonLd data={schema} />;
}

