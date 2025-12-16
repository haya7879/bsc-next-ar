"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCategoryCityCourses } from "./category-city-services";
import { QUERY_KEYS } from "@/constants/query-keys";

/**
 * Hook to fetch courses by category and city
 */
export const useCategoryCityCourses = (
  citySlug: string,
  categorySlug: string
): UseQueryResult<CategoryCityResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORY_CITY(citySlug, categorySlug),
    queryFn: () => getCategoryCityCourses(citySlug, categorySlug),
    enabled: !!citySlug && !!categorySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

