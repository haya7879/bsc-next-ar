import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/query-keys";
import { cacheService } from "@/lib/cache-service";

/**
 * Service to fetch blogs with pagination
 */
export const getBlogs = async (page: number = 1): Promise<BlogsResponse> => {
  try {
    const cacheKey = `${API_ENDPOINTS.BLOGS}?page=${page}`;
    
    // Check cache first
    const cached = cacheService.get<BlogsResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<BlogsResponse>(
      `${API_ENDPOINTS.BLOGS}?page=${page}`
    );

    if (response.data.status === "success" && response.data.blogs) {
      // Cache the result
      cacheService.set(cacheKey, response.data);
      return response.data;
    }

    throw new Error("Failed to fetch blogs");
  } catch (error) {
    console.error(`Error fetching blogs for page ${page}:`, error);
    throw error;
  }
};

/**
 * Service to fetch a single blog by slug
 */
export const getBlogBySlug = async (slug: string): Promise<BlogDetailResponse> => {
  try {
    const endpoint = API_ENDPOINTS.BLOG(slug);
    
    // Check cache first
    const cached = cacheService.get<BlogDetailResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<BlogDetailResponse>(endpoint);

    if (response.data.status === "success" && response.data.blog) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error("Failed to fetch blog");
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    throw error;
  }
};

