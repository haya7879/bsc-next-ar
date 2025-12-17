"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSearchCourses } from "@/services/search/search-hooks";
import { useCategories } from "@/services/categories/categories-hooks";
import { useCities } from "@/services/cities/cities-hooks";
import CustomSelect from "@/components/ui/custom-select";
import Breadcrumb from "@/components/ui/breadcrumb";
import ErrorState from "@/components/ui/error-state";
import EmptyState from "@/components/ui/empty-state";
import LoadingState from "@/components/ui/loading-state";
import SearchTimingCard from "@/components/cards/search-timing-card";
import SearchCourseCard from "@/components/cards/search-course-card";
import { FaArrowsRotate } from "react-icons/fa6";
import "@/styles/courses.css";

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

// Months options
const months = [
  { value: "1", label: "كانون الثاني" },
  { value: "2", label: "شباط" },
  { value: "3", label: "آذار" },
  { value: "4", label: "نيسان" },
  { value: "5", label: "أيار" },
  { value: "6", label: "حزيران" },
  { value: "7", label: "تموز" },
  { value: "8", label: "آب" },
  { value: "9", label: "أيلول" },
  { value: "10", label: "تشرين الأول" },
  { value: "11", label: "تشرين الثاني" },
  { value: "12", label: "كانون الأول" },
];

