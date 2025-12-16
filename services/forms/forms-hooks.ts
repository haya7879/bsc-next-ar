import { useMutation } from "@tanstack/react-query";
import {
  formsServices,
  ContactFormData,
  EnquireFormData,
  RegisterFormData,
  JoinTeamFormData,
  DownloadFormData,
  FormResponse,
} from "./forms-services";
import { toast } from "sonner";

/**
 * Hook for submitting contact form
 */
export const useContactForm = () => {
  return useMutation<FormResponse, Error, ContactFormData>({
    mutationFn: (data: ContactFormData) => formsServices.contact(data),
    onSuccess: (data) => {
      toast.success("Success!", {
        description: data.message || "Your message has been sent successfully.",
      });
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description: error.message || "An error occurred. Please try again.",
      });
      console.error(error);
    },
  });
};

/**
 * Hook for submitting enquire form
 */
export const useEnquireForm = () => {
  return useMutation<FormResponse, Error, EnquireFormData>({
    mutationFn: (data: EnquireFormData) => formsServices.enquire(data),
    onSuccess: (data) => {
      toast.success("Success!", {
        description:
          data.message || "Your enquiry has been submitted successfully.",
      });
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description: error.message || "An error occurred. Please try again.",
      });
      console.error(error);
    },
  });
};

/**
 * Hook for submitting register form
 */
export const useRegisterForm = () => {
  return useMutation<FormResponse, Error, RegisterFormData>({
    mutationFn: (data: RegisterFormData) => formsServices.register(data),
    onSuccess: (data) => {
      toast.success("Success!", {
        description:
          data.message || "Your registration has been submitted successfully.",
      });
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description: error.message || "An error occurred. Please try again.",
      });
      console.error(error);
    },
  });
};

/**
 * Hook for submitting join-team form
 */
export const useJoinTeamForm = () => {
  return useMutation<FormResponse, Error, JoinTeamFormData>({
    mutationFn: (data: JoinTeamFormData) => formsServices.joinTeam(data),
    onSuccess: (data) => {
      toast.success("Success!", {
        description:
          data.message ||
          "Your application has been submitted successfully. We'll get back to you soon!",
      });
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description: error.message || "An error occurred. Please try again.",
      });
      console.error(error);
    },
  });
};

/**
 * Hook for submitting download form
 */
export const useDownloadForm = () => {
  return useMutation<FormResponse, Error, DownloadFormData>({
    mutationFn: (data: DownloadFormData) => formsServices.download(data),
    onSuccess: (data) => {
      toast.success("Success!", {
        description:
          data.message || "Your download request has been submitted successfully.",
      });
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description: error.message || "An error occurred. Please try again.",
      });
      console.error(error);
    },
  });
};

