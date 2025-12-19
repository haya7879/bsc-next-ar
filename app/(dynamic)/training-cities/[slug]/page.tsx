"use client";
import "@/styles/courses.css";
import "@/styles/course.css";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useCity } from "@/services/cities/cities-hooks";
import Breadcrumb from "@/components/ui/breadcrumb";
import HeroBanner from "@/components/ui/hero-banner";
import CoursesList from "@/components/lists/courses-list";
import SearchCourse from "@/components/ui/search-course";
import CategoriesGrid from "@/components/lists/categories-grid";
import CitySchema from "@/components/schema/city-schema";
import Loader from "@/components/ui/loader";

export default function CityPage() {
  const params = useParams();
  const citySlug = params?.slug as string;
  const [searchQuery, setSearchQuery] = useState("");
  const { data: { city, courses, categories } = {} } = useCity(citySlug || "");

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
      {city && courses && <CitySchema city={city} courses={courses} />}
      <Breadcrumb
        items={[
          { label: "المدن", href: "/training-cities" },
          { label: city?.title || "" },
        ]}
      />
      {city && (
        <HeroBanner
          title={city?.h1 || ""}
          description={city?.description || ""}
          image={city?.image}
          imageAlt={city?.image_alt}
          imageTitle={city?.image_title}
        />
      )}

      {courses ? (
        <div className="courses-section container-main">
          <div className="courses-section-head">
            <p>
              قائمة الدورات في
              {` ${city?.title || ""}`}
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
        </div>
      ) : (
        <Loader />
      )}

      {city?.additional_description && (
        <section className="container-main">
          <div className="course-content">
            <div
              className="group-1"
              dangerouslySetInnerHTML={{
                __html: city?.additional_description || "",
              }}
            />
          </div>
        </section>
      )}

      {categories && categories.length > 0 && (
        <section className="section-space-1">
          <div className="container-main section-title">
            <h2>التخصصات المتعلقة</h2>
          </div>
          <CategoriesGrid categories={categories} />
        </section>
      )}
    </>
  );
}
