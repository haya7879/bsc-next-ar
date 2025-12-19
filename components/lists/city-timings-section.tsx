"use client";

import { useState, useMemo } from "react";
import TimingsGrid from "./timings-grid";
import CityTimingsFilters from "@/components/ui/city-timings-filters";
import { getRollingMonthOptions } from "@/lib/rolling-month-options";

interface CityTimingsSectionProps {
  timings: CourseTiming[];
  course: CourseDetail;
}

export default function CityTimingsSection({
  timings,
  course,
}: CityTimingsSectionProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const months = getRollingMonthOptions();

  // Filter timings based on selected month
  const filteredTimings = useMemo(() => {
    return timings.filter((timing) => {
      if (!selectedMonth) return true;
      
      const date = new Date(timing.start_date);
      const monthNumber = String(date.getMonth() + 1); // 1-12
      return monthNumber === selectedMonth;
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
