import { useMemo } from 'react';
import { MONTH_NAMES_AR } from '@/lib/rolling-month-options';

interface FormattedDate {
  day: string;
  month: string;
  year: string;
}

/**
 * Custom hook to format date strings
 * @param dateString - ISO date string (e.g., "2026-02-23T00:00:00.000000Z")
 * @returns Formatted date object with day, month, and year
 */
export const useFormatDate = (dateString: string): FormattedDate => {
  return useMemo(() => {
    const date = new Date(dateString);

    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: MONTH_NAMES_AR[date.getMonth()],
      year: date.getFullYear().toString(),
    };
  }, [dateString]);
};

