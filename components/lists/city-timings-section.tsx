"use client";

import { useState, useMemo } from "react";
import TimingsGrid from "./timings-grid";
import CityTimingsFilters from "@/components/ui/city-timings-filters";

interface CityTimingsSectionProps {
  timings: CourseTiming[];
  course: CourseDetail;
}

export default function CityTimingsSection({ timings, course }: CityTimingsSectionProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  // Get unique months from timings
  const months = useMemo(() => {
    const monthSet = new Set<string>();
    timings.forEach((timing) => {
      const date = new Date(timing.start_date);
      const monthName = date.toLocaleString("en-US", { month: "long" });
      monthSet.add(monthName);
    });
    return Array.from(monthSet).sort((a, b) => {
      const monthOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
  }, [timings]);

  // Filter timings based on selected month
  const filteredTimings = useMemo(() => {
    return timings.filter((timing) => {
      const monthMatch =
        !selectedMonth ||
        (() => {
          const date = new Date(timing.start_date);
          const monthName = date.toLocaleString("en-US", { month: "long" });
          return monthName === selectedMonth;
        })();
      return monthMatch;
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

