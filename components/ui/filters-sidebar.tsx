"use client";

import React from "react";
import { IoClose, IoCheckmark } from "react-icons/io5";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";
import { cn } from "@/lib/utils";

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cities: string[];
  months: string[];
  selectedCity: string;
  selectedMonth: string;
  onCityChange: (city: string) => void;
  onMonthChange: (month: string) => void;
  onClear: () => void;
}

export default function FiltersSidebar({
  isOpen,
  onClose,
  cities,
  months,
  selectedCity,
  selectedMonth,
  onCityChange,
  onMonthChange,
  onClear,
}: FiltersSidebarProps) {
  const cityOptions: SelectOption[] = cities.map((city) => ({
    value: city,
    label: city,
  }));

  const monthOptions: SelectOption[] = months.map((month) => ({
    value: month,
    label: `${month} 2026`,
  }));

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

  const sortedMonths = [...months].sort(
    (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:shadow-none lg:z-auto"
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Filters b</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close filters"
            >
              <IoClose className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Dropdowns */}
          <div className="space-y-4 mb-6">
            <CustomSelect
              value={selectedCity}
              onValueChange={(value) => onCityChange(value as string)}
              placeholder="Select City"
              options={cityOptions}
              size="default"
              variant="outline"
              fullWidth
            />
            <CustomSelect
              value={selectedMonth}
              onValueChange={(value) => onMonthChange(value as string)}
              placeholder="Select Month"
              options={monthOptions}
              size="default"
              variant="outline"
              fullWidth
            />
            <button
              onClick={onClear}
              className="w-full px-4 py-2 bg-white text-gray-700 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Months Grid */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Months</h3>
            <div className="grid grid-cols-3 gap-2">
              {sortedMonths.map((month) => {
                const isSelected = selectedMonth === month;
                return (
                  <button
                    key={month}
                    onClick={() => onMonthChange(isSelected ? "" : month)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      "border-2 flex items-center justify-center gap-1",
                      isSelected
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    )}
                  >
                    {isSelected && <IoCheckmark className="h-4 w-4" />}
                    <span>{month} 2026</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cities Grid */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Cities</h3>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city) => {
                const isSelected = selectedCity === city;
                return (
                  <button
                    key={city}
                    onClick={() => onCityChange(isSelected ? "" : city)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      "border-2 flex items-center justify-center gap-1",
                      isSelected
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    )}
                  >
                    {isSelected && <IoCheckmark className="h-4 w-4" />}
                    <span>{city}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

