"use client";
import "@/styles/courses.css";
import "@/styles/course.css";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/ui/breadcrumb";
import HeroBanner from "@/components/ui/hero-banner";
import CoursesList from "@/components/lists/courses-list";
import SearchCourse from "@/components/ui/search-course";
import { useCategory } from "@/services/categories/categories-hooks";
import CategorySchema from "@/components/schema/category-schema";
import Loader from "@/components/ui/loader";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [searchQuery, setSearchQuery] = useState("");
  const { data: categoryData } = useCategory(slug || "");
  const category = categoryData?.category || null;
  const courses = categoryData?.courses || [];

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses || [];
    const query = searchQuery.toLowerCase();
    return (courses || []).filter((course) =>
      course.title.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {category && courses && (
        <CategorySchema category={category} courses={courses} />
      )}
      <Breadcrumb
        items={[
          { label: "التخصصات", href: "/training-courses" },
          { label: category?.title || "" },
        ]}
      />
      <HeroBanner
        title={category?.h1 || ""}
        description={category?.description || ""}
        image={category?.image}
        imageAlt={category?.image_alt}
        imageTitle={category?.image_title}
      />
      <div className="courses-section container-main">
        {courses && courses.length > 0 ? (
          <>
            <div className="courses-section-head">
              <p>
                قائمة الدورات في
                {` ${category?.title || ""}`}
              </p>
              <SearchCourse
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
              />
            </div>
            <CoursesList
              courses={filteredCourses}
              pathPrefix="/training-course"
            />
          </>
        ) : (
          <Loader />
        )}
      </div>

      {category?.additional_description && (
        <section className="container-main">
          <div className="course-content">
            <div
              className="group-1"
              dangerouslySetInnerHTML={{
                __html: category?.additional_description || "",
              }}
            />
          </div>
        </section>
      )}
    </>
  );
}
