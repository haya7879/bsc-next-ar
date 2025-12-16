"use client";
import { useParams } from "next/navigation";
import { useCategoryCityCourses } from "@/services/category-city/category-city-hooks";
import Breadcrumb from "@/components/ui/breadcrumb";
import HeroBanner from "@/components/ui/hero-banner";
import ErrorState from "@/components/ui/error-state";
import "@/styles/courses.css";
import "@/styles/course.css";
import CoursesList from "@/components/lists/courses-list";

export default function CoursesCategoryCityPage() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const citySlug = params?.citySlug as string;

  const { data, isError, error } = useCategoryCityCourses(
    citySlug || "",
    categorySlug || ""
  );

  if (isError || !data) {
    return (
      <>
        <Breadcrumb currentPage="Courses" />
        <ErrorState
          title="Error loading courses"
          message={error?.message || "Failed to load courses"}
        />
      </>
    );
  }

  const city = data.city;
  const category = data.category;
  const courses = data.courses || [];
  const seo = data.seo;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Categories", href: "/training-courses" },
          { label: category.title, href: `/training-courses/${category.slug}` },
          { label: city.title, href: `/training-cities/${city.slug}` },
        ]}
      />
      <HeroBanner
        title={seo.h1 || `${category.title} Courses in ${city.title}`}
        description={seo.description}
        imageAlt={`${category.title} in ${city.title}`}
        imageTitle={`${category.title} in ${city.title}`}
      />

      <section
        className="container-main"
        style={{ marginTop: "60px", marginBottom: "60px" }}
      >
        {/* Courses List */}
        <CoursesList courses={courses} />

        {/* SEO Description */}
        {seo.additional_description && (
          <div
            className="seo-description"
            dangerouslySetInnerHTML={{ __html: seo.additional_description }}
            style={{ marginBlock: "40px" }}
          />
        )}
      </section>
    </>
  );
}
