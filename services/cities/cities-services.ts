import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/query-keys";
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
 * City API Response interface
 */
interface CityApiResponse {
  status: string;
  city: City;
  count: number;
  courses: Course[];
  categories: Category[];
}

/**
 * Service to fetch all cities
 */
export const getCities = async (): Promise<City[]> => {
  try {
    // Check cache first
    const cached = cacheService.get<City[]>(API_ENDPOINTS.CITIES);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<City[] | ApiResponse<City[]>>(
      API_ENDPOINTS.CITIES
    );

    // Handle both response formats: direct array or wrapped response
    let cities: City[];
    if (Array.isArray(response.data)) {
      cities = response.data;
    } else {
      const apiResponse = response.data as ApiResponse<City[]>;
      if (apiResponse.success && apiResponse.data) {
        cities = apiResponse.data;
      } else {
        throw new Error(apiResponse.message || "Failed to fetch cities");
      }
    }

    // Cache the result
    cacheService.set(API_ENDPOINTS.CITIES, cities);
    return cities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

/**
 * Service to fetch a single city by slug with courses and categories
 */
export const getCityBySlug = async (
  slug: string
): Promise<{ city: City | null; courses: Course[]; categories: Category[] }> => {
  try {
    const cacheKey = `${API_ENDPOINTS.CITIES}/${slug}`;
    
    // Check cache first
    const cached = cacheService.get<{ city: City; courses: Course[]; categories: Category[] }>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CityApiResponse>(
      API_ENDPOINTS.CITY(slug)
    );

    if (response.data.status === "success" && response.data.city) {
      const city = {
        ...response.data.city,
        description2: response.data.city.additional_description || response.data.city.description,
      };
      
      const result = {
        city,
        courses: response.data.courses || [],
        categories: response.data.categories || [],
      };

      // Cache the result
      cacheService.set(cacheKey, result);
      return result;
    }

    throw new Error("Failed to fetch city");
  } catch (error) {
    console.error(`Error fetching city with slug ${slug}:`, error);
    throw error;
  }
};

