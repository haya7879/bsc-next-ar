import { Metadata } from "next";
import "@/styles/blogs.css";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getBlogBySlug } from "@/services/blogs/blogs-services";
import { formatDate } from "@/lib/helpers";
import BlogSchema from "@/components/schema/blog-schema";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate comprehensive metadata for SEO optimization
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogData = await getBlogBySlug(slug);
  const blog = blogData?.blog;
  const baseUrl = "";

  if (!blog) {
    return {
      title: "المدونة غير موجودة | مركز الأداء المتوازن للتدريب",
      description: "تعذّر العثور على مقال المدونة المطلوب.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const publishedDate = new Date(blog.created_at).toISOString();
  const modifiedDate = new Date(blog.updated_at || blog.created_at).toISOString();
  const metaTitle = blog.meta_title || blog.title;
  const metaDescription = blog.meta_description || blog.description || "";
  const metaImage = blog.image || "";
  const canonical = blog.canonical || `${baseUrl}/blogs/${slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    authors: [{ name: "مركز الأداء المتوازن للتدريب" }],
    creator: "مركز الأداء المتوازن للتدريب",
    publisher: "مركز الأداء المتوازن للتدريب",
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
      type: "article",
      locale: "en_US",
      url: canonical,
      siteName: "مركز الأداء المتوازن للتدريب",
      title: metaTitle,
      description: metaDescription,
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ["مركز الأداء المتوازن للتدريب"],
      images: metaImage ? [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: blog.image_alt || blog.title,
          type: "image/jpeg",
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: metaImage ? [metaImage] : [],
    },
    alternates: {
      canonical: canonical,
    },
    other: {
      "article:published_time": publishedDate,
      "article:modified_time": modifiedDate,
      "article:author": "مركز الأداء المتوازن للتدريب",
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const blogData = await getBlogBySlug(resolvedParams.slug || "");

  const blog = blogData?.blog;
  return (
    <div>
      {blog && <BlogSchema blog={blog} />}
      <Breadcrumb
        items={[
          { label: "المدونات", href: "/blogs" },
          { label: blog.title },
        ]}
      />
      <div className="blog-details">
        <div className="container-main">
          <div className="blog-details-title">
            <h1>{blog.h1 || blog.title}</h1>
            <div className="date">
              <img src="/icons/calender.svg" alt="Calendar" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
      <section className="container-main">
        <div className="blog-content">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </section>
    </div>
  );
}

