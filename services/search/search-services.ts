import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/query-keys";
import { cacheService } from "@/lib/cache-service";

/**
 * Service to search courses/timings
 */
export const searchCourses = async (
  filters: SearchFilters
): Promise<SearchResponse> => {
  try {
    // Build query string
    const params = new URLSearchParams();
    if (filters.keyword) params.append("keyword", filters.keyword);
    if (filters.category_slug) params.append("category_slug", filters.category_slug);
    if (filters.duration) params.append("duration", filters.duration);
    if (filters.city_slug) params.append("city_slug", filters.city_slug);
    if (filters.month) params.append("month", filters.month);

    const endpoint = `${API_ENDPOINTS.SEARCH}?${params.toString()}`;

    // Check cache first
    const cached = cacheService.get<SearchResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<SearchResponse>(endpoint);

    if (response.data && response.data.status === "success") {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error("Failed to search courses");
  } catch (error) {
    console.error("Error searching courses:", error);
    throw error;
  }
};

