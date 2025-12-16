"use client";

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

interface SearchCourseCardProps {
  course: {
    id: number;
    title: string;
    slug: string;
    category_title?: string;
    category_slug?: string;
  };
}

export default function SearchCourseCard({ course }: SearchCourseCardProps) {
  // Safely handle undefined/null title
  const title = course.title || "";
  
  return (
    <Link
      href={`/training-course/${course.slug}`}
      className="course-item"
      data-title={title.toLowerCase()}
    >
      <p>{title}</p>
      <span>
        <HiChevronLeft color="#afafaf" fontSize={16} />
      </span>
    </Link>
  );
}

