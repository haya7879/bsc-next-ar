"use client";

import Image from "next/image";
import { formatDate, truncateDescription, redirectTo } from "@/lib/helpers";
import Link from "next/link";

export default function BlogsGrid({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="blogs-container">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blogs/${blog.slug}`}
          className="card-blog"
        >
          {blog.image && (
            <div className="card-blog-img-wrapper">
              <Image
                src={blog.image}
                alt={blog.image_alt || blog.title}
                fill
                className="card-blog-img"
                loading="lazy"
                quality={75}
                sizes="(max-width: 768px) 300px, (max-width: 1024px) 500px, 600px"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div className="card-blog-content">
            <h5>{blog.title}</h5>
            {blog.description && (
              <div className="card-blog-desc">
                <p>
                  {truncateDescription(blog.description, 150)}
                  <Link href={`/blogs/${blog.slug}`} className="text-more">
                    اقرأ المزيد
                    <span className="sr-only"> عن {blog.title}</span>
                  </Link>
                </p>
              </div>
            )}
            <div className="card-blog-footer">
              <button
                className="clickable-card"
                onClick={(e) => {
                  e.preventDefault();
                  redirectTo(`/blogs/${blog.slug}`);
                }}
              >
                اقرأ المزيد
                <span className="sr-only"> عن {blog.title}</span>
              </button>
              <div className="card-blog-views">
                <span>{formatDate(blog.created_at)}</span>
                <img src="/icons/calender.svg" alt="Calendar" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
