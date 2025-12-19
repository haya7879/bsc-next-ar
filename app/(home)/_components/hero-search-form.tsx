"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/services/categories/categories-hooks";
import { useCities } from "@/services/cities/cities-hooks";
import CustomSelect from "@/components/ui/custom-select";
import { FaArrowsRotate, FaChevronLeft } from "react-icons/fa6";
import { getRollingMonthOptions } from "@/lib/rolling-month-options";

// Duration options
const durations = [
  { value: "5", label: "5 أيام" },
  { value: "10", label: "10 أيام" },
];

interface HeroSearchFormProps {
  onFormContentChange?: (hasContent: boolean) => void;
}

export default function HeroSearchForm({
  onFormContentChange,
}: HeroSearchFormProps) {
  const router = useRouter();
  const { data: categories = [] } = useCategories();
  const { data: cities = [] } = useCities();

  const [keyword, setKeyword] = useState("");
  const [categorySlug, setCategorySlug] = useState<string | number>("");
  const [citySlug, setCitySlug] = useState<string | number>("");
  const [month, setMonth] = useState<string | number>("");
  const [duration, setDuration] = useState<string | number>("");

  // Months options (rolling based on current month)
  const months = getRollingMonthOptions();

  // Check if form has content
  useEffect(() => {
    const hasContent = Boolean(
      keyword.trim() || categorySlug || citySlug || month || duration
    );
    onFormContentChange?.(hasContent);
  }, [keyword, categorySlug, citySlug, month, duration, onFormContentChange]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.append("keyword", keyword.trim());
    if (categorySlug) params.append("category_slug", String(categorySlug));
    if (citySlug) params.append("city_slug", String(citySlug));
    if (month) params.append("month", String(month));
    if (duration) params.append("duration", String(duration));

    const queryString = params.toString();
    if (queryString) {
      router.push(`/search?${queryString}`);
    }
  };

  const handleClear = () => {
    setKeyword("");
    setCategorySlug("");
    setCitySlug("");
    setMonth("");
    setDuration("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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

  return (
    <div className="hero-search-form">
      <div className="search-form-container">
        {/* Search Title */}
        <h2 className="search-form-title">ابحث عن دورتك</h2>
        {/* Keyword Input */}
        <div>
          <label htmlFor="hero-keyword-search" className="sr-only">
            كلمة مفتاحية
          </label>
          <input
            type="text"
            id="hero-keyword-search"
            aria-label="كلمة مفتاحية"
            placeholder="أدخل كلمة مفتاحية"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-full text-black"
            suppressHydrationWarning
          />
        </div>

        {/* Category Select */}
        <div className="">
          <CustomSelect
            value={categorySlug}
            onValueChange={setCategorySlug}
            placeholder="اختر التخصص"
            options={categoryOptions}
            className=""
            size="default"
            variant="outline"
            fullWidth={true}
          />
        </div>

        {/* City and Month Row */}
        <div className="search-row">
          <div className="">
            <CustomSelect
              value={citySlug}
              onValueChange={setCitySlug}
              placeholder="اختر المدينة"
              options={cityOptions}
              className=""
              size="default"
              variant="outline"
              fullWidth={true}
            />
          </div>
          <div className="">
            <CustomSelect
              value={month}
              onValueChange={setMonth}
              placeholder="اختر الشهر"
              options={months}
              className=""
              size="default"
              variant="outline"
              fullWidth={true}
            />
          </div>
        </div>

        {/* Duration */}
        <div className="">
          <CustomSelect
            value={duration}
            onValueChange={setDuration}
            placeholder="اختر المدة"
            options={durations}
            className=""
            size="default"
            variant="outline"
            fullWidth={true}
          />
        </div>

        {/* Buttons Row */}
        <div className="search-buttons">
          <button
            type="button"
            onClick={handleSearch}
            className="search-btn"
            suppressHydrationWarning
          >
            بحث
            <FaChevronLeft fontSize={12} className="search-icon" />
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="clear-btn"
            suppressHydrationWarning
          >
            <FaArrowsRotate className="clear-icon" />
            مسح
          </button>
        </div>
      </div>
    </div>
  );
}
