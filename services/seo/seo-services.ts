import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/query-keys";
import { cacheService } from "@/lib/cache-service";
import { AxiosError } from "axios";

export interface SeoData {
  id: number;
  section: string;
  canonical: string;
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  meta_image: string;
  created_at: string;
  updated_at: string;
}

export interface SeoApiResponse {
  status: string;
  seo: SeoData;
}

/**
 * Service to fetch SEO data for a specific section
 * Returns null if SEO data doesn't exist (404), throws for other errors
 */
export const getSeoData = async (section: string): Promise<SeoApiResponse | null> => {
  try {
    const endpoint = API_ENDPOINTS.SEO(section);
    
    // Check cache first
    const cached = cacheService.get<SeoApiResponse>(endpoint);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get<SeoApiResponse>(endpoint);

    if (response.data.status === "success" && response.data.seo) {
      // Cache the result
      cacheService.set(endpoint, response.data);
      return response.data;
    }

    throw new Error("Failed to fetch SEO data");
  } catch (error) {
    // Handle 404 errors silently (expected when SEO data doesn't exist)
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    
    // Log other errors but still throw
    console.error(`Error fetching SEO data for section ${section}:`, error);
    throw error;
  }
};

