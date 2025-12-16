"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCities, getCityBySlug } from "./cities-services";
import { QUERY_KEYS } from "@/constants/query-keys";

/**
 * Hook to fetch all cities
 */
export const useCities = (): UseQueryResult<City[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CITIES,
    queryFn: getCities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch a single city by slug with courses and categories
 */
export const useCity = (
  slug: string
): UseQueryResult<{ city: City | null; courses: Course[]; categories: Category[] }, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.CITY(slug),
    queryFn: () => getCityBySlug(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

