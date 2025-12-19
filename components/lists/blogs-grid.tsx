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
          className="card-blogs clickable-card"
        >
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.image_alt || blog.title}
              className="card-blog-img"
              width={400}
              height={300}
            />
          )}
          <div className="card-blog-content">
            <h3>{blog.title}</h3>
            {blog.description && (
              <div className="card-blog-desc">
                <p>
                  {truncateDescription(blog.description, 150)}
                  <Link 
                    href={`/blogs/${blog.slug}`} 
                    className="text-more"
                  >
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
                <img src="/icons/calender.svg" alt="Calendar" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
