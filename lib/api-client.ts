import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      
      switch (status) {
        case 401:
          // Unauthorized
          console.error("Unauthorized: Please check your credentials");
          break;
        case 403:
          // Forbidden
          console.error("Forbidden: You don't have permission");
          break;
        case 404:
          // Not found
          console.error("Resource not found");
          break;
        case 500:
          // Server error
          console.error("Server error occurred");
          break;
        default:
          console.error("An error occurred:", error.message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error: No response received");
    } else {
      // Something happened in setting up the request
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// Export API_URL for use in other files if needed
export { API_URL };

