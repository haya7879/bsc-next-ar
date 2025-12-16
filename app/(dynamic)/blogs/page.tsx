import { Metadata } from "next";
import "@/styles/blogs.css";
import Breadcrumb from "@/components/ui/breadcrumb";
import HeroBanner from "@/components/ui/hero-banner";
import { hero } from "@/constants";
import BlogsGrid from "@/components/lists/blogs-grid";
import Pagination from "@/components/ui/pagination";
import { getBlogs } from "@/services/blogs/blogs-services";
import { getSearchParamInt } from "@/lib/helpers";
import { getSeoData } from "@/services/seo/seo-services";
import BlogsSchema from "@/components/schema/blogs-schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('blogs');
    if (seoData && seoData.seo) {
      const seo = seoData.seo;

      return {
        title: seo.meta_title,
        description: seo.meta_description,
        keywords: seo.meta_keywords,
        robots: {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
        openGraph: {
          title: seo.meta_title,
          description: seo.meta_description,
          images: [
            {
              url: seo.meta_image,
              width: 1200,
              height: 630,
              alt: seo.meta_title,
            },
          ],
          type: 'website',
          url: seo.canonical,
        },
        twitter: {
          card: 'summary_large_image',
          title: seo.meta_title,
          description: seo.meta_description,
          images: [seo.meta_image],
        },
        alternates: {
          canonical: seo.canonical,
        },
      };
    }
    
    // Fallback metadata if SEO data is not available
    return {
      title: "Blogs | Balanced Score Training Center",
      description: "Read our latest blogs and articles about professional training, management, and development.",
      keywords: "training blogs, professional development, management articles",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return {
      title: "Blogs | Balanced Score Training Center",
      description: "Read our latest blogs and articles about professional training, management, and development.",
      keywords: "training blogs, professional development, management articles",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = getSearchParamInt(resolvedSearchParams, "page", 1);
  const blogsData = await getBlogs(currentPage);
  const blogs = blogsData?.blogs?.data || [];
  const pagination = blogsData?.blogs;

  return (
    <>
      <BlogsSchema />
      <Breadcrumb items={[{ label: "Blogs", href: "/blogs" }]} />
      <HeroBanner
        title={hero.blogs.title}
        description={hero.blogs.description}
        image={hero.blogs.image}
        imageAlt={hero.blogs.imageAlt}
        imageTitle={hero.blogs.imageTitle}
      />
      <section className="container-main">
        {blogs.length > 0 && (
          <>
            <BlogsGrid blogs={blogs} />
            {pagination && pagination.last_page > 1 && (
              <Pagination pagination={pagination} currentPage={currentPage} />
            )}
          </>
        )}
      </section>
    </>
  );
}
