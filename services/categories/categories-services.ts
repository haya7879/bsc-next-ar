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
 * Category API Response interface
 */
interface CategoryApiResponse {
  status: string;
  category: Category;
  count: number;
  courses: Course[];
}

/**
 * Service to fetch all categories
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Check cache first
    const cached = cacheService.get<Category[]>(API_ENDPOINTS.CATEGORIES);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<Category[] | ApiResponse<Category[]>>(
      API_ENDPOINTS.CATEGORIES
    );

    // Handle both response formats: direct array or wrapped response
    let categories: Category[];
    if (Array.isArray(response.data)) {
      categories = response.data;
    } else {
      const apiResponse = response.data as ApiResponse<Category[]>;
      if (apiResponse.success && apiResponse.data) {
        categories = apiResponse.data;
      } else {
        throw new Error(apiResponse.message || "Failed to fetch categories");
      }
    }

    // Cache the result
    cacheService.set(API_ENDPOINTS.CATEGORIES, categories);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Service to fetch a single category by slug with courses
 */
export const getCategoryBySlug = async (
  slug: string
): Promise<{ category: Category | null; courses: Course[] }> => {
  try {
    const cacheKey = `${API_ENDPOINTS.CATEGORIES}/${slug}`;
    
    // Check cache first
    const cached = cacheService.get<{ category: Category; courses: Course[] }>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CategoryApiResponse>(
      API_ENDPOINTS.CATEGORY(slug)
    );

    if (response.data.status === "success" && response.data.category) {
      const category = {
        ...response.data.category,
        description2: response.data.category.additional_description || response.data.category.description,
      };
      
      const result = {
        category,
        courses: response.data.courses || [],
      };

      // Cache the result
      cacheService.set(cacheKey, result);
      return result;
    }

    throw new Error("Failed to fetch category");
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    throw error;
  }
};

