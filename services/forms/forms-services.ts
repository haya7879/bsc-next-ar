import apiClient from "@/lib/api-client";

export interface ContactFormData {
  full_name: string;
  phone_number: string;
  email: string;
  country: string;
  company: string;
  subject: string;
  message: string;
  recaptcha_token?: string;
}

export interface EnquireFormData {
  full_name: string;
  mobile: string;
  email: string;
  company: string;
  country: string;
  city: string;
  message: string;
  timing_id: string;
  course_slug?: string;
  recaptcha_token?: string;
}

export interface RegisterFormData {
  full_name: string;
  mobile_display?: string; // UI only, not sent to API
  mobile: string;
  email: string;
  job_title: string;
  company_name: string;
  country: string;
  city: string;
  responsible_name: string;
  responsible_mobile_display?: string; // UI only, not sent to API
  responsible_mobile: string;
  responsible_email: string;
  responsible_position: string;
  timing_id: string | number;
  recaptcha_token?: string;
}

export interface JoinTeamFormData {
  full_name: string;
  phone_number: string;
  email: string;
  country: string;
  category_id: string;
  cv: File;
  recaptcha_token?: string;
}

export interface DownloadFormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  timing_id: number;
  recaptcha_token?: string;
}

export interface FormResponse {
  message?: string;
  success?: boolean;
  data?: any;
}

export const formsServices = {
  /**
   * Send contact form request
   */
  contact: async (data: ContactFormData): Promise<FormResponse> => {
    const response = await apiClient.post<FormResponse>(
      "/forms/contact",
      data
    );
    return response.data;
  },

  /**
   * Send enquire form request
   */
  enquire: async (data: EnquireFormData): Promise<FormResponse> => {
    const response = await apiClient.post<FormResponse>(
      "/forms/inquire",
      data
    );
    return response.data;
  },

  /**
   * Send register form request
   */
  register: async (data: RegisterFormData): Promise<FormResponse> => {
    // Transform data to match API expected format
    const payload = {
      full_name: data.full_name,
      mobile: data.mobile,
      email: data.email,
      job_title: data.job_title,
      company_name: data.company_name,
      country: data.country,
      city: data.city,
      responsible_name: data.responsible_name,
      responsible_mobile: data.responsible_mobile,
      responsible_email: data.responsible_email,
      responsible_position: data.responsible_position,
      timing_id: typeof data.timing_id === "string" ? parseInt(data.timing_id, 10) : data.timing_id,
      ...(data.recaptcha_token && { recaptcha_token: data.recaptcha_token }),
    };

    const response = await apiClient.post<FormResponse>(
      "/forms/register",
      payload
    );
    return response.data;
  },

  /**
   * Send join-team form request with file upload
   */
  joinTeam: async (data: JoinTeamFormData): Promise<FormResponse> => {
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("category_id", data.category_id);
    formData.append("cv", data.cv);
    if (data.recaptcha_token) {
      formData.append("recaptcha_token", data.recaptcha_token);
    }

    const response = await apiClient.post<FormResponse>(
      "/forms/join-to-team",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Send download form request
   */
  download: async (data: DownloadFormData): Promise<FormResponse> => {
    const response = await apiClient.post<FormResponse>(
      "/forms/download",
      data
    );
    return response.data;
  },
};

