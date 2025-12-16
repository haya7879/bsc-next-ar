"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { searchCourses } from "./search-services";
import { QUERY_KEYS } from "@/constants/query-keys";

/**
 * Hook to search courses/timings
 */
export const useSearchCourses = (
  filters: SearchFilters,
  enabled: boolean = true
): UseQueryResult<SearchResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH(filters),
    queryFn: () => searchCourses(filters),
    enabled: enabled && Object.keys(filters).length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

