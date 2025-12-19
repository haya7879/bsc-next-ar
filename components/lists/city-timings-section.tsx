"use client";

import { useState, useMemo } from "react";
import TimingsGrid from "./timings-grid";
import CityTimingsFilters from "@/components/ui/city-timings-filters";
import { MONTH_NAMES_AR } from "@/lib/rolling-month-options";

interface CityTimingsSectionProps {
  timings: CourseTiming[];
  course: CourseDetail;
}

export default function CityTimingsSection({
  timings,
  course,
}: CityTimingsSectionProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  // Get unique months from timings
  const months = useMemo(() => {
    const monthSet = new Set<string>();
    timings.forEach((timing) => {
      const date = new Date(timing.start_date);
      const monthIndex = date.getMonth(); // 0-11
      const monthName = MONTH_NAMES_AR[monthIndex];
      monthSet.add(monthName);
    });
    return Array.from(monthSet).sort((a, b) => {
      return (MONTH_NAMES_AR as readonly string[]).indexOf(a) - (MONTH_NAMES_AR as readonly string[]).indexOf(b);
    });
  }, [timings]);

  // Filter timings based on selected month
  const filteredTimings = useMemo(() => {
    return timings.filter((timing) => {
      if (!selectedMonth) return true;
      const date = new Date(timing.start_date);
      const monthIndex = date.getMonth(); // 0-11
      const monthName = MONTH_NAMES_AR[monthIndex];
      return monthName === selectedMonth;
    });
  }, [timings, selectedMonth]);

  const handleClearFilters = () => {
    setSelectedMonth("");
  };

  if (timings.length === 0) {
    return null;
  }

  return (
    <div className="course-timings-section">
      <CityTimingsFilters
        months={months}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onClear={handleClearFilters}
      />
      <TimingsGrid timings={filteredTimings} course={course} />
    </div>
  );
}
