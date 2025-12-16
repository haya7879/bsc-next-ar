"use client";

import CustomSelect from "@/components/ui/custom-select";
import { FaArrowsRotate } from "react-icons/fa6";

interface CityTimingsFiltersProps {
  months: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onClear: () => void;
}

export default function CityTimingsFilters({
  months,
  selectedMonth,
  onMonthChange,
  onClear,
}: CityTimingsFiltersProps) {
  return (
    <div className="timings-filters">
      <div className="flex items-center gap-2!">
        <CustomSelect
          value={selectedMonth}
          onValueChange={(value) => onMonthChange(value as string)}
          placeholder="Select Month"
          options={months.map((month) => ({
            value: month,
            label: month,
          }))}
          className="filter-select"
          size="default"
          variant="outline"
          fullWidth={false}
          suppressHydrationWarning={true}
        />
        <button className="clear-filters-btn" onClick={onClear} suppressHydrationWarning={true}>
          <FaArrowsRotate />
          Reset
        </button>
      </div>
    </div>
  );
}

