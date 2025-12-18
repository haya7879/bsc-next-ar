export type MonthSelectOption = { value: string; label: string };

// Arabic month names (Levantine): شباط، آذار، نيسان...
export const MONTH_NAMES_AR = [
  "كانون الثاني",
  "شباط",
  "آذار",
  "نيسان",
  "أيار",
  "حزيران",
  "تموز",
  "آب",
  "أيلول",
  "تشرين الأول",
  "تشرين الثاني",
  "كانون الأول",
] as const;

/**
 * Returns month options for:
 * - the remaining months of the current year (starting from the current month)
 * - plus all months of the next year
 *
 * - Values stay as "1".."12" (month number), to preserve existing API contract.
 * - Labels include the year for clarity (e.g., Oct 2025 ... Dec 2025, Jan 2026 ... Dec 2026).
 *   Note: the API filter still sends only the month number, so selecting "Jan 2026" and
 *   "Jan 2025" (possible when current month is January) will behave the same.
 */
export function getRollingMonthOptions(now: Date = new Date()): MonthSelectOption[] {
  const currentMonthIndex = now.getMonth(); // 0..11
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;

  const options: MonthSelectOption[] = [];
  // Remaining months of current year (including current month)
  for (let monthIndex = currentMonthIndex; monthIndex < 12; monthIndex++) {
    options.push({
      value: String(monthIndex + 1), // "1".."12"
      label: `${MONTH_NAMES_AR[monthIndex]} ${currentYear}`,
    });
  }

  // All months of next year
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    options.push({
      value: String(monthIndex + 1), // "1".."12"
      label: `${MONTH_NAMES_AR[monthIndex]} ${nextYear}`,
    });
  }

  return options;
}


