"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBlogs, getBlogBySlug } from "./blogs-services";
import { QUERY_KEYS } from "@/constants/query-keys";

/**
 * Hook to fetch blogs with pagination
 */
export const useBlogs = (page: number = 1): UseQueryResult<BlogsResponse, Error> => {
  return useQuery({
    queryKey: [...QUERY_KEYS.BLOGS, page],
    queryFn: () => getBlogs(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch a single blog by slug
 */
export const useBlog = (slug: string): UseQueryResult<BlogDetailResponse, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.BLOG(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

