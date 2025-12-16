"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUpcomingCourses } from "./upcoming-services";
import { QUERY_KEYS } from "@/constants/query-keys";

/**
 * Hook to fetch upcoming courses
 */
export const useUpcomingCourses = (): UseQueryResult<UpcomingCourse[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.UPCOMING_COURSES,
    queryFn: getUpcomingCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

