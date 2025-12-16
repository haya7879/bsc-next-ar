/**
 * Query keys for React Query
 */
export const QUERY_KEYS = {
  CATEGORIES: ['categories'] as const,
  CATEGORY: (slug: string) => ['categories', slug] as const,
  CATEGORY_CITY: (citySlug: string, categorySlug: string) => ['categories', citySlug, categorySlug] as const,
  COURSES: ['courses'] as const,
  COURSE: (slug: string) => ['courses', slug] as const,
  CITIES: ['cities'] as const,
  CITY: (slug: string) => ['cities', slug] as const,
  UPCOMING_COURSES: ['upcoming-courses'] as const,
  SEARCH: (filters: SearchFilters) => ['search', filters] as const,
  BLOGS: ['blogs'] as const,
  BLOG: (slug: string) => ['blogs', slug] as const,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: '/training-courses',
  CATEGORY: (slug: string) => `/training-courses/${slug}`,
  CATEGORY_CITY: (citySlug: string, categorySlug: string) => `/training-courses/${citySlug}/${categorySlug}`,
  COURSES: '/courses',
  COURSE: (slug: string) => `/training-course/${slug}`,
  CITY_COURSE: (courseSlug: string, citySlug: string) => `/training-course/${courseSlug}/${citySlug}`,
  CITIES: '/training-cities',
  CITY: (slug: string) => `/training-cities/${slug}`,
  UPCOMING_COURSES: '/get-upcoming-courses',
  SEARCH: '/search-home',
  BLOGS: '/blogs',
  BLOG: (slug: string) => `/blogs/${slug}`,
  SITEMAP: '/sitemap',
  SEO: (section: string) => `/seo/${section}`,
} as const;