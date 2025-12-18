"use client";

import { useState, useMemo } from "react";
import TimingsGrid from "./timings-grid";
import TimingsFilters from "@/components/ui/timings-filters";
import { getRollingMonthOptions, MONTH_NAMES_AR } from "@/lib/rolling-month-options";

interface TimingsSectionProps {
  timings: CourseTiming[];
  course: CourseDetail;
}

export default function TimingsSection({
  timings,
  course,
}: TimingsSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  // Months options (rolling based on current month)
  const months = getRollingMonthOptions();

  // Get unique cities and months from timings
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    timings.forEach((timing) => {
      if (timing.city?.title) {
        citySet.add(timing.city.title);
      }
    });
    return Array.from(citySet).sort();
  }, [timings]);

  // Filter timings based on selected filters
  const filteredTimings = useMemo(() => {
    return timings.filter((timing) => {
      const cityMatch = !selectedCity || timing.city?.title === selectedCity;
      const monthMatch =
        !selectedMonth ||
        (() => {
          const date = new Date(timing.start_date);
          const monthLabel = `${MONTH_NAMES_AR[date.getMonth()]} ${date.getFullYear()}`;
          return monthLabel === selectedMonth;
        })();
      return cityMatch && monthMatch;
    });
  }, [timings, selectedCity, selectedMonth]);

  const handleClearFilters = () => {
    setSelectedCity("");
    setSelectedMonth("");
  };

  if (timings.length === 0) {
    return null;
  }

  return (
    <div className="course-timings-section">
      <TimingsFilters
        cities={cities}
        months={months}
        selectedCity={selectedCity}
        selectedMonth={selectedMonth}
        onCityChange={setSelectedCity}
        onMonthChange={setSelectedMonth}
        onClear={handleClearFilters}
      />
      <TimingsGrid timings={filteredTimings} course={course} />
    </div>
  );
}
