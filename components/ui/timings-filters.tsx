"use client";

import CustomSelect from "@/components/ui/custom-select";
import type { MonthSelectOption } from "@/lib/rolling-month-options";
import { FaArrowsRotate } from "react-icons/fa6";
interface TimingsFiltersProps {
  cities: string[];
  months: MonthSelectOption[];
  selectedCity: string;
  selectedMonth: string;
  onCityChange: (city: string) => void;
  onMonthChange: (month: string) => void;
  onClear: () => void;
}

export default function TimingsFilters({
  cities,
  months,
  selectedCity,
  selectedMonth,
  onCityChange,
  onMonthChange,
  onClear,
}: TimingsFiltersProps) {
  return (
    <div className="timings-filters">
      <div className="flex items-center gap-2!">
        <CustomSelect
          value={selectedCity}
          onValueChange={(value) => onCityChange(value as string)}
          placeholder="المدينة"
          options={cities.map((city) => ({
            value: city,
            label: city,
          }))}
          className="filter-select"
          size="default"
          variant="outline"
          fullWidth={false}
          suppressHydrationWarning={true}
        />
        <CustomSelect
          value={selectedMonth}
          onValueChange={(value) => onMonthChange(value as string)}
          placeholder="الشهر"
          // Use the human-readable label as the select value so filtering can match "Month Year"
          options={months.map((m) => ({ value: m.label, label: m.label }))}
          className="filter-select"
          size="default"
          variant="outline"
          fullWidth={false}
          suppressHydrationWarning={true}
        />
        <button className="clear-filters-btn" onClick={onClear} suppressHydrationWarning={true}>
          <FaArrowsRotate />
          مسح
        </button>
      </div>
    </div>
  );
}