// Duration options
const durations = [
  { value: "5", label: "5 ايام" },
  { value: "10", label: "10 ايام" },
];

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories = [] } = useCategories();
  const { data: cities = [] } = useCities();

  // Get filters from URL params (single source of truth)
  const filters = useMemo(() => {
    const category_slug = searchParams?.get("category_slug") || "";
    const duration = searchParams?.get("duration") || "";
    const city_slug = searchParams?.get("city_slug") || "";
    const month = searchParams?.get("month") || "";

    return {
      category_slug: category_slug || undefined,
      duration: duration || undefined,
      city_slug: city_slug || undefined,
      month: month || undefined,
    };
  }, [searchParams]);

  // Get current values from URL params for form state
  const currentCategory = searchParams?.get("category_slug") || "";
  const currentCity = searchParams?.get("city_slug") || "";
  const currentMonth = searchParams?.get("month") || "";
  const currentDuration = searchParams?.get("duration") || "";

  // Handler to perform search
  const performSearch = useCallback(
    (newFilters: {
      category?: string | number;
      city?: string | number;
      month?: string | number;
      duration?: string | number;
    }) => {
      const params = new URLSearchParams();

      if (newFilters.category)
        params.append("category_slug", String(newFilters.category));
      if (newFilters.city) params.append("city_slug", String(newFilters.city));
      if (newFilters.month) params.append("month", String(newFilters.month));
      if (newFilters.duration)
        params.append("duration", String(newFilters.duration));

      const queryString = params.toString();
      router.push(`/search${queryString ? `?${queryString}` : ""}`);
    },
    [router]
  );

  // Handlers for select changes
  const handleCategoryChange = useCallback(
    (value: string | number) => {
      performSearch({
        category: value,
        city: currentCity,
        month: currentMonth,
        duration: currentDuration,
      });
    },
    [performSearch, currentCity, currentMonth, currentDuration]
  );

  const handleCityChange = useCallback(
    (value: string | number) => {
      performSearch({
        category: currentCategory,
        city: value,
        month: currentMonth,
        duration: currentDuration,
      });
    },
    [performSearch, currentCategory, currentMonth, currentDuration]
  );

  const handleMonthChange = useCallback(
    (value: string | number) => {
      performSearch({
        category: currentCategory,
        city: currentCity,
        month: value,
        duration: currentDuration,
      });
    },
    [performSearch, currentCategory, currentCity, currentDuration]
  );

  const handleDurationChange = useCallback(
    (value: string | number) => {
      performSearch({
        category: currentCategory,
        city: currentCity,
        month: currentMonth,
        duration: value,
      });
    },
    [performSearch, currentCategory, currentCity, currentMonth]
  );

  // Check if there are any active filters
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined
  );

  const { data, isError, error, isLoading } = useSearchCourses(
    filters,
    hasActiveFilters
  );

  const handleClear = useCallback(() => {
    router.push("/");
  }, [router]);

  // Convert categories to select options
  const categoryOptions = categories.map((cat) => ({
    value: cat.slug || "",
    label: cat.title || "",
  }));

  // Convert cities to select options
  const cityOptions = cities.map((city) => ({
    value: city.slug || "",
    label: city.title || "",
  }));

  // Determine if we should show courses list or timings cards based on API response type
  const showCoursesList = data?.type === "courses";
  const showTimingsCards = data?.type === "timings";

  return (
    <>
      <Breadcrumb items={[{ label: "نتائج البحث", href: "/search" }]} />

      <section className="container-main md:py-10! py-8!">
        {/* Search Form */}
        <div className="flex items-center flex-wrap md:gap-4 gap-2 mb-10">
          {/* Category Select */}
          <div style={{ flex: "1", minWidth: "200px" }}>
            <CustomSelect
              value={currentCategory}
              onValueChange={handleCategoryChange}
              placeholder="Select Category"
              options={categoryOptions}
              className=""
              size="default"
              variant="outline"
              fullWidth={true}
            />
          </div>

          {/* City Select */}
          <div style={{ flex: "1", minWidth: "200px" }}>
            <CustomSelect
              value={currentCity}
              onValueChange={handleCityChange}
              placeholder="Select city"
              options={cityOptions}
              className=""
              size="default"
              variant="outline"
              fullWidth={true}
            />
          </div>

          {/* Month Select */}
          <div style={{ flex: "1", minWidth: "200px" }}>
            <CustomSelect
              value={currentMonth}
              onValueChange={handleMonthChange}
              placeholder="Select month"
              options={months}
              className=""
              size="default"
              variant="outline"
              fullWidth={true}
            />
          </div>

          {/* Duration Select */}
          <div style={{ flex: "1", minWidth: "200px" }}>
            <CustomSelect
              value={currentDuration}
              onValueChange={handleDurationChange}
              placeholder="Select duration"
              options={durations}
              className=""
              size="default"
              variant="outline"
              fullWidth={true}
            />
          </div>

          {/* Clear Button */}
          <button
            suppressHydrationWarning
            type="button"
            onClick={handleClear}
            className="clear-btn"
            style={{ whiteSpace: "nowrap" }}
          >
            <FaArrowsRotate className="clear-icon" />
            مسح
          </button>
        </div>

        {isLoading && (
          <LoadingState
            title="جاري البحث..."
            message="يرجى الإنتظار أثناء البحث عن الدورات"
          />
        )}

        {isError && !isLoading && (
          <ErrorState
            title="خطأ في البحث"
            message={error?.message || "فشل البحث عن الدورات"}
          />
        )}

        {!isLoading && !isError && hasActiveFilters && data && (
          <div className="search-results">
            {/* Results Header */}
            <div className="search-results-header">
              <h1>نتائج البحث</h1>
              {data.count > 0 && (
                <p className="results-count">
                  يوجد {data.count} {data.count === 1 ? "نتيجة" : "نتائج"}
                </p>
              )}
            </div>

            {/* Active Filters */}
            {/* {Object.keys(data.filters).length > 0 && (
              <div className="active-filters">
                <h3>Active Filters:</h3>
                <div className="filters-tags">
                  {data.filters.keyword && (
                    <span className="filter-tag">Keyword: {data.filters.keyword}</span>
                  )}
                  {data.filters.category_slug && (
                    <span className="filter-tag">Category: {data.filters.category_slug}</span>
                  )}
                  {data.filters.duration && (
                    <span className="filter-tag">Duration: {data.filters.duration} days</span>
                  )}
                  {data.filters.city_slug && (
                    <span className="filter-tag">City: {data.filters.city_slug}</span>
                  )}
                  {data.filters.month && (
                    <span className="filter-tag">Month: {data.filters.month}</span>
                  )}
                </div>
              </div>
            )} */}

            {/* Results Content */}
            {data.count === 0 || (data.data && data.data.length === 0) ? (
              <EmptyState
                title="لم يتم العثور على نتائج"
                message="لا يوجد نتائج. يرجى تعديل البحث الخاص بك"
              />
            ) : showCoursesList ? (
              // Show courses list when type is "courses"
              <div className="courses-section">
                <div className="courses-items">
                  {(data.data as SearchCourse[])
                    .filter((item) => item.title && item.slug)
                    .map((item) => (
                      <SearchCourseCard
                        key={item.id}
                        course={{
                          id: item.id,
                          title: item.title || "",
                          slug: item.slug,
                          category_title: item.category?.title,
                          category_slug: item.category?.slug,
                        }}
                      />
                    ))}
                </div>
              </div>
            ) : showTimingsCards ? (
              // Show timings cards grid when type is "timings"
              <div className="timings-grid">
                {(data.data as SearchTiming[]).map((timing) => (
                  <SearchTimingCard key={timing.id} timing={timing} />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container-main md:py-10! py-8!">
        <LoadingState
          title="جاري التحميل..."
          message="يرجى الإنتظار"
        />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
