"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCategories, getCategoryBySlug } from "./categories-services";
import { QUERY_KEYS } from "@/constants/query-keys";

/**
 * Hook to fetch all categories
 */
export const useCategories = (): UseQueryResult<Category[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch a single category by slug with courses
 */
export const useCategory = (
  slug: string
): UseQueryResult<{ category: Category | null; courses: Course[] }, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORY(slug),
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

