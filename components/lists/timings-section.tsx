"use client";

import { useState, useMemo } from "react";
import TimingsGrid from "./timings-grid";
import TimingsFilters from "@/components/ui/timings-filters";

interface TimingsSectionProps {
  timings: CourseTiming[];
  course: CourseDetail;
}

export default function TimingsSection({ timings, course }: TimingsSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

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

  // Filter timings based on selected filters
  const filteredTimings = useMemo(() => {
    return timings.filter((timing) => {
      const cityMatch = !selectedCity || timing.city?.title === selectedCity;
      const monthMatch =
        !selectedMonth ||
        (() => {
          const date = new Date(timing.start_date);
          const monthName = date.toLocaleString("en-US", { month: "long" });
          return monthName === selectedMonth;
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

