/**
 * Get search params from URLSearchParams or searchParams prop
 * @param searchParams - URLSearchParams or searchParams object from Next.js
 * @param key - The key to get from search params
 * @param defaultValue - Default value if key is not found
 * @returns The value or default value
 */
export function getSearchParam(
  searchParams: URLSearchParams | { [key: string]: string | string[] | undefined } | null,
  key: string,
  defaultValue: string = ""
): string {
  if (!searchParams) return defaultValue;

  if (searchParams instanceof URLSearchParams) {
    return searchParams.get(key) || defaultValue;
  }

  // Type guard for object
  if (typeof searchParams === "object" && searchParams !== null) {
    const value = (searchParams as { [key: string]: string | string[] | undefined })[key];
    if (Array.isArray(value)) {
      return value[0] || defaultValue;
    }
    if (typeof value === "string") {
      return value || defaultValue;
    }
  }
  
  return defaultValue;
}

/**
 * Get integer search param with default value
 * @param searchParams - URLSearchParams or searchParams object from Next.js
 * @param key - The key to get from search params
 * @param defaultValue - Default integer value if key is not found
 * @returns The parsed integer or default value
 */
export function getSearchParamInt(
  searchParams: URLSearchParams | { [key: string]: string | string[] | undefined } | null,
  key: string,
  defaultValue: number = 0
): number {
  const value = getSearchParam(searchParams, key, "");
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Format date string to DD-MM-YYYY format
 * @param dateString - ISO date string (e.g., "2026-02-23T00:00:00.000000Z")
 * @returns Formatted date string in DD-MM-YYYY format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Truncate text to a maximum length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the text (default: 150)
 * @returns Truncated text with "..." appended if needed
 */
export function truncateDescription(
  text: string | null | undefined,
  maxLength: number = 150
): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Navigate to a URL (client-side navigation)
 * @param path - The path to navigate to
 */
export function redirectTo(path: string): void {
  if (typeof window !== "undefined") {
    window.location.href = path;
  }
}

