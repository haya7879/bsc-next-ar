import { API_ENDPOINTS } from "@/constants/query-keys";
import apiClient from "@/lib/api-client";
import { cacheService } from "@/lib/cache-service";

/**
 * API Response wrapper interface
 */
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * Sitemap API Response interface
 */
export interface SitemapApiResponse {
  categories: Category[];
  cities: City[];
  city_category_seos?: {
    [categoryId: string]: Array<{
      city: City;
      category: Category;
    }>;
  };
  city_course_seos?: {
    [courseId: string]: Array<{
      city: City;
      course: Course;
    }>;
  };
}

/**
 * Sitemap service function
 */
export const getSitemapData = async (): Promise<SitemapApiResponse> => {
  try {
    // Check cache first
    const cached = cacheService.get<SitemapApiResponse>(API_ENDPOINTS.SITEMAP);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<SitemapApiResponse | ApiResponse<SitemapApiResponse>>(
      API_ENDPOINTS.SITEMAP
    );

    // Handle both response formats: direct object or wrapped response
    let sitemapData: SitemapApiResponse;
    if (response.data && 'categories' in response.data && 'cities' in response.data) {
      // Direct response format
      sitemapData = response.data as SitemapApiResponse;
    } else {
      // Wrapped response format
      const apiResponse = response.data as ApiResponse<SitemapApiResponse>;
      if (apiResponse.success && apiResponse.data) {
        sitemapData = apiResponse.data;
      } else {
        throw new Error(apiResponse.message || "Failed to fetch sitemap data");
      }
    }

    // Cache the result
    cacheService.set(API_ENDPOINTS.SITEMAP, sitemapData);
    return sitemapData;
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    throw error;
  }
};

