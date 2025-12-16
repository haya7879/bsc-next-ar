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
 * Service to fetch upcoming courses
 */
export const getUpcomingCourses = async (): Promise<UpcomingCourse[]> => {
  try {
    // Check cache first
    const cached = cacheService.get<UpcomingCourse[]>(
      API_ENDPOINTS.UPCOMING_COURSES
    );
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<UpcomingCourse[] | ApiResponse<UpcomingCourse[]>>(
      API_ENDPOINTS.UPCOMING_COURSES
    );

    // Handle both response formats: direct array or wrapped response
    let courses: UpcomingCourse[];
    if (Array.isArray(response.data)) {
      courses = response.data;
    } else {
      const apiResponse = response.data as ApiResponse<UpcomingCourse[]>;
      if (apiResponse.success && apiResponse.data) {
        courses = apiResponse.data;
      } else {
        throw new Error(apiResponse.message || "Failed to fetch upcoming courses");
      }
    }

    // Cache the result
    cacheService.set(API_ENDPOINTS.UPCOMING_COURSES, courses);
    return courses;
  } catch (error) {
    console.error("Error fetching upcoming courses:", error);
    throw error;
  }
};

