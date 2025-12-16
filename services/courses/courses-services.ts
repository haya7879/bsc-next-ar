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
 * Service to fetch course details
 */
export const getCourseDetails = async (
  slug: string
): Promise<CourseDetailResponse> => {
  try {
    const endpoint = API_ENDPOINTS.COURSE(slug);

    // Check cache first
    const cached = cacheService.get<CourseDetailResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CourseDetailResponse>(endpoint);

    // Check if response has the expected structure
    if (
      !response.data ||
      response.data.status !== "success" ||
      !response.data.course
    ) {
      throw new Error("Invalid response format or course not found");
    }

    const courseData = response.data;

    // Cache the result
    cacheService.set(endpoint, courseData);
    return courseData;
  } catch (error) {
    console.error(`Error fetching course details for ${slug}:`, error);
    throw error;
  }
};

/**
 * Service to fetch city course details
 */
export const getCityCourseDetails = async (
  courseSlug: string,
  citySlug: string
): Promise<CityCourseResponse> => {
  try {
    const endpoint = API_ENDPOINTS.CITY_COURSE(courseSlug, citySlug);

    // Check cache first
    const cached = cacheService.get<CityCourseResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<CityCourseResponse>(endpoint);

    if (
      response.data &&
      response.data.status === "success" &&
      response.data.course
    ) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error("Failed to fetch city course details");
  } catch (error) {
    console.error(
      `Error fetching city course details for ${courseSlug}/${citySlug}:`,
      error
    );
    throw error;
  }
};
