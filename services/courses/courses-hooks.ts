"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCourseDetails } from "./courses-services";
import { QUERY_KEYS } from "@/constants/query-keys";

/**
 * Hook to fetch course details by slug
 */
export const useCourseDetails = (
  slug: string
): UseQueryResult<CourseDetailResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.COURSE(slug),
    queryFn: () => getCourseDetails(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

