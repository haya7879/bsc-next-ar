import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/query-keys";
import { cacheService } from "@/lib/cache-service";

/**
 * Service to fetch courses by category and city
 */
export const getCategoryCityCourses = async (
  citySlug: string,
  categorySlug: string
): Promise<CategoryCityResponse> => {
  try {
    const endpoint = API_ENDPOINTS.CATEGORY_CITY(citySlug, categorySlug);

    // Check cache first
    const cached = cacheService.get<CategoryCityResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CategoryCityResponse>(endpoint);

    if (response.data && response.data.status === "success") {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error("Failed to fetch category city courses");
  } catch (error) {
    console.error(`Error fetching courses for ${citySlug}/${categorySlug}:`, error);
    throw error;
  }
};

